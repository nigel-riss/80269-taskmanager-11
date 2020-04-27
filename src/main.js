import BoardComponent from './components/board';
import CardComponent from './components/card';
import FiltersComponent from './components/filters';
import FormComponent from './components/form';
import LoadMoreButtonComponent from './components/load-more';
import MenuComponent from './components/menu';
import NoTasksComponent from './components/no-tasks';
import SortComponent from './components/sort';
import TasksComponent from './components/tasks';

import {filters} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render, replace, remove} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;

const renderTask = (tasksComponent, task) => {
  const replaceTaskToEdit = () =>
    replace(taskEditComponent, taskComponent);

  const replaceEditToTask = () =>
    replace(taskComponent, taskEditComponent);

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

  render(tasksComponent.getElement(), taskComponent);
};


const renderBoard = (boardComponent, tasks) => {
  const areAllTasksArchived = tasks.every((task) => task.isArchive);

  if (areAllTasksArchived || tasks.length === 0) {
    render(boardComponent.getElement(), new NoTasksComponent());
    return;
  }

  render(boardComponent.getElement(), new SortComponent());
  const tasksComponent = new TasksComponent();
  render(boardComponent.getElement(), tasksComponent);

  let tasksShownCount = TASKS_ON_START_COUNT;
  tasks.slice(0, tasksShownCount)
    .forEach((task) => renderTask(tasksComponent, task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksShownCount = tasksShownCount;
    tasksShownCount += TASKS_ON_CLICK_COUNT;
    tasks.slice(prevTasksShownCount, tasksShownCount)
      .forEach((task) => renderTask(tasksComponent, task));

    if (tasksShownCount >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

const mainControl = document.querySelector(`.main__control`);
render(mainControl, new MenuComponent());

const mainElement = document.querySelector(`.main`);
render(mainElement, new FiltersComponent(filters));

const tasks = generateTasksMock(TASKS_COUNT);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent);
renderBoard(boardComponent, tasks);
