import {MONTHS} from '../utils/const';

export const formatDateMonth = (date) => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

export const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};
