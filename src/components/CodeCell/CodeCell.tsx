import React, { useState } from 'react';
import './codeCell.css';
import MoncacoEditor from '../common/MonacoEditor/MonacoEditor';
import ResizableContainer from '../common/ResizableContainer/ResizableContainer';
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

interface CodeCellProps {
  id: string;
  content: string;
}

const CodeCell: React.FC<CodeCellProps> = ({ id, content }) => {
  const [userCode, setUserCode] = useState<string>(initialEditorValue);

  return (
    <div>
      <ResizableContainer direction="vertical">
        <div className="code-shell-container">
          <ResizableContainer direction="horizontal">
            <MoncacoEditor value={content} onChange={setUserCode} />
          </ResizableContainer>
          <CompileCodeScreen userCode={content} />
        </div>
      </ResizableContainer>
    </div>
  );
};

export default CodeCell;
