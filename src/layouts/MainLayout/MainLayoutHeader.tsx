import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import ROUTES_PATH from './../../router/routesPath';
const { Header } = Layout;

const MainLayoutHeader = () => {
  return (
    <Header>
      <Link to="/">Home</Link>
      <Link to={ROUTES_PATH.NARKDOWN_EDITOR}>Start making some markdown</Link>
    </Header>
  );
};

export default MainLayoutHeader;
