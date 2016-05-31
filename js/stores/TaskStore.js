import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class TaskStore extends Store {
  constructor() {
    super();
    this._tasks = null;
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    super.emitChange();
  }

  getAll() {
    return this._tasks;
  }
}

const taskStore = new TaskStore();

taskStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.TASKS_LOAD:
      taskStore._setTasks(action.data);
      break;
    default:
      return;
  }
});

export default taskStore;
