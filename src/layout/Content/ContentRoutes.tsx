import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import contents from '../../routes/contentRoutes';
import PrivateRoute from './PrivateRoute';
import Login from '../../pages/presentation/auth/Login';
import {pages} from "../../menu";


const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const ContentRoutes = () => {
	return (
		<Routes>
			{contents.map((page) => (
				<Route key={page.path} {...page} element={<PrivateRoute component={ page.element } />} />
			))}
			<Route path='*' element={<PAGE_404 />} />
			<Route path={pages.login.path} element={<Login />} />
		</Routes>
	);
};

export default ContentRoutes;
