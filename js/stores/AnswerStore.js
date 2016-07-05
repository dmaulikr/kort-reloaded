import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class AnswerStore extends Store {
  constructor() {
    super();
    this._answers = null;
    this._error = null;
  }

  _setAllAnswers(answers) {
    this._answers = answers;
    super.emitChange();
  }

  _setAnswersForType(taskType, answers) {
    if (this._answers === null) this._answers = new Map();
    this._answers.set(taskType, answers);
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  _clearError() {
    this._error = null;
  }

  getAnswersForType(taskType) {
    if (this._answers === null) return null;

    const answers = this._answers.get(taskType);
    if (answers === undefined) return null;

    return answers;
  }

  getAllAnswers() {
    return this._answers;
  }

  getError() {
    return this._error;
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
    case ActionTypes.ANSWERS_ERROR_LOAD:
    case ActionTypes.ANSWERS_ERROR_LOAD_FOR_TYPE:
      answerStore._raiseError();
      break;
    case ActionTypes.ANSWERS_CLEAR_ERROR:
      answerStore._clearError();
      break;
    default:
      return;
  }
});

export default answerStore;
