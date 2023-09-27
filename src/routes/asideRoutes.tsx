import React from 'react';
import { RouteProps } from 'react-router-dom';
import { pages } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides: RouteProps[] = [
	{ path: pages.login.path, element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;
