export const SortFunction = {
  DATE_DOWN(a, b) {
    return b.dueDate - a.dueDate;
  },

  DATE_UP(a, b) {
    return a.dueDate - b.dueDate;
  },

  DEFAULT() {
    return 0;
  },
};
