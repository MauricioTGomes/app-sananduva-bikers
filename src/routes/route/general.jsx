import React, { lazy } from 'react';
import { dashboardPagesMaster } from '../../menu';

const LANDING = {
    YEAR_EDITION: {
        LIST: lazy(() => import('../../pages/presentation/year/List')),
        EDIT: lazy(() => import('../../pages/presentation/year/Edit')),
    },
    EVENT: {
        LIST: lazy(() => import('../../pages/presentation/event/List')),
        EDIT: lazy(() => import('../../pages/presentation/event/Edit')),
    }
};

const presentation = [
    {
        path: dashboardPagesMaster.year.subMenu.list.path,
        element: <LANDING.YEAR_EDITION.LIST />,
    },
    {
        path: dashboardPagesMaster.year.subMenu.edit.path,
        element: <LANDING.YEAR_EDITION.EDIT />,
    },
    {
        path: dashboardPagesMaster.event.subMenu.list.path,
        element: <LANDING.EVENT.LIST />,
    },
    {
        path: dashboardPagesMaster.event.subMenu.edit.path,
        element: <LANDING.EVENT.EDIT />,
    },
];

export default presentation;
