import CardComponent from '../components/card';
import FormComponent from '../components/form';
import LoadMoreButtonComponent from '../components/load-more';
import NoTasksComponent from '../components/no-tasks';
import SortComponent, {SortType} from '../components/sort';
import TasksComponent from '../components/tasks';

import {render, replace} from '../utils/dom';

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


const getSortedTasks = (tasks, sortType, from, to) => {
  const sortedTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      break;
  }

  return sortedTasks.slice(from, to);
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (tasksShownCount >= tasks.length) {
        return;
      }

      render(this._container.getElement(), this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksShownCount = tasksShownCount;
        tasksShownCount += TASKS_ON_CLICK_COUNT;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksShownCount, tasksShownCount);

        sortedTasks.forEach((task) => renderTask(this._tasksComponent, task));

        if (tasksShownCount >= tasks.length) {
          this._loadMoreButtonComponent.removeElement();
        }
      });
    };

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived || tasks.length === 0) {
      render(this._container.getElement(), this._noTaskComponent);
      return;
    }

    render(this._container.getElement(), this._sortComponent);
    render(this._container.getElement(), this._tasksComponent);

    let tasksShownCount = TASKS_ON_START_COUNT;
    tasks.slice(0, tasksShownCount)
      .forEach((task) => renderTask(this._tasksComponent, task));

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      tasksShownCount = TASKS_ON_CLICK_COUNT;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, tasksShownCount);

      // Взял с репо академии, но вообще-то не очень чистый способ удаления компонентов
      this._tasksComponent.getElement().innerHTML = ``;

      sortedTasks.forEach((task) => renderTask(this._tasksComponent, task));

      renderLoadMoreButton();
    });
  }
}
