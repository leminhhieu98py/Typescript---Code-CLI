import { useState } from 'react';
import './codeShell.css';
import MoncacoEditor from '../common/MonacoEditor/MonacoEditor';
import ResizableContainer from '../common/ResizeableBox/ResizeableBox';
import CompileCodeScreen from '../CompileCodeScreen/CompileCodeScreen';

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
      <ResizableContainer direction="vertical">
        <div className="code-shell-container">
          <ResizableContainer direction="horizontal">
            <MoncacoEditor value={userCode} onChange={setUserCode} />
          </ResizableContainer>
          <CompileCodeScreen userCode={userCode} />
        </div>
      </ResizableContainer>
    </div>
  );
};

export default CodeShell;
