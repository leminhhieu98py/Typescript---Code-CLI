import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HomepageHeader from './HomepageHeader';
import HomepageFooter from './HomepageFooter';

const { Header, Content, Footer } = Layout;

const HomepageLayout = () => {
  return (
    <Layout>
      <HomepageHeader />
      <Content>
        <Outlet />
      </Content>
      <HomepageFooter />
    </Layout>
  );
};

export default HomepageLayout;
