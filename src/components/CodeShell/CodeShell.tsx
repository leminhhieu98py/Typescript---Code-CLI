import { useState } from 'react';
import MoncacoEditor from '../common/MonacoEditor/MonacoEditor';
import CompileCodeScreen from '../CompileCodeScreen';

const initialEditorValue = `
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count - 1);
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`;

const CodeShell = () => {
  const [userCode, setUserCode] = useState<string>(initialEditorValue);

  return (
    <div>
      <MoncacoEditor value={userCode} onChange={setUserCode} />
      <CompileCodeScreen userCode={userCode} />
    </div>
  );
};

export default CodeShell;
