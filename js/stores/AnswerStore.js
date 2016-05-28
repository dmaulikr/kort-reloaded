import ActionTypes from '../constants/ActionTypes';
import AnswerActions from '../actions/AnswerActions';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

let _allAnswers = [];
let _answers = [];
let _taskType;

class AnswerStore extends Store {
  constructor() {
    this._registerWithDispatcher();
  }
  _onAnswersLoaded(answers) {
    if (answers.toString() !== _answers.toString()) {
      _allAnswers = answers;
      super.emitChange();
    }
  }

  _onAnswersLoadedForType(answers, taskType) {
    if ((taskType !== _taskType) && (answers.toString() !== _answers.toString())) {
      _taskType = taskType;
      _answers = answers;
      super.emitChange();
    }
  }

  _registerWithDispatcher() {
    AppDispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.ANSWERS_LOAD:
          this.onAnswersLoaded(action.data);
          break;
        case ActionTypes.ANSWERS_LOAD_FOR_TYPE:
          this.onAnswersLoadedForType(action.data, action.taskType);
          break;
        default:
          return;
      }
    });
  }
}
