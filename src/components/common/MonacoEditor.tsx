import React from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';

interface MoncacoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MoncacoEditor: React.FC<MoncacoEditorProps> = ({ value, onChange }) => {
  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });
  };

  return (
    <Editor
      editorDidMount={onEditorDidMount}
      value={value}
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
