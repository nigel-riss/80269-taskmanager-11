import {randomNumber, randomArrayItem} from '../utils/random';

const tasksDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const generateTask = () => {
  return {
    description: randomArrayItem(tasksDescriptions),
  };
};

export const generateTasksMock = (count) => {
  const tasks = Array(count).fill(undefined).map(() => generateTask());
  console.log(tasks);
  return tasks;
};
