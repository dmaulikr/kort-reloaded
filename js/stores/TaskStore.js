import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

let _tasks = [];

class TaskStore extends Store {
  getAll() {
    return _tasks;
  }
}

const taskStore = new TaskStore();

function updateTasks(tasks) {
  // only emit change if tasks changed
  // currently depends on the assumption that tasks are always retrieved in the same order
  // TODO: make comparison more robust
  if (tasks.toString() !== _tasks.toString()) {
    _tasks = tasks;
    taskStore.emitChange();
  }
}

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.TASKS_LOAD:
      updateTasks(action.data);
      break;

    default:
      return;
  }
});

export default taskStore;
