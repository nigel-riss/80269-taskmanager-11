import {MONTHS} from '../utils/const';

const zeroPad2Digit = (value) => value < 10 ? `0${value}` : String(value);

export const formatDateMonth = (date) => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

export const formatTime12 = (date) => {
  const hours = zeroPad2Digit(date.getHours() % 12);
  const minutes = zeroPad2Digit(date.getMinutes());
  const interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
};

export const formatTime24 = (date) => `${zeroPad2Digit(date.getHours())}:${zeroPad2Digit(date.getMinutes())}`;
