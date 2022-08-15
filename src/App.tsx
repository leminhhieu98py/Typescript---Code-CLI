import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { ESBUILD_WASM_URL } from './common/const';
import Editor from '@monaco-editor/react';

function App() {
  const [userCode, setUserCode] = useState<string>('');
  const esbuildRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    startEsbuild();
  }, []);
  const startEsbuild = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: ESBUILD_WASM_URL
    });
  };

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

  const resetIframeContent = useCallback(() => {
    iframeRef.current.srcdoc = iframeSrcDoc;
  }, [iframeSrcDoc]);

  const handleClick = useCallback(
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
    [resetIframeContent]
  );

  useEffect(() => {
    const bundleCode = setTimeout(() => handleClick(userCode), 1000);

    return () => clearTimeout(bundleCode);
  }, [userCode, handleClick]);

  return (
    <div>
      <Editor theme='dark' height={500} language='javascript' />
      <textarea
        onChange={(e) => setUserCode(e.target.value)}
        value={userCode}
        placeholder="Enter some code to execute..."
      />
      <iframe
        sandbox="allow-scripts"
        srcDoc={iframeSrcDoc}
        ref={iframeRef}
        title="code preview"
      />
    </div>
  );
}

export default React.memo(App, () => true);
