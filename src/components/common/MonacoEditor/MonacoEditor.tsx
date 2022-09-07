import React, { useRef } from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './monacoEditor.css';
import './customHighlighter.css';
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

    const highlightCode = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      editor
    );

    highlightCode.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const handleFormatCode = () => {
    const unformatCode = editorRef.current.getModel().getValue();
    const formatCode = prettier
      .format(unformatCode, PRETTIER_FORMAT_OPTIONS)
      .replace(/\n$/, '');
    onChange(formatCode);
  };

  return (
    <div className="editor-container">
      <button
        className="button-floating button button-format is-primary is-small"
        onClick={handleFormatCode}
      >
        Format
      </button>
      <Editor
        editorDidMount={onEditorDidMount}
        value={value}
        theme="dark"
        height="100%"
        language="javascript"
        options={{
          wordWrap: 'on',
          fontSize: 14,
          automaticLayout: true,
          colorDecorators: true,
          formatOnPaste: true,
        }}
      />
    </div>
  );
};

export default MoncacoEditor;
