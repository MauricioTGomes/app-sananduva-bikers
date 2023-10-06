import moment from 'moment';
export interface IEvent {
	id?: number;
	start?: Date;
	end?: Date;
	icon?: string;
	name: string;
	description?: string;
	points: number;
	color: string;
}
const events: IEvent[] = [
	{
		id: 0,
		start: moment().startOf('month').add(11, 'day').startOf('day').add(9, 'hour').toDate(),
		end: moment().startOf('month').add(11, 'day').startOf('day').add(9, 'hour').toDate(),
		icon: 'PedalBike',
		name: 'Pedal Tapejara',
		points: 300,
		color: 'primary'
	},
	{
		id: 1,
		start: moment().startOf('month').add(40, 'day').startOf('day').add(9, 'hour').toDate(),
		end: moment().startOf('month').add(40, 'day').startOf('day').add(9, 'hour').toDate(),
		icon: 'PedalBike',
		name: 'Pedal Casca',
		points: 300,
		color: 'primary'
	}
];

export default events;
