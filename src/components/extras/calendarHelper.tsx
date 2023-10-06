import PropTypes from 'prop-types';
import { Views } from 'react-big-calendar';
import moment from 'moment';
import {ptBR} from "date-fns/locale";
import React, { FC } from 'react';
import Button, { ButtonGroup } from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';

moment.locale('pt-BR');
export const getUnitType = (viewMode: 'month' | 'week' | 'work_week' | 'day' | 'agenda') => {
	let unitType = null;
	switch (viewMode) {
		case Views.WEEK:
		case Views.WORK_WEEK:
			unitType = Views.WEEK;
			break;
		case Views.MONTH:
		case Views.AGENDA:
			unitType = Views.MONTH;
			break;
		default:
			unitType = Views.DAY;
	}
	return unitType;
};

export const getLabel = (
	date: moment.MomentInput,
	viewMode: 'month' | 'week' | 'work_week' | 'day' | 'agenda',
) => {
	if (viewMode === Views.MONTH || viewMode === Views.AGENDA) return moment(date).format('MM/YYYY');
	return moment(date).format('dddd, MMM D');
};

export const getTodayButtonLabel = (
	viewMode: 'month' | 'week' | 'work_week' | 'day' | 'agenda',
) => {
	if (viewMode === Views.MONTH || viewMode === Views.AGENDA) return 'Este Mês';
	if (viewMode === Views.WEEK || viewMode === Views.WORK_WEEK) return 'Esta Semana';
	return 'Hoje';
};

export const getViews = () => {
	// @ts-ignore
	return Object.keys(Views).map((k) => Views[k]);
};

interface ICalendarTodayButtonProps {
	setDate(...args: unknown[]): unknown;
	date: object;
	unitType: string;
	viewMode: 'month' | 'week' | 'work_week' | 'day' | 'agenda';
}
export const CalendarTodayButton: FC<ICalendarTodayButtonProps> = ({
	setDate,
	date,
	unitType,
	viewMode,
}) => {
	return (
		<ButtonGroup>
			<Button
				color='info'
				isLight
				// @ts-ignore
				onClick={() => setDate(moment(date).add(-1, unitType).toDate())}
				icon='ChevronLeft'
				aria-label='Prev'
			/>
			{/* @ts-ignore*/}
			<Button color='info' isLight onClick={() => setDate(moment().toDate())}>
				{getTodayButtonLabel(viewMode)}
			</Button>
			<Button
				color='info'
				isLight
				// @ts-ignore
				onClick={() => setDate(moment(date).add(1, unitType).toDate())}
				icon='ChevronRight'
				aria-label='Next'
			/>
		</ButtonGroup>
	);
};

CalendarTodayButton.propTypes = {
	setDate: PropTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	date: PropTypes.object.isRequired,
	unitType: PropTypes.string.isRequired,
	// @ts-ignore
	viewMode: PropTypes.oneOf(['month', 'week', 'work_week', 'day', 'agenda']).isRequired,
};

interface ICalendarViewModeButtonsProps {
	viewMode: 'month' | 'week' | 'work_week' | 'day' | 'agenda';
	setViewMode(...args: unknown[]): unknown;
}
export const CalendarViewModeButtons: FC<ICalendarViewModeButtonsProps> = ({
	viewMode,
	setViewMode,
}) => {
	return (
		<Dropdown>
			<DropdownToggle>
				<Button
					color='info'
					isLight
					icon={
						(viewMode === Views.MONTH && 'calendar_view_month') ||
						(viewMode === Views.WEEK && 'calendar_view_week') ||
						(viewMode === Views.WORK_WEEK && 'view_week') ||
						(viewMode === Views.DAY && 'calendar_view_day') ||
						'view_agenda'
					}>
					{(viewMode === Views.MONTH && 'Mês') ||
						(viewMode === Views.WEEK && 'Week') ||
						(viewMode === Views.WORK_WEEK && 'Work Week') ||
						(viewMode === Views.DAY && 'Day') ||
						'Agenda'}
				</Button>
			</DropdownToggle>
			<DropdownMenu isAlignmentEnd>
				<DropdownItem>
					<Button
						color='link'
						icon='calendar_view_month'
						isActive={viewMode === Views.MONTH}
						onClick={() => setViewMode(Views.MONTH)}>
						Mês
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						color='link'
						icon='view_agenda'
						isActive={viewMode === Views.AGENDA}
						onClick={() => setViewMode(Views.AGENDA)}>
						Agenda
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
CalendarViewModeButtons.propTypes = {
	// @ts-ignore
	viewMode: PropTypes.oneOf(['month', 'week', 'work_week', 'day', 'agenda']).isRequired,
	setViewMode: PropTypes.func.isRequired,
};
