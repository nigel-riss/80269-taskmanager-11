import AbstractComponent from './abstract-component';

const getLoadMoreMarkup = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return getLoadMoreMarkup();
  }
}
