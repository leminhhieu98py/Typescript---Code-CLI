import { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { MenuItem } from '../../typings/antd/sider';
import { getItem } from './../../utils/antd/sider';
import ROUTES_PATH from './../../router/routesPath';
import { useMenu } from './../../hooks/antd/useMenu';

const items: MenuItem[] = [
  getItem(<Link to="/">Home</Link>, 'Homepage', <PieChartOutlined />),
  getItem('Code Editor', 'CodeEditor', <PieChartOutlined />, [
    getItem(
      <Link to={ROUTES_PATH.CODE_EDITOR}>Code Editor Workspace</Link>,
      'CodeEditorWorkspace'
    ),
    getItem('Code Editor Store', 'CodeEditorStore'),
    getItem('Code Editor Favorite', 'CodeEditorFavorite')
  ]),
  getItem('Markdown Editor', 'MarkdownEditor', <PieChartOutlined />, [
    getItem(
      <Link to={ROUTES_PATH.NARKDOWN_EDITOR}>Markdown Editor Workspace</Link>,
      'MarkdownEditorWorkspace'
    ),
    getItem('Markdown Editor Store', 'MarkdownEditorStore'),
    getItem('Markdown Editor Favorite', 'MarkdownEditorFavorite')
  ])
];

const rootSubmenuKeys = ['CodeEditor', 'MarkdownEditor'];

const MainLayoutSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { openKeys, onOpenChange } = useMenu(
    'CodeEditorWorkspace',
    rootSubmenuKeys
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['CodeEditorWorkspace']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default MainLayoutSider;
