import LoadMoreButtonComponent from '../components/load-more';
import NoTasksComponent from '../components/no-tasks';
import SortComponent, {SortType} from '../components/sort';
import TasksComponent from '../components/tasks';

import TaskController, {Mode as TaskControllerMode, EmptyTask} from '../controllers/task';

import {render, remove} from '../utils/dom';


const TASKS_ON_START_COUNT = 8;
const TASKS_ON_CLICK_COUNT = 8;


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
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._shownTaskControllers = [];
    this._shownTasksCount = TASKS_ON_START_COUNT;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingTask = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();

    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived || tasks.length === 0) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    this._renderTasks(tasks.slice(0, this._shownTasksCount));

    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  _removeTasks() {
    this._shownTaskControllers.forEach((taskController) => taskController.destroy());
    this._shownTaskControllers = [];
  }

  _renderTasks(tasks) {
    const newTasks = tasks.map((task) => {
      const taskController = new TaskController(
          this._tasksComponent.getElement(),
          this._onDataChange,
          this._onViewChange
      );
      taskController.render(task, TaskControllerMode.DEFAULT);
      return taskController;
    });

    this._shownTaskControllers = this._shownTaskControllers.concat(newTasks);
    this._shownTasksCount = this._shownTaskControllers.length;
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._shownTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onSortTypeChange(sortType) {
    this._shownTasksCount = TASKS_ON_CLICK_COUNT;

    const sortedTasks = getSortedTasks(
        this._tasksModel.getTasks(),
        sortType,
        0,
        this._shownTasksCount
    );

    // Взял с репо академии, но вообще-то не очень чистый способ удаления компонентов
    this._tasksComponent.getElement().innerHTML = ``;

    this._removeTasks();
    this._renderTasks(sortedTasks);

    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === EmptyTask) {
      this._creatingTask = null;
      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._shownTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, TaskControllerMode.DEFAULT);

        if (this._shownTasksCount % TASKS_ON_CLICK_COUNT === 0) {
          const destroyedTask = this._shownTaskControllers.pop();
          destroyedTask.destroy();
        }

        this._shownTaskControllers = [].concat(taskController, this._shownTaskControllers);
        this._shownTasksCount = this._shownTaskControllers.length;

        this._renderLoadMoreButton();
      }
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._shownTasksCount);
    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);
      if (isSuccess) {
        taskController.render(newData, TaskControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._shownTaskControllers
      .forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateTasks(TASKS_ON_START_COUNT);
  }

  _onLoadMoreButtonClick() {
    const prevTasksShownCount = this._shownTasksCount;
    this._shownTasksCount += TASKS_ON_CLICK_COUNT;

    const sortedTasks = getSortedTasks(
        this._tasksModel.getTasks(),
        this._sortComponent.getSortType(),
        prevTasksShownCount,
        this._shownTasksCount
    );
    this._renderTasks(sortedTasks);

    if (this._shownTasksCount >= this._tasksModel.getTasks().length) {
      remove(this._loadMoreButtonComponent);
    }
  }
}
