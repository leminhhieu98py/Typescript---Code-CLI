import React, { useEffect, useCallback, useRef } from 'react';
import { bundler } from '../utils/bundler';
interface CompileCodeScreenProps {
  userCode: string;
}

const iframeSrcDoc = `
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
          console.error(err);
        }
      }, false)
    </script>
  </body>
`;

const CompileCodeScreen: React.FC<CompileCodeScreenProps> = ({ userCode }) => {
  const iframeRef = useRef<any>(null);

  const resetIframeContent = useCallback(() => {
    iframeRef.current.srcdoc = iframeSrcDoc;
  }, []);

  const handleCodeChange = useCallback(
    async (userCode: string) => {
      resetIframeContent();

      const result = await bundler(userCode);

      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        '*'
      );
    },
    [resetIframeContent]
  );

  useEffect(() => {
    const bundleCode = setTimeout(() => handleCodeChange(userCode), 1000);

    return () => clearTimeout(bundleCode);
  }, [userCode, handleCodeChange]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      srcDoc={iframeSrcDoc}
      title="code preview"
    />
  );
};

export default CompileCodeScreen;
