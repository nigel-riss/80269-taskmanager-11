import FilterComponent from '../components/filters';
import {FilterType} from '../utils/const';
import {render, replace} from '../utils/dom';
import {getTasksByFilter} from '../utils/filter';


export default class FilterController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const allTasks = this._tasksModel.getTasks();
    const filters = Object.values(FilterType)
      .map((filterType) => {
        return {
          name: filterType,
          count: getTasksByFilter(allTasks, filterType).length,
          checked: filterType === this._activeFilterType,
        };
      });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
  }
}
