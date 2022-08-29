import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import { Provider } from 'react-redux';

import CodeCell from './components/CodeCell/CodeCell';
import MarkdownEditor from './components/MarkdownEditor/MarkdownEditor';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <MarkdownEditor />
      <CodeCell />
    </Provider>
  );
};

export default React.memo(App, () => true);
