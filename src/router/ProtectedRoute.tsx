import { Outlet } from 'react-router-dom';
import Login from '../pages/login/Login';

const useAuth = () => {
  const token = '123';
  return !!token;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
