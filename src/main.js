import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FiltersComponent from './components/filters';
import MenuComponent from './components/menu';

import {filtersMock} from './mocks/filters';
import {generateTasksMock} from './mocks/tasks';

import {render} from './utils/dom';


const TASKS_COUNT = 22;


const mainControl = document.querySelector(`.main__control`);
render(mainControl, new MenuComponent());

const mainElement = document.querySelector(`.main`);
render(mainElement, new FiltersComponent(filtersMock));

const tasks = generateTasksMock(TASKS_COUNT);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(mainElement, boardComponent);
boardController.render(tasks);
