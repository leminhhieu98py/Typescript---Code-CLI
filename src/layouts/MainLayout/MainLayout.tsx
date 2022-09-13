import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainLayoutSider from './MainLayoutSider';
import MainLayoutHeader from './MainLayoutHeader';
import styles from './MainLayout.module.scss';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className={styles['layout__wrapper']}>
      <MainLayoutSider />
      <Layout>
        <MainLayoutHeader />
        <Content className={styles['layout__content__wrapper']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
