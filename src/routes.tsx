import HomepageLayout from './layouts/HomepageLayout/HomepageLayout';
import MainLayout from './layouts/MainLayout/MainLayout';

// pages using HomepageLayout
import Home from './pages/home/Home';

// pages using MainLayout
import CellList from './components/CellList/CellList';

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
    element: <MainLayout />,
    children: [
      {
        element: <CellList />,
        path: '/cells'
      }
    ]
  }
];

export default routes;
