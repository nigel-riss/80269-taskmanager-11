import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import MenuComponent, {MenuItem} from './components/menu';
import TasksModel from './models/tasks';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;


const mainElement = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);
const menuComponent = new MenuComponent();
render(mainControl, menuComponent);

const tasks = generateTasksMock(TASKS_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(mainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(mainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
