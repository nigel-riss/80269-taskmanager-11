import {createElement} from '../utils/dom';

const getFilterMarkup = (filter, isChecked) => {
  const {title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span>
    </label>`
  );
};

const getFiltersMarkup = (filters) => {
  const filtersMarkup = filters
    .map((filter, index) => getFilterMarkup(filter, index === 0))
    .join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return getFiltersMarkup(this._filters);
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
