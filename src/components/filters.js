const getFilterMarkup = (filter) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>`
  );
};

const getFiltersMarkup = (filters) => {
  const filtersMarkup = filters.reduce((markup, filter) => {
    return (markup += getFilterMarkup(filter));
  }, ``);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default getFiltersMarkup;
