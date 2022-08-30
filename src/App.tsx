import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import CellList from './components/CellList/CellList';

import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

export default React.memo(App, () => true);
