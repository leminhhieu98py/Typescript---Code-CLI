import ROUTES_PATH from './routesPath';
import HomepageLayout from '../layouts/HomepageLayout/HomepageLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';

// auth pages and routes
import LoginPage from '../pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';

// pages using HomepageLayout
import HomePage from '../pages/HomePage/HomePage';

// pages using MainLayout
import CodeEditor from './../pages/CodeEditorPage/CodeEditor';
import MarkdownEditor from './../pages/MarkdownEditorPage/MarkdownEditor';

const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomepageLayout />,
        children: [
          {
            index: true,
            element: <HomePage />
          }
        ]
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES_PATH.CODE_EDITOR,
            element: <CodeEditor />
          },
          {
            path: ROUTES_PATH.NARKDOWN_EDITOR,
            element: <MarkdownEditor />
          }
        ]
      }
    ]
  }
];

export default routes;
