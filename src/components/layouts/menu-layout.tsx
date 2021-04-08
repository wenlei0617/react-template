/*
 * @Author: gary 
 * @Date: 2021-04-08 13:35:44 
 * @Last Modified by:   gary 
 * @Last Modified time: 2021-04-08 13:35:44 
 * 导航栏组件
 */
import { Menu } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RouteItem } from '../../config/routes';

const MenuLayout: React.FC<{ routes: RouteItem[] }> = ({ routes }) => {
  const history = useHistory();
  const location = useLocation();

  const handleHistoryPush = (path: string) => {
    history.push(path);
  }

  return (
    <Menu
      selectedKeys={[location.pathname]} 
      theme="dark" 
      mode="inline">
      {
        routes.map(route => {
          if (route.children) {
            return (
              <Menu.SubMenu title={route.breadcrumb} key={route.path}>
                {
                  route.children.filter(subRoute => !subRoute.hideInMenu).map((subRoute) => (
                    <Menu.Item 
                      onClick={() => handleHistoryPush(subRoute.path)}
                      key={subRoute.path}>{subRoute.breadcrumb}</Menu.Item>
                  ))
                }
              </Menu.SubMenu>
            )
          }
          return (
            <Menu.Item 
              onClick={() => handleHistoryPush(route.path)}
              key={route.path}>{route.breadcrumb}</Menu.Item>
          )
        })
      }
    </Menu>
  )
}

export default MenuLayout;