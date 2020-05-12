import LoadMoreButtonComponent from '../components/load-more';
import NoTasksComponent from '../components/no-tasks';
import SortComponent, {SortType} from '../components/sort';
import TasksComponent from '../components/tasks';

import TaskController from '../controllers/task';

import {render, remove} from '../utils/dom';


const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;


const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
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

    this._tasks = [];
    this._shownTaskControllers = [];
    this._tasksShownCount = TASKS_ON_START_COUNT;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived || this._tasks.length === 0) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const newTasks = renderTasks(
        this._tasksComponent.getElement(),
        this._tasks.slice(0, this._tasksShownCount),
        this._onDataChange,
        this._onViewChange
    );
    this._shownTaskControllers = this._shownTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._tasksShownCount >= this._tasks.length) {
      return;
    }

    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksShownCount = this._tasksShownCount;
      this._tasksShownCount += TASKS_ON_CLICK_COUNT;

      const sortedTasks = getSortedTasks(
          this._tasks,
          this._sortComponent.getSortType(),
          prevTasksShownCount,
          this._tasksShownCount
      );
      const newTasks = renderTasks(
          this._tasksComponent.getElement(),
          sortedTasks,
          this._onDataChange,
          this._onViewChange
      );
      this._shownTaskControllers = this._shownTaskControllers.concat(newTasks);

      if (this._tasksShownCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._tasksShownCount = TASKS_ON_CLICK_COUNT;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._tasksShownCount);

    // Взял с репо академии, но вообще-то не очень чистый способ удаления компонентов
    this._tasksComponent.getElement().innerHTML = ``;

    const newTasks = renderTasks(
        this._tasksComponent.getElement(),
        sortedTasks,
        this._onDataChange,
        this._onViewChange
    );
    this._shownTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    // this._tasks[index] = newData;
    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._shownTaskControllers
      .forEach((it) => it.setDefaultView());
  }
}
