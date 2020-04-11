export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomArrayItem = (array) => {
  return array[randomNumber(0, array.length - 1)];
};

