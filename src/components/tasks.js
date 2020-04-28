import AbstractComponent from './abstract-component';

const getTasksMarkup = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return getTasksMarkup();
  }
}
