import getMenuMarkup from './components/menu.js';
import getFiltersMarkup from './components/filters.js';
import getSortMarkup from './components/sort.js';
import getBoardMarkup from './components/board.js';
import getFormMarkup from './components/form.js';
import getCardMarkup from './components/card.js';
import getLoadMoreMarkup from './components/load-more.js';

import {filters} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;

const tasks = generateTasksMock(TASKS_COUNT);

const mainControl = document.querySelector(`.main__control`);
render(mainControl, getMenuMarkup(), `beforeend`);

const mainElement = document.querySelector(`.main`);
render(mainElement, getFiltersMarkup(filters), `beforeend`);
render(mainElement, getBoardMarkup(), `beforeend`);

const board = document.querySelector(`.board`);
render(board, getSortMarkup(), `afterbegin`);

const boardTasksContainer = document.querySelector(`.board__tasks`);
render(boardTasksContainer, getFormMarkup(tasks[0]), `beforeend`);

let tasksShownCount = TASKS_ON_START_COUNT;

tasks.slice(1, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, getCardMarkup(task), `beforeend`));

render(board, getLoadMoreMarkup(), `beforeend`);
const loadMoreButton = board.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksShownCount = tasksShownCount;
  tasksShownCount += TASKS_ON_CLICK_COUNT;
  tasks.slice(prevTasksShownCount, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, getCardMarkup(task), `beforeend`));

  if (tasksShownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
