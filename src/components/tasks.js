import {createElement} from '../utils/dom';

const getTasksMarkup = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTasksMarkup();
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
