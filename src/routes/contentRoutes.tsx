import React, { lazy } from 'react';
import { dashboardPagesMenu } from '../menu';
import general from './route/general';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};

const presentation = [
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},
	...general
];
const contents = [...presentation];

export default contents;
