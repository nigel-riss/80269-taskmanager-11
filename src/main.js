import Board from './components/board.js';
import Card from './components/card.js';
import Filters from './components/filters.js';
import Form from './components/form.js';
import LoadMoreButton from './components/load-more.js';
import Menu from './components/menu.js';
import Sort from './components/sort.js';

import {filters} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;
const tasks = generateTasksMock(TASKS_COUNT);


const mainControl = document.querySelector(`.main__control`);
const menu = new Menu().getElement();
render(mainControl, menu);

const mainElement = document.querySelector(`.main`);
render(mainElement, new Filters(filters).getElement());

const board = new Board().getElement();
render(mainElement, board);

const sort = new Sort().getElement();
render(board, sort);

const boardTasksContainer = document.querySelector(`.board__tasks`);
const taskEditForm = new Form(tasks[0]).getElement();
render(boardTasksContainer, taskEditForm);

let tasksShownCount = TASKS_ON_START_COUNT;

tasks.slice(1, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, new Card(task).getElement()));

const loadMoreButton = new LoadMoreButton().getElement();
render(board, loadMoreButton);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksShownCount = tasksShownCount;
  tasksShownCount += TASKS_ON_CLICK_COUNT;
  tasks.slice(prevTasksShownCount, tasksShownCount)
    .forEach((task) => render(boardTasksContainer, new Card(task).getElement()));

  if (tasksShownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
