export const createElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;

  return element.firstChild;
};


export const render = (parent, component, place = `beforeend`) =>
  parent.insertAdjacentElement(place, component.getElement());


export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  if (parentElement && newElement && oldElement) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
