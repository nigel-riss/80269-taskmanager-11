import moment from 'moment';


export const formatDateMonth = (date) => moment(date).format(`D MMMM`);

export const formatTime12 = (date) => moment(date).format(`LT`);

export const formatTime24 = (date) => moment(date).format(`hh:mm`);
