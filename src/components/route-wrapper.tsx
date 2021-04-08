/*
 * @Author: gary 
 * @Date: 2021-04-08 13:34:32 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 13:35:07
 * 路由包装器，配置路由转换为组件路由
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteItem } from '../config/routes';

const RouteWrapper: React.FC<{ routes: RouteItem[] }> = (props) => {
  const { routes } = props;

  return (
    <Switch>
      {
        routes.map(route => {
          if (route.children) {
            const Component = route.component;
            if (Component) {
              return (
                <Route key={route.path} path={route.path}>
                  <Component routes={route.children}>
                    <RouteWrapper routes={route.children}></RouteWrapper>
                  </Component>
                </Route>
              )
            }
            return (
              <Route key={route.path} path={route.path}>
                <RouteWrapper routes={route.children}></RouteWrapper>
              </Route>
            )
          }
          return (
            <Route key={route.path} {...route} />
          )
        })
      }
    </Switch>
  )
}

export default RouteWrapper;