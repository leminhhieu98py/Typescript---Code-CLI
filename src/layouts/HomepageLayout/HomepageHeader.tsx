import { Link } from 'react-router-dom';
import { Layout } from 'antd';
const { Header } = Layout;

const HomepageHeader = () => {
  return (
    <Header>
      <Link to="/">Home</Link>
      <Link to="/cells">Start coding</Link>
    </Header>
  );
};

export default HomepageHeader;
