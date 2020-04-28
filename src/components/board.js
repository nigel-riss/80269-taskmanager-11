import AbstractComponent from './abstract-component';

const getBoardMarkup = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return getBoardMarkup();
  }
}
