import BoardComponent from './components/board.js';
import CardComponent from './components/card.js';
import FiltersComponent from './components/filters.js';
import FormComponent from './components/form.js';
import LoadMoreButtonComponent from './components/load-more.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import TasksComponent from './components/tasks.js';

import {filters} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;
const tasks = generateTasksMock(TASKS_COUNT);


const renderTask = (tasksContainer, task) => {
  const replaceTaskToEdit = () =>
    tasksContainer.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());

  const replaceEditToTask = () =>
    tasksContainer.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new CardComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new FormComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksContainer, taskComponent.getElement());
};


const mainControl = document.querySelector(`.main__control`);
render(mainControl, new MenuComponent().getElement());

const mainElement = document.querySelector(`.main`);
render(mainElement, new FiltersComponent(filters).getElement());

const board = new BoardComponent().getElement();
render(mainElement, board);

const sort = new SortComponent().getElement();
render(board, sort, `afterbegin`);

const tasksContainer = new TasksComponent().getElement();
render(board, tasksContainer);


let tasksShownCount = TASKS_ON_START_COUNT;

tasks.slice(0, tasksShownCount)
  .forEach((task) => renderTask(tasksContainer, task));

const loadMoreButton = new LoadMoreButtonComponent().getElement();
render(board, loadMoreButton);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksShownCount = tasksShownCount;
  tasksShownCount += TASKS_ON_CLICK_COUNT;
  tasks.slice(prevTasksShownCount, tasksShownCount)
    .forEach((task) => renderTask(tasksContainer, task));

  if (tasksShownCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
