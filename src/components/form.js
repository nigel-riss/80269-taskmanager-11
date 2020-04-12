import {COLORS, DAYS} from '../utils/const';

const getDaysRepeatMarkup = (days, repeatingDays) => {
  const daysRepeatMarkup = days.map((day, index) => {
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${index}"
        name="repeat"
        value="${day}"
        ${repeatingDays[day] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-${index}"
        >${day}</label
      >`
    );
  }).join(`\n`);

  return daysRepeatMarkup;
};

const getColorOptionsMarkup = (colors, currentColor) => {
  const colorsOptionsMarkup = colors.map((color) => {
    return (
      `<input
        type="radio"
        id="color-${color}-4"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${color === currentColor ? `checked` : ``}
      />
      <label
        for="color-${color}-4"
        class="card__color card__color--${color}"
        >${color}</label
      >`
    );
  }).join(`\n`);

  return colorsOptionsMarkup;
};

const getDueDateMarkup = (dueDate) => {
  if (!dueDate) {
    return ``;
  }

  return (
    `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="23 September 16:15"
        />
      </label>
    </fieldset>`
  );
};

const getFormMarkup = (task) => {
  const {description, dueDate, repeatingDays, color} = task;
  const isRepeating = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeating ? `card--repeat` : ``;
  const dueDateMarkup = getDueDateMarkup(dueDate);
  const daysRepeatMarkup = getDaysRepeatMarkup(DAYS, repeatingDays);
  const colorsOptionsMarkup = getColorOptionsMarkup(COLORS, color);

  return (
    `<article class="card card--edit card--${color} ${repeatClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${dueDate ? `yes` : `no`}</span>
                </button>

                ${dueDateMarkup}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${isRepeating ? daysRepeatMarkup : ``}
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsOptionsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default getFormMarkup;
