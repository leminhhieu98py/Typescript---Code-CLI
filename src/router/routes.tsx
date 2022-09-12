import HomepageLayout from '../layouts/HomepageLayout/HomepageLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';

// pages using HomepageLayout
import Home from '../pages/home/Home';

// pages using MainLayout
import CellList from '../components/CellList/CellList';
import Login from '../pages/login/Login';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomepageLayout />,
        children: [
          {
            index: true,
            // path: '/cells',
            element: <Home />
          }
        ]
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: '/cells',
            element: <CellList />,
          }
        ]
      }
    ]
  }
];

export default routes;
