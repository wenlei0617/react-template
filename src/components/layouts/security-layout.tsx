/*
 * @Author: gary 
 * @Date: 2021-04-08 13:36:01 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-09 17:11:15
 * 安全布局组件
 */
import { Button, Layout, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FOOTER_TEXT } from '../../config/config';
import { RouteItem } from '../../config/routes';
import { getToken, setToken } from '../../utils/utils';
import BreadcrumbsLayout from './breadcrumbs-layout';
import MenuLayout from './menu-layout';
import styles from './security-layout.module.scss';

interface SecurityLayoutProps {
  routes: RouteItem[]
}

const SecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const { children, routes } = props;
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const loginOut = () => {
    setToken('');
    history.replace('/login');
  }

  if (!getToken()) {
    return <Redirect to={'/login'}/>
  }

  return (
    <Layout className={styles['layout']}>
      <Layout.Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={() => setCollapsed(!collapsed)}>
        <div className={styles['logo']}>后台管理系统</div>
        <MenuLayout routes={routes}></MenuLayout>
      </Layout.Sider>
      <Layout>
        <Layout.Header className={styles['layout-header']}>
          <Popconfirm title="确定退出当前账号？" onConfirm={loginOut}>
            <Button type="link" size="small">退出登录</Button>
          </Popconfirm>
        </Layout.Header>
        <Layout.Content className={styles['layout-main']}>
          <BreadcrumbsLayout routes={routes}></BreadcrumbsLayout>
          <div className={styles['layout-content']}>{children}</div>
        </Layout.Content>
        <Layout.Footer className={styles['layout-footer']}>{FOOTER_TEXT}</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default SecurityLayout;