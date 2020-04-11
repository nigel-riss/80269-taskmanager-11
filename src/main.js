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


const TASKS_COUNT = 3;
const tasks = generateTasksMock(TASKS_COUNT);
console.log(tasks);


const mainControl = document.querySelector(`.main__control`);
render(mainControl, getMenuMarkup(), `beforeend`);

const mainElement = document.querySelector(`.main`);
render(mainElement, getFiltersMarkup(filters), `beforeend`);
render(mainElement, getBoardMarkup(), `beforeend`);

const board = document.querySelector(`.board`);
render(board, getSortMarkup(), `afterbegin`);

const boardTasksContainer = document.querySelector(`.board__tasks`);
render(boardTasksContainer, getFormMarkup(), `beforeend`);
for (let i = 0; i < TASKS_COUNT; i++) {
  render(boardTasksContainer, getCardMarkup(tasks[i]), `beforeend`);
}
render(board, getLoadMoreMarkup(), `beforeend`);
