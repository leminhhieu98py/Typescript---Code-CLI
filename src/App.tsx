import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState } from 'react';
import CodeShell from './components/CodeShell/CodeShell';

const App = () => {
  return (
    <>
      <CodeShell />
      <CodeShell />
      <CodeShell />
    </>
  );
};

export default React.memo(App, () => true);
