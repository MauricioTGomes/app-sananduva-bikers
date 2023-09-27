import React from 'react';
import { RouteProps } from 'react-router-dom';
import { pages } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers: RouteProps[] = [
	{ path: pages.login.path, element: null },
	{ path: pages.page404.path, element: null },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
