import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterController from './controllers/filter';
import MenuComponent from './components/menu';
import TasksModel from './models/tasks';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;


const mainElement = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);
render(mainControl, new MenuComponent());

const tasks = generateTasksMock(TASKS_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(mainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(mainElement, boardComponent);
boardController.render(tasks);
