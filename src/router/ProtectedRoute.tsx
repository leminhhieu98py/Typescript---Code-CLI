import { Outlet } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';

const useAuth = () => {
  const token = '123';
  return !!token;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;
