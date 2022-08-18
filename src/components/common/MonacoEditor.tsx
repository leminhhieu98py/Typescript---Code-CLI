import React from 'react';
import Editor from '@monaco-editor/react';

interface MoncacoEditorProps {
  initialValue: string;
}

const MoncacoEditor: React.FC<MoncacoEditorProps> = ({ initialValue }) => {
  return (
    <Editor
      value={initialValue}
      theme="dark"
      height={500}
      language="javascript"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
};

export default MoncacoEditor;
