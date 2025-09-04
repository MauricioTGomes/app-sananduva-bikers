import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Calendar, momentLocalizer, View as TView, Views } from 'react-big-calendar';
import {ptBR} from "date-fns/locale";
import { Calendar as DatePicker } from 'react-date-range';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader, CardLabel, CardTitle
} from '../../../components/bootstrap/Card';
import eventList, { IEvent } from '../../../common/data/events';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Popovers from '../../../components/bootstrap/Popovers';
import {
	CalendarTodayButton,
	CalendarViewModeButtons,
	getLabel,
	getUnitType,
	getViews,
} from '../../../components/extras/calendarHelper';
import CommonRightPanel from './Member/CommonRightPanel';
import useDarkMode from '../../../hooks/useDarkMode';
import api from "../../../services/api";
import showNotification from "../../../components/extras/showNotification";
import AuthContext from "../../../contexts/authContext";
import OffCanvas, {OffCanvasBody, OffCanvasHeader, OffCanvasTitle} from "../../../components/bootstrap/OffCanvas";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Input from "../../../components/bootstrap/forms/Input";
import ThemeContext from "../../../contexts/themeContext";
import Textarea from "../../../components/bootstrap/forms/Textarea";
import Spinner from "../../../components/bootstrap/Spinner";

moment.locale('pt-BR');
const localizer = momentLocalizer(moment);
const MyEvent = (data: { event: IEvent }) => {
	const { event } = data;
	return (
		<div className='row g-2'>
			<div className='col text-truncate'>
				{event?.icon && <Icon icon={event?.icon} size='lg' className='me-2' />}
				{event?.name}
			</div>
		</div>
	);
};

const DashboardBookingPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setAuth } = useContext(AuthContext);
	const { darkModeStatus, themeStatus } = useDarkMode();
	const [events, setEvents] = useState(eventList);
	const { setRightPanel } = useContext(ThemeContext);
	const [toggleRightPanel, setToggleRightPanel] = useState(false);
	const [toggleEventInfo, setToggleEventInfo] = useState(false);
	const [eventInfo, setEventInfo] = useState<IEvent>(events[0]);
	useMinimizeAside();
	const [viewMode, setViewMode] = useState<TView>(Views.MONTH);
	const [date, setDate] = useState(new Date());
	const unitType = getUnitType(viewMode);
	const calendarDateLabel = getLabel(date, viewMode);

	const handleRightPainel = () => {
		setRightPanel(!toggleRightPanel);
		setToggleRightPanel(!toggleRightPanel);
	}
	const handleViewMode = (e: moment.MomentInput) => {
		setDate(moment(e).toDate());
		setViewMode(Views.DAY);
	};
	const views = getViews();

	const syncStrava = () => {
		api.post('auth/syncStrava')
			.then((resp: any) => {console.log(resp.data)
				if (resp.data.error) {
					showNotification('Atenção!', resp.data.message, 'warning');
				} else {
					showNotification('Sucesso!', resp.data.message, 'success');
					if (setAuth) setAuth(resp.data.user);
				}
			})
	}

	const getEvents = () => {
		api.post('event/getEvents', {date: moment(date).format(moment.HTML5_FMT.DATE), viewMode})
			.then(async (resp: any) => {
				let arrTmp:any[] = [];

				await resp.data.forEach((event: any) => {
					arrTmp.push({
						...event,
						start: moment(event.date).toDate(),
						end: moment(event.date).toDate(),
						icon: event.type
					});
				})

				setEvents(arrTmp);
			})
	}

	const setEvent = (id: any, type: string = 'PARTICIPANT') => {
		setIsLoading(false);
		api.post(`event/setUserEvent/${id}/${type}`)
			.then((resp: any) => {
				setIsLoading(false);
				if (resp.data.error) {
					return showNotification('Atenção!', resp.data.message, 'warning');
				}
				showNotification('Sucesso!', resp.data.message, 'success');
			})
	}

	useEffect(() => {
		setEvents(eventList);
		return () => {};
	}, []);

	useEffect(() => {
		getEvents();
	}, [date, viewMode]);

	return (
		<PageWrapper title='teste'>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						Eventos Programados
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						icon='Groups'
						onClick={() => handleRightPainel()}
						color={toggleRightPanel ? 'dark' : 'light'}
						aria-label='Toggle right panel'
					>Meus status</Button>
					<Button
						icon='AreaChart'
						onClick={syncStrava}
						color='light'
						aria-label='Toggle calendar & charts'
					>Sincronizar Dados Strava</Button>
					<Popovers
						desc={
							<DatePicker
								locale={ptBR}
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color={darkModeStatus ? 'light' : 'dark'} isLight>
							{calendarDateLabel}
						</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row h-100'>
					<OffCanvas
						setOpen={(status: boolean) => {
							setToggleEventInfo(status);
						}}
						isOpen={toggleEventInfo}
						titleId='canvas-title'>
						<OffCanvasHeader
							setOpen={(status: boolean) => {
								setToggleEventInfo(status);
							}}
							className='p-4'>
							<OffCanvasTitle id='canvas-title'>
								Informações do evento
							</OffCanvasTitle>
						</OffCanvasHeader>
						<OffCanvasBody tag='form' className='p-4'>
							<div className='row g-4'>
								{/* Date */}
								<div className='col-12'>
									<Card className='mb-0 bg-l10-info' shadow='sm'>
										<CardHeader className='bg-l25-info'>
											<CardLabel icon='DateRange' iconColor='info'>
												<CardTitle className='text-info'>
													Detalhes
												</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody>
											<div className='row g-3'>
												<div className='col-12'>
													<FormGroup id='name' label='Nome'>
														<Input
															type='text'
															value={eventInfo.name}
															disabled
														/>
													</FormGroup>
												</div>

												<div className='col-12'>
													<FormGroup id='description' label='Descrição / Detalhes'>
														<Textarea
															rows={4}
															value={eventInfo.description}
															disabled
														/>
													</FormGroup>
												</div>

												<div className='col-6'>
													<FormGroup id='points' label='Pontos'>
														<Input
															type='text'
															value={eventInfo.points}
															disabled
														/>
													</FormGroup>
												</div>

												<div className='col-6'>
													<FormGroup id='points' label='Pontos Acompanhante'>
														<Input
															type='text'
															value={eventInfo.points_companion}
															disabled
														/>
													</FormGroup>
												</div>

												<div className='col-12'>
													<FormGroup
														id='start'
														label='Data'>
														<Input
															type='date'
															value={
																eventInfo.start !== null ? moment(eventInfo.start).format(moment.HTML5_FMT.DATE) : ''
															}
															disabled
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</div>

								<div className='col'>
									<Button
										color='success'
										style={{marginRight: '15px'}}
										isDisable={isLoading}
										onClick={() => setEvent(eventInfo.id)}
									>
										{isLoading && (
											<Spinner isSmall inButton isGrow />
										)}
										Eu fui!
									</Button>

									<Button
										color='info'
										onClick={() => setEvent(eventInfo.id, 'COMPANION')}
										isDisable={isLoading}
									>
										{isLoading && (
											<Spinner isSmall inButton isGrow />
										)}
										Eu Acompanhei!
									</Button>
								</div>
							</div>
						</OffCanvasBody>
					</OffCanvas>

					<div
						className={classNames({
							'col-12': toggleRightPanel,
						})}>
						<Card stretch style={{ minHeight: 680 }}>
							<CardHeader>
								<CardActions>
									<CalendarTodayButton
										unitType={unitType}
										date={date}
										setDate={setDate}
										viewMode={viewMode}
									/>
								</CardActions>
								<CardActions>
									<CalendarViewModeButtons
										setViewMode={setViewMode}
										viewMode={viewMode}
									/>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable>
								<Calendar
									messages={{
										date: 'Data',
										event: 'Evento',
										time: 'Horário',
										noEventsInRange: (`Nenhum evento encontrado: ${moment(date).format('DD/MM/YYYY')}`)
									}}
									selectable
									toolbar={false}
									localizer={localizer}
									events={events}
									defaultView={Views.WEEK}
									views={views}
									view={viewMode}
									date={date}
									onNavigate={(_date) => setDate(_date)}
									scrollToTime={new Date(1970, 1, 1, 6)}
									defaultDate={new Date()}
									onSelectEvent={(event) => {
										setEventInfo(event);
										setToggleEventInfo(true);
									}}
									onView={handleViewMode}
									onDrillDown={handleViewMode}
									components={{
										event: MyEvent
									}}
								/>
							</CardBody>
						</Card>
					</div>
				</div>
				
				<CommonRightPanel setOpen={handleRightPainel} isOpen={toggleRightPanel} />
			</Page>
		</PageWrapper>
	);
};

export default DashboardBookingPage;
