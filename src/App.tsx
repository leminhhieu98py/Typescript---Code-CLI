import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import CodeCell from './components/CodeCell/CodeCell';
import MarkdownEditor from './components/MarkdownEditor/MarkdownEditor';

const App = () => {
  return (
    <>
      <MarkdownEditor />
      <CodeCell />
    </>
  );
};

export default React.memo(App, () => true);
