import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainLayoutSider from './MainLayoutSider';
import MainLayoutHeader from './MainLayoutHeader';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <MainLayoutSider />
      <Layout>
        <MainLayoutHeader />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
