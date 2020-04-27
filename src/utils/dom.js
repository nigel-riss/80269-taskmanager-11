export const createElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;

  return element.firstChild;
};

export const render = (parent, element, place = `beforeend`) => parent.insertAdjacentElement(place, element);

export const replace = (parent, newElement, oldElement) => parent.replaceChild(newElement, oldElement);
