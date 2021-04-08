import React from 'react';
import LazyHOC from "../../components/lazy-component";
import { RouteItem } from "../../config/routes";

const TicketList = LazyHOC(React.lazy(() => import('./ticket-list/ticket-list')))

const ticketRoutes: RouteItem = {
  breadcrumb: '消费券管理',
  path: '/ticket',
  children: [
    {
      breadcrumb: '消费券列表',
      path: '/ticket',
      component: TicketList
    }
  ]
}

export default ticketRoutes;