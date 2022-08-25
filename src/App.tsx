import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import CodeShell from './components/CodeShell/CodeShell';
import MarkdownEditor from './components/MarkdownEditor/MarkdownEditor';

const App = () => {
  return (
    <>
      <MarkdownEditor />
      {/* <CodeShell /> */}
    </>
  );
};

export default React.memo(App, () => true);
