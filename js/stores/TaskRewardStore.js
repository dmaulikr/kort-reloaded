import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class TaskRewardStore extends Store {
  constructor() {
    super();
    this._taskReward = null;
  }

  _setTaskReward(taskReward) {
    this._taskReward = taskReward;
    super.emitChange();
  }

  getTaskReward() {
    return this._taskReward;
  }
}

const taskRewardStore = new TaskRewardStore();

taskRewardStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSION_PUT:
    case ActionTypes.VALIDATION_PUT:
      taskRewardStore._setTaskReward(action.data);
      break;
    default:
      return;
  }
});

export default taskRewardStore;
