export const renderMarkup = (parent, markup, place) => parent.insertAdjacentHTML(place, markup);

export const createElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;

  return element.firstChild;
};

export const render = (parent, element, place = `beforeend`) => parent.insertAdjacentElement(place, element);
