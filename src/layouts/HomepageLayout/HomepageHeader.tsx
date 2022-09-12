import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import ROUTES_PATH from './../../router/routesPath';
const { Header } = Layout;

const HomepageHeader = () => {
  return (
    <Header>
      <Link to="/">Home</Link>
      <Link to={ROUTES_PATH.CODE_EDITOR}>Start coding</Link>
    </Header>
  );
};

export default HomepageHeader;
