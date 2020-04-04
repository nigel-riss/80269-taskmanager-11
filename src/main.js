import {getMenuMarkup} from './components/menu.js';
import {getFiltersMarkup} from './components/filters.js';
import {getSortMarkup} from './components/sort.js';
import {getBoardMarkup} from './components/board.js';
import {getFormMarkup} from './components/form.js';
import {getCardMarkup} from './components/card.js';
import {getLoadMoreMarkup} from './components/load-more.js';

const TASKS_COUNT = 3;

const render = (parent, markup, place) => {
  parent.insertAdjacentHTML(place, markup);
};

const mainControl = document.querySelector(`.main__control`);
render(mainControl, getMenuMarkup(), `beforeend`);

const mainElement = document.querySelector(`.main`);
render(mainElement, getFiltersMarkup(), `beforeend`);
render(mainElement, getBoardMarkup(), `beforeend`);

const board = document.querySelector(`.board`);
render(board, getSortMarkup(), `afterbegin`);

const boardTasksContainer = document.querySelector(`.board__tasks`);
render(boardTasksContainer, getFormMarkup(), `beforeend`);
for (let i = 0; i < TASKS_COUNT; i++) {
  render(boardTasksContainer, getCardMarkup(), `beforeend`);
}
render(board, getLoadMoreMarkup(), `beforeend`);
