import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';
import {Auth} from '../utils/auth';
import ProductView from './ProductView';
import ProductAdd from './ProductAdd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, path,  icon, children) {
  return {
    key, icon, path,  children, label,
  };
}

const items = [
  getItem('View Products', '1', 'shopping-cart-admin-panel/dashboard/view-products', <PieChartOutlined />),
  getItem('Add Products', '2', 'shopping-cart-admin-panel/dashboard/add-products', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5'), ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];

const Dashboard = () => {

  const navigate = useNavigate();
    
  useEffect(() => {if (!Auth.isAuthenticated()) navigate("shopping-cart-admin-panel/login");});

  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const [contentPage, setContentPage] = useState("1")

  const handleMenuClick = ({ key }) => {
    setContentPage(key);
  };
  
  return (
    <Layout style={{height: '100vh',overflow: 'hidden'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width='260'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src="https://pksm9.github.io/shopping-cart-admin-panel//logo192.png" width="80%" preview={false} style={{ margin: '20px 0', objectFit: 'scale-down' }} /></div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} 
          onClick={handleMenuClick}
        // {...items.map((item) => (
        //   <Menu.Item key={item.key} icon={item.icon}>
        //     <Link to={item.path}>{item.label}</Link>
        //   </Menu.Item>
        // ))}
        />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer, }} />
        <Content style={{ margin: '24px 16px 0', }} >
          <div style={{padding: 24, height: '100vh', background: colorBgContainer, borderRadius: borderRadiusLG,}}>
          
          {contentPage === '1' && <ProductView />}
          {contentPage === '2' && <ProductAdd />}
           
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;