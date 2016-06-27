import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class TaskRewardStore extends Store {
  constructor() {
    super();
    this._taskReward = null;
    this._error = null;
  }

  _setTaskReward(taskReward) {
    this._taskReward = taskReward;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('fix_alert_submit_failure_title'),
      I18n.t('fix_alert_submit_failure_message'));
    super.emitChange();
  }

  getTaskReward() {
    return this._taskReward;
  }

  getError() {
    const error = this._error;
    this._error = null;
    return error;
  }
}

const taskRewardStore = new TaskRewardStore();

taskRewardStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSION_SEND:
    case ActionTypes.VALIDATION_SEND:
      taskRewardStore._setTaskReward(action.data);
      break;
    case ActionTypes.MISSION_ERROR_SEND:
    case ActionTypes.VALIDATION_ERROR_SEND:
      taskRewardStore._raiseError();
      break;
    default:
      return;
  }
});

export default taskRewardStore;
