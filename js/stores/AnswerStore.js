import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class AnswerStore extends Store {
  constructor() {
    super();
    this._answers = null;
  }

  _setAllAnswers(answers) {
    this._answers = answers;
    super.emitChange();
  }

  _setAnswersForType(taskType, answers) {
    this._answers.set(taskType, answers);
    super.emitChange();
  }

  getAnswersForType(taskType) {
    if (this._answers === null) return null;

    return this._answers.get(taskType);
  }

  getAllAnswers() {
    return this._answers;
  }
}

const answerStore = new AnswerStore();

answerStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.ANSWERS_LOAD:
      answerStore._setAllAnswers(action.data);
      break;
    case ActionTypes.ANSWERS_LOAD_FOR_TYPE:
      answerStore._setAnswersForType(action.taskType, action.data);
      break;
    default:
      return;
  }
});

export default answerStore;
