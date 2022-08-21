import React, { useRef } from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import styles from './MonacoEditor.module.scss';

interface MoncacoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const PRETTIER_FORMAT_OPTIONS = {
  parser: 'babel',
  plugins: [parser],
  useTabs: false,
  semi: true,
  singleQuote: true
};

const MoncacoEditor: React.FC<MoncacoEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });
  };

  const handleFormatCode = () => {
    const unformatCode = editorRef.current.getModel().getValue();
    const formatCode = prettier
      .format(unformatCode, PRETTIER_FORMAT_OPTIONS)
      .replace(/\n$/, '');
    onChange(formatCode);
  };

  return (
    <div className={styles['editor-container']}>
      <button
        className={`${styles['button-floating']} button button-format is-primary is-small`}
        onClick={handleFormatCode}
      >
        Format
      </button>
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
    </div>
  );
};

export default MoncacoEditor;
