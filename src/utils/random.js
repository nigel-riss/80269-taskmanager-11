export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomArrayItem = (array) => array[randomNumber(0, array.length - 1)];

export const randomDate = (daysDelta) => {
  const msDelta = daysDelta * 1000 * 60 * 60 * 24;
  return new Date(Date.now() + randomNumber(-msDelta, msDelta));
};
