import { useState } from 'react';
import './CodeEditor.css';
import MoncacoEditor from '../../components/MonacoEditor/MonacoEditor';
import ResizableContainer from '../../components/ResizableContainer/ResizableContainer';
import CompileCodeScreen from '../../components/CompileCodeScreen/CompileCodeScreen';

const initialEditorValue = `import { useState } from 'react';
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

show(<App />)`;

const CodeEditor = () => {
  const [codeInput, setCodeInput] = useState<string>(initialEditorValue);

  return (
    <div>
      <div className="code-shell-container">
        <ResizableContainer direction="horizontal">
          <MoncacoEditor value={codeInput} onChange={setCodeInput} />
        </ResizableContainer>
        {/* TODO: handle id later */}
        <CompileCodeScreen id={'1'} userCode={codeInput} />
      </div>
    </div>
  );
};

export default CodeEditor;
