import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

export default class AnswerStore extends Store {
  constructor() {
    super();
    this._allAnswers = null;
    this._answers = null;
    this._taskType = null;
    this.dispatchToken = AppDispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.ANSWERS_LOAD:
          this._onAnswersLoaded(action.data);
          break;
        case ActionTypes.ANSWERS_LOAD_FOR_TYPE:
          this._onAnswersLoadedForType(action.data, action.taskType);
          break;
        default:
          return;
      }
    });
  }

  _onAnswersLoaded(answers) {
    this._allAnswers = answers;
    super.emitChange();
  }

  _onAnswersLoadedForType(answers, taskType) {
    this._taskType = taskType;
    this._answers = answers;
    super.emitChange();
  }
}
