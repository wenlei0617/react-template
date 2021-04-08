import React, { useMemo } from 'react';
import RouteWrapper from './components/route-wrapper';
import routes, { RouteItem } from './config/routes';
import { useStore } from './store';
import _ from 'lodash';

const filterRoutes = (routes: RouteItem[], auth: string[]) => {
	const cloneRoute = _.cloneDeep(routes);
	return cloneRoute.filter((route) => {
		if (route.children) {
			route.children = filterRoutes(route.children, auth);
		}
		if (route.auth) {
			if (route.auth.some((item) => auth.includes(item))) {
				return true;
			}
			return false;
		} else {
			return true;
		}
	})
}

const AppRoute: React.FC = () => {
	const { userInfo } = useStore();

	return (
		<React.Fragment>
			<RouteWrapper routes={filterRoutes(routes, userInfo ? userInfo.auth : [])}></RouteWrapper>
		</React.Fragment>
	)
}

export default AppRoute;