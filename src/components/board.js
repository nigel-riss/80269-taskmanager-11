import {createElement} from '../utils/dom';

const getBoardMarkup = () => {
  return (
    `<section class="board container">
      <div class="board__tasks">
      </div>
    </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getBoardMarkup();
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
