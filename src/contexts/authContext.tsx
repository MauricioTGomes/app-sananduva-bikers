import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {getToken, me} from "../services/auth";


interface IUserStatsProps {
	user_id: number;
	quantity_activity: number;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	elevation_gain: number;
	last_month_quantity_activity: number;
	last_month_distance: number;
	last_month_moving_time: number;
	last_month_elapsed_time: number;
	last_month_elevation_gain: number;
	last_month_achievement_count: number;
	last_sync: string;
}
export interface IUserProps {
	id: string;
	name: string;
	email?: string;
	password?: string;
	role?: string;
	totals_kms?: number;
	totals_points?: number;
	strava_token?: string;
	strava_id?: string;
	strava_refresh_token?: string;
	strava_profile_medium?: string;
	strava_profile?: string;
	stats?: IUserStatsProps;
}

export interface IAuthContextProps {
	user: string;
	isAuthenticate: boolean;
	setAuth?(...args: unknown[]): unknown;
	removeAuth?(): unknown;
	userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>('');
	const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	const setAuth = (user: object) => {
		setUserData(user);
		setIsAuthenticate(true);
	}

	const removeAuth = () => {
		setUserData({});
		setIsAuthenticate(false);
	}

	useEffect(() => {
		if (getToken()) {
			me().
			then((resp: any) => {
				setUserData(resp.data);
				setIsAuthenticate(true);
			}).
			catch((err: any) => {
				setUserData({});
				setIsAuthenticate(false);
			});
		}
	}, []);


	const value = useMemo(
		() => ({
			user,
			isAuthenticate,
			setAuth,
			removeAuth,
			userData,
		}),
		[userData, isAuthenticate],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
