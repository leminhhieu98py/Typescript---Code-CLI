import React, { FC } from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

interface FunctionPageLayoutProps {
  children: React.ReactNode;
}

const FunctionPageLayout: FC<FunctionPageLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default FunctionPageLayout;
