import CardComponent from '../components/card';
import FormComponent from '../components/form';
import LoadMoreButtonComponent from '../components/load-more';
import NoTasksComponent from '../components/no-tasks';
import SortComponent from '../components/sort';
import TasksComponent from '../components/tasks';

import {render, replace, remove} from '../utils/dom';

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
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new FormComponent(task);
  taskEditComponent.setSubmitHandler((evt) => {
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

  loadMoreButtonComponent.setClickHandler(() => {
    const prevTasksShownCount = tasksShownCount;
    tasksShownCount += TASKS_ON_CLICK_COUNT;
    tasks.slice(prevTasksShownCount, tasksShownCount)
      .forEach((task) => renderTask(tasksComponent, task));

    if (tasksShownCount >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};


export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
