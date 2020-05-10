import TaskComponent from '../components/task';
import TaskEditComponent from '../components/task-edit';

import {render, replace} from '../utils/dom';

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      console.log('archive clicked');
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      console.log('favorites clicked');
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this._taskComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
