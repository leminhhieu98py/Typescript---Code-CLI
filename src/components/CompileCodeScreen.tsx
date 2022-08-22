import React, { useEffect, useCallback, useRef, forwardRef } from 'react';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
interface CompileCodeScreenProps {
  userCode: string;
  esbuildRef: any;
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

const CompileCodeScreen: React.FC<CompileCodeScreenProps> = ({
  userCode,
  esbuildRef
}) => {
  const iframeRef = useRef<any>(null);

  const resetIframeContent = useCallback(() => {
    iframeRef.current.srcdoc = iframeSrcDoc;
  }, []);

  const handleCodeChange = useCallback(
    async (userCode: string) => {
      if (!esbuildRef.current) {
        return;
      }

      resetIframeContent();

      const result = await esbuildRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(userCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window'
        }
      });

      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        '*'
      );
    },
    [esbuildRef, resetIframeContent]
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
