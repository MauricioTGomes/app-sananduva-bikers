import React from 'react';
import { RouteProps } from 'react-router-dom';
import { pages } from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';

const headers: RouteProps[] = [
	{ path: pages.login.path, element: null },
	{ path: pages.page404.path, element: null },
	{ path: `*`, element: <DashboardHeader /> },
];

export default headers;
