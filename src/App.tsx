import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { ESBUILD_WASM_URL } from './common/const';

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

  const handleClick = async () => {
    if (!esbuildRef.current) {
      return;
    }

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
  };

  const iframeSrcDoc = `
    <head>
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
    </head>
    <body>
      <div id="root"></div>
    </body>
  `;

  return (
    <div>
      <textarea
        onChange={(e) => setUserCode(e.target.value)}
        value={userCode}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe
        sandbox="allow-scripts"
        srcDoc={iframeSrcDoc}
        ref={iframeRef}
        title="myIframe"
      />
    </div>
  );
}

export default React.memo(App, () => true);
