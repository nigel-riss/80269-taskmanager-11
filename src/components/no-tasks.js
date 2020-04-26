import {createElement} from '../utils/dom';

const getNoTasksMarkup = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};

export default class NoTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getNoTasksMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
