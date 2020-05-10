import {
  formatDateMonth,
  formatTime12,
} from '../utils/time';
import AbstractComponent from './abstract-component';

const getDatesMarkup = (date) => {
  if (!date) {
    return ``;
  }

  return (
    `<div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">${formatDateMonth(date)}</span>
          <span class="card__time">${formatTime12(date)}</span>
        </p>
      </div>
    </div>`
  );
};


const getButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};


const getCardMarkup = (task) => {
  const {description, dueDate, repeatingDays, color, isFavorite, isArchive} = task;
  const repeatClass = Object.values(repeatingDays)
    .some((it) => it === true) ? `card--repeat` : ``;
  const deadlineClass = !dueDate || dueDate.getTime() > Date.now() ? `` : `card--deadline`;
  const deadlineMarkup = getDatesMarkup(dueDate);

  return (
    `<article class="card card--${color} ${deadlineClass} ${repeatClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${getButtonMarkup(`edit`)}
            ${getButtonMarkup(`archive`, !isArchive)}
            ${getButtonMarkup(`favorites`, !isFavorite)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${deadlineMarkup}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return getCardMarkup(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}
