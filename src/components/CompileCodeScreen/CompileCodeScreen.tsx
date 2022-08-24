import React, { useEffect, useCallback, useRef, useState } from 'react';
import { bundleCode } from '../../utils/bundler';
import './compileCodeScreen.css';

interface CompileCodeScreenProps {
  userCode: string;
}

const iframeSrcDoc = `
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        const handleError = (err) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
          console.error(err);
        }

        window.addEventListener('error', (e) => {
          e.preventDefault();
          handleError(e.error.message)
        })

        try {
          eval(event.data);
        } catch (err) {
          throw err;
        }
      }, false)
    </script>
    </body>
`;

const CompileCodeScreen: React.FC<CompileCodeScreenProps> = ({ userCode }) => {
  const iframeRef = useRef<any>(null);
  const [error, setError] = useState<string>('');

  const resetIframeContent = useCallback(() => {
    iframeRef.current.srcdoc = iframeSrcDoc;
  }, []);

  const handleCodeChange = useCallback(
    async (userCode: string) => {
      resetIframeContent();

      const result = await bundleCode(userCode);

      iframeRef.current.contentWindow.postMessage(result.code, '*');
      setError(result.err);
    },
    [resetIframeContent]
  );

  useEffect(() => {
    const bundleCode = setTimeout(() => handleCodeChange(userCode), 1000);

    return () => clearTimeout(bundleCode);
  }, [userCode, handleCodeChange]);

  return (
    <div className="compile-code-iframe-container">
      <iframe
        className="compile-code-iframe"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeSrcDoc}
        title="code preview"
      />
      {error && <span className="compile-code-error">{error}</span>}
    </div>
  );
};

export default CompileCodeScreen;
