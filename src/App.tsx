import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

function App() {
  const [userCode, setUserCode] = useState<string>('');
  const [compileCode, setCompileCode] = useState<string>('');
  const esbuildRef = useRef<any>(null);

  useEffect(() => {
    startEsbuild();
  }, []);

  const startEsbuild = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
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
      plugins: [unpkgPathPlugin(userCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    setCompileCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea
        onChange={(e) => setUserCode(e.target.value)}
        value={userCode}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{compileCode}</pre>
    </div>
  );
}

export default React.memo(App, () => true);
