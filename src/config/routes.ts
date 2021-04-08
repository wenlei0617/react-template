/*
 * @Author: gary 
 * @Date: 2021-04-08 13:36:28 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 14:02:09
 * 路由配置文件
 */
import React from 'react';
import SecurityLayout from "../components/layouts/security-layout";
import LazyHOC from "../components/lazy-component";
import orderRoutes from '../views/order/order-routes';
const NoFound = LazyHOC(React.lazy(() => import('../views/nofound/Nofound')));
const Login = LazyHOC(React.lazy(() => import('../views/login/login')));
const Home = LazyHOC(React.lazy(() => import('../views/home/home')));

export interface RouteItem {
  path: string;
  component?: React.ComponentType<any>;
  breadcrumb?: string;
  exact?: boolean;
  children?: RouteItem[];
  hideInMenu?: boolean;
  auth?: string[];
}

const routes: RouteItem[] = [
  {
    breadcrumb: '登录',
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: SecurityLayout,
    children: [
      {
        breadcrumb: '首页',
        path: '/',
        component: Home,
        exact: true
      },
      orderRoutes,
      {
        path: '*',
        component: NoFound
      }
    ]
  },
];

export default routes;