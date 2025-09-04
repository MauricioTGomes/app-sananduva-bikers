export const pages = {
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth-pages/login',
		icon: 'Login',
	},

	page404: {
		id: 'Page404',
		text: '404 Page',
		path: 'auth-pages/404',
		icon: 'ReportGmailerrorred',
	},
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	}
};

export const dashboardPagesMaster = {
	event: {
		id: 'event',
		text: 'Eventos',
		path: '/event',
		icon: 'Event',
		subMenu: {
			list: {
				id: 'eventList',
				text: 'Lista de Eventos',
				path: '/event/list',
				icon: 'List',
				subMenu: null,
			},
			edit: {
				id: 'eventEdit',
				text: 'Adicionar Evento',
				path: '/event/edit',
				icon: 'ExposurePlus1',
				role: 'MASTER',
				subMenu: null,
			}
		}
	},
	year: {
		id: 'year',
		text: 'Edições (Ano)',
		path: '/year-edition',
		icon: 'EventNote',
		subMenu: {
			list: {
				id: 'yearList',
				text: 'Lista de Edições',
				path: '/year-edition/list',
				icon: 'List',
				subMenu: null,
			},
			edit: {
				id: 'yearEdit',
				text: 'Adicionar Edição',
				path: '/year-edition/edit',
				icon: 'ExposurePlus1',
				role: 'MASTER',
				subMenu: null,
			}
		}
	}
};
