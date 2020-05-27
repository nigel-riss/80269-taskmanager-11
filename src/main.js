import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import MenuComponent, {MenuItem} from './components/menu';
import StatisticsComponent from './components/statistics';
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

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
statisticsComponent.hide();
render(mainElement, statisticsComponent);

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
