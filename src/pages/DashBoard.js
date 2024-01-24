import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key, icon, children, label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5'), ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  
  return (
    <Layout style={{height: '100vh',}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src="/logo192.png" width="80%" preview={false} style={{ margin: '20px 0', objectFit: 'scale-down' }} /></div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer, }} />
        <Content style={{ margin: '24px 16px 0', }} >
          <div style={{padding: 24, height: '100vh', background: colorBgContainer, borderRadius: borderRadiusLG,}}>
            Bill is a cat.
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};
export default App;