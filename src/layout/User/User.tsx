import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { pages } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import AuthContext from '../../contexts/authContext';
import {removeToken} from "../../services/auth";

const User = () => {
	const { userData, removeAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					<img
						srcSet={userData.strava_profile_medium}
						src={userData.strava_profile_medium}
						alt='Avatar'
						width={128}
						height={128}
					/>
				</div>
				<div className='user-info'>
					<div className='user-name'>
						{/*<Popovers title={ userData.name }>*/}
							{ userData.name }
						{/*</Popovers>*/}
					</div>
				</div>
			</div>

			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						{/*<div*/}
						{/*	role='presentation'*/}
						{/*	className='navigation-item cursor-pointer'*/}
						{/*	onClick={() =>*/}
						{/*		navigate(*/}
						{/*			`/`,*/}
						{/*			// @ts-ignore*/}
						{/*			handleItem(),*/}
						{/*		)*/}
						{/*	}>*/}
						{/*	<span className='navigation-link navigation-link-pill'>*/}
						{/*		<span className='navigation-link-info'>*/}
						{/*			<Icon icon='AccountBox' className='navigation-icon' />*/}
						{/*			<span className='navigation-text'>*/}
						{/*				{t('menu:Profile') as ReactNode}*/}
						{/*			</span>*/}
						{/*		</span>*/}
						{/*	</span>*/}
						{/*</div>*/}
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{
											darkModeStatus
											? 'DarkMode'
											: 'LightMode'
										}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								removeToken && removeToken();
								removeAuth && removeAuth();
								navigate(`../${pages.login.path}`);
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>
										Sair
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;
