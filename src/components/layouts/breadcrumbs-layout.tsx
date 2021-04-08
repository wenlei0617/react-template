/*
 * @Author: gary 
 * @Date: 2021-04-08 13:35:19 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 13:35:39
 * 自动生成面包屑组件
 */
import { Breadcrumb } from 'antd';
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { RouteItem } from '../../config/routes';

const flattenRoutes = (routes: RouteItem[]): RouteItem[] => {
  return routes.reduce((prev, next) => {
    return prev.concat(
      Array.isArray(next.children) ? flattenRoutes(next.children) : next
    )
  }, [] as RouteItem[])
}

const BreadcrumbsLayout: React.FC<{ routes: RouteItem[] }> = ({ routes }) => {
  const location = useLocation();
  const flattenRoute = flattenRoutes(routes);

  const breadcrumb = () => {
    return flattenRoute.filter(route => {
      const matchRoute = matchPath(location.pathname, { path: route.path });
      return matchRoute;
    }).map(route => {
      return (
        <Breadcrumb.Item key={route.path}>{route.breadcrumb}</Breadcrumb.Item>
      )
    })
  }

  return (
    <Breadcrumb style={{ margin: 16 }}>
      {breadcrumb()}
    </Breadcrumb>
  )
}

export default BreadcrumbsLayout;