import React from "react";
import LazyHOC from "../../components/lazy-component";
import { RouteItem } from "../../config/routes";
const OrderDetail = LazyHOC(React.lazy(() => import('./order-detail/order-detail')));
const OrderList = LazyHOC(React.lazy(() => import('./order-list/order-list')));

const orderRoutes: RouteItem = {
  breadcrumb: '订单管理',
  path: '/order',
  children: [
    {
      breadcrumb: '订单列表',
      path: '/order',
      exact: true,
      component: OrderList
    },
    {
      hideInMenu: true,
      breadcrumb: '订单详情',
      exact: true,
      path: '/order/:id',
      component: OrderDetail
    }
  ]
};

export default orderRoutes;