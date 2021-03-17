import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nofound from './views/nofound/Nofound';

const AppRoute: React.FC = () => {
	return (
		<Switch>
			<Route path="*" component={Nofound}></Route>
		</Switch>
	)
}

export default AppRoute;