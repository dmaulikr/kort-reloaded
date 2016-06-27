import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class TaskStore extends Store {
  constructor() {
    super();
    this._tasks = null;
    this._error = null;
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  getAll() {
    return this._tasks;
  }

  get(id) {
    if (this._tasks === null) return null;

    for (const task of this._tasks) {
      if (id === task.id) {
        return task;
      }
    }

    return null;
  }

  getError() {
    const error = this._error;
    this._error = null;
    return error;
  }
}

const taskStore = new TaskStore();

taskStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.TASKS_LOAD:
      taskStore._setTasks(action.data);
      break;
    case ActionTypes.MISSIONS_ERROR_LOAD:
    case ActionTypes.VALIDATIONS_ERROR_LOAD:
      taskStore._raiseError();
      break;
    default:
      return;
  }
});

export default taskStore;
