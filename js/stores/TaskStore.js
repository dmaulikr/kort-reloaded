import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class TaskStore extends Store {
  constructor() {
    super();
    this._tasks = null;
  }

  getAll() {
    return this._tasks;
  }

  _updateTasks(tasks) {
    this._tasks = tasks;
    super.emitChange();
  }
}

const taskStore = new TaskStore();

taskStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.TASKS_LOAD:
      taskStore._updateTasks(action.data);
      break;
    default:
      return;
  }
});

export default taskStore;
