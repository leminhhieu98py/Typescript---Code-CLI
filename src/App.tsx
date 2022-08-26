import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState } from 'react';
import CodeCell from './components/CodeCell/CodeCell';

const App = () => {
  return (
    <>
      <CodeCell />
    </>
  );
};

export default React.memo(App, () => true);
