import {randomNumber, randomArrayItem, randomDate} from '../utils/random';

const DAYS_DELTA = 7;

const tasksDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const generateTask = () => {
  return {
    description: randomArrayItem(tasksDescriptions),
    dueDate: Math.random() > 0.5 ? randomDate(DAYS_DELTA) : null,
  };
};

export const generateTasksMock = (count) => {
  const tasks = Array(count).fill(undefined).map(() => generateTask());
  return tasks;
};
