import {randomArrayItem, randomDate} from '../utils/random';
import {DAYS, COLORS} from '../utils/const';

const DAYS_DELTA = 7;

const TASKS_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const generateRepeatingDays = () => {
  const days = Array(DAYS.length);

  if (Math.random() > 0.5) {
    days.fill(false);
  } else {
    days.fill(Math.random() > 0.5);
  }

  return days;
};

const generateTask = () => {
  return {
    description: randomArrayItem(TASKS_DESCRIPTIONS),
    dueDate: Math.random() > 0.5 ? randomDate(DAYS_DELTA) : null,
    repeatingDays: generateRepeatingDays(),
    color: randomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

export const generateTasksMock = (count) => {
  const tasks = Array(count).fill(undefined).map(() => generateTask());
  return tasks;
};
