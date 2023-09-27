import React, {FC, useEffect, useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from "../../../components/bootstrap/Spinner";
import api from "../../../services/api";
import {isAuthenticated, setToken} from "../../../services/auth";
import showNotification from "../../../components/extras/showNotification";
import AuthContext from '../../../contexts/authContext';

interface ILoginProps {}
const Login: FC<ILoginProps> = () => {
	const { darkModeStatus } = useDarkMode();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const execLogin = (code: string) => {
		api.post('auth/login', { code })
			.then((resp: any) => {
				if (!resp.data.access_token) {
					showNotification('Atenção!', resp.data.message, 'warning');
				} else {
					showNotification('Sucesso!', 'Sucesso ao logar!', 'success');
					setToken(resp.data.access_token);
					if (setAuth) setAuth(resp.data.user);
					return navigate('/')
				}
			})
	}
	const getURL = () =>
		`https://www.strava.com/oauth/authorize?client_id=113681&redirect_uri=http://localhost:3000/auth-pages/login/&response_type=code&approval_prompt=auto&scope=activity%3Awrite%2Cread&state=test`;

	useEffect(() => {
		let url = new URL(window.location.href);
		let code = url.searchParams.get('code');

		if (code) {
			setIsLoading(true);
			execLogin(code);
		} else if (isAuthenticated()) {
			return navigate('/')
		}
	}, []);

	return (
		<PageWrapper isProtected={false} title='Login' className='bg-dark'>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<img src='https://dgalywyr863hv.cloudfront.net/pictures/clubs/150782/3187321/3/large.jpg' className='rounded float-start' width='200'/>
									</Link>
								</div>

								<div className='text-center h1 fw-bold mt-5'>Bem-Vindo Biker,</div>
								<div className='text-center h4 text-muted mb-5'>Realize seu login para continuar!</div>

								<form className='row g-4'>
									<div className='col-12'>
										<Button
											tag='a'
											isDisable={isLoading}
											href={getURL()}
											color='warning'
											className='w-100 py-3'>
											{isLoading && (
												<Spinner isSmall inButton isGrow />
											)}
											Entrar com Strava
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
export default Login;
