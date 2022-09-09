import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import CellList from './components/CellList/CellList';
import { Button } from 'antd';

import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
      <Button type="primary">Primary Button</Button>
    </Provider>
  );
};

export default React.memo(App, () => true);
