import getMenuMarkup from './components/menu.js';
import getFiltersMarkup from './components/filters.js';
import getSortMarkup from './components/sort.js';
import getBoardMarkup from './components/board.js';
import getFormMarkup from './components/form.js';
import Card from './components/card.js';
import getLoadMoreMarkup from './components/load-more.js';

import {filters} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render, renderMarkup} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;

const tasks = generateTasksMock(TASKS_COUNT);

const mainControl = document.querySelector(`.main__control`);
renderMarkup(mainControl, getMenuMarkup(), `beforeend`);

const mainElement = document.querySelector(`.main`);
renderMarkup(mainElement, getFiltersMarkup(filters), `beforeend`);
renderMarkup(mainElement, getBoardMarkup(), `beforeend`);

const board = document.querySelector(`.board`);
renderMarkup(board, getSortMarkup(), `afterbegin`);

const boardTasksContainer = document.querySelector(`.board__tasks`);
renderMarkup(boardTasksContainer, getFormMarkup(tasks[0]), `beforeend`);

let tasksShownCount = TASKS_ON_START_COUNT;

tasks.slice(1, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, new Card(task).getElement()));

renderMarkup(board, getLoadMoreMarkup(), `beforeend`);
const loadMoreButton = board.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksShownCount = tasksShownCount;
  tasksShownCount += TASKS_ON_CLICK_COUNT;
  tasks.slice(prevTasksShownCount, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, new Card(task).getElement()));

  if (tasksShownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
