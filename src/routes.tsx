import FunctionPageLayout from './layouts/FunctionPageLayout/FunctionPageLayout';
import HomepageLayout from './layouts/HomepageLayout/HomepageLayout';
import CellList from './components/CellList/CellList';
import Home from './pages/home/Home';

const routes = [
  {
    path: '/',
    element: <HomepageLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    element: <FunctionPageLayout />,
    children: [
      {
        element: <CellList />,
        path: '/cells'
      }
    ]
  }
];

export default routes;
