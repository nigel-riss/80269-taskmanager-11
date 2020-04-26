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

import {render} from './utils/dom';


const TASKS_COUNT = 22;
const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;

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


const renderBoard = (boardComponent, tasks) => {
  const areAllTasksArchived = tasks.every((task) => task.isArchive);

  if (areAllTasksArchived || tasks.length === 0) {
    render(boardComponent, new NoTasksComponent().getElement());
    return;
  }

  render(boardComponent, new SortComponent().getElement());
  const tasksContainer = new TasksComponent().getElement();
  render(boardComponent, tasksContainer);

  let tasksShownCount = TASKS_ON_START_COUNT;
  tasks.slice(0, tasksShownCount)
    .forEach((task) => renderTask(tasksContainer, task));

  const loadMoreButton = new LoadMoreButtonComponent().getElement();
  render(boardComponent, loadMoreButton);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksShownCount = tasksShownCount;
    tasksShownCount += TASKS_ON_CLICK_COUNT;
    tasks.slice(prevTasksShownCount, tasksShownCount)
      .forEach((task) => renderTask(tasksContainer, task));

    if (tasksShownCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

const mainControl = document.querySelector(`.main__control`);
render(mainControl, new MenuComponent().getElement());

const mainElement = document.querySelector(`.main`);
render(mainElement, new FiltersComponent(filters).getElement());

const tasks = generateTasksMock(TASKS_COUNT);

const boardComponent = new BoardComponent().getElement();
render(mainElement, boardComponent);
renderBoard(boardComponent, tasks);
