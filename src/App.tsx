import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import store from './store/store';
import routes from './routes';

const App = () => {
  const element = useRoutes(routes);

  return <Provider store={store}>{element}</Provider>;
};

export default React.memo(App, () => true);
