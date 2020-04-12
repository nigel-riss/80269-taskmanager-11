const months = [
  `january`,
  `february`,
  `march`,
  `april`,
  `may`,
  `june`,
  `july`,
  `august`,
  `september`,
  `october`,
  `november`,
  `december`,
];

export const formatDateMonth = (date) => {
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};
