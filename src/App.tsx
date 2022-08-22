import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { ESBUILD_WASM_URL } from './common/const';
import MoncacoEditor from './components/common/MonacoEditor/MonacoEditor';
import CompileCodeScreen from './components/CompileCodeScreen';

const initialEditorValue = `import React from 'react';
  import ReactDOM from 'react-dom';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<h1>Hello World</h1>)
`;

function App() {
  const [userCode, setUserCode] = useState<string>(initialEditorValue);
  const esbuildRef = useRef<any>(null);

  const startEsbuild = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: ESBUILD_WASM_URL
    });
  };

  useEffect(() => {
    startEsbuild();
  }, []);

  return (
    <div>
      <MoncacoEditor value={userCode} onChange={setUserCode} />
      <CompileCodeScreen userCode={userCode} esbuildRef={esbuildRef} />
    </div>
  );
}

export default React.memo(App, () => true);
