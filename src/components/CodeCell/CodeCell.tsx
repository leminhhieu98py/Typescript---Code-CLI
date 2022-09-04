import React from 'react';
import './codeCell.css';
import MoncacoEditor from '../common/MonacoEditor/MonacoEditor';
import ResizableContainer from '../common/ResizableContainer/ResizableContainer';
import CompileCodeScreen from '../CompileCodeScreen/CompileCodeScreen';

interface CodeCellProps {
  id: string;
  content: string;
  updateCell: (id: string, content: string) => {};
}

const CodeCell: React.FC<CodeCellProps> = ({ id, content, updateCell }) => {
  return (
    <div>
      <ResizableContainer direction="vertical">
        <div className="code-shell-container">
          <ResizableContainer direction="horizontal">
            <MoncacoEditor
              value={content}
              onChange={(e) => updateCell(id, e)}
            />
          </ResizableContainer>
          <CompileCodeScreen id={id} userCode={content} />
        </div>
      </ResizableContainer>
    </div>
  );
};

export default CodeCell;
