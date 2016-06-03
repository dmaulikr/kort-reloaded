import AnswerActions from '../actions/AnswerActions';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import AppDispatcher from '../dispatcher/AppDispatcher';

import loginStore from './LoginStore';
import Store from './Store';

const taskTypes = [Config.TASK_TYPE_MOTORWAY_REF, Config.TASK_TYPE_RELIGION,
  Config.TASK_TYPE_POI_NAME, Config.TASK_TYPE_MISSING_MAXSPEED, Config.TASK_TYPE_LANGUGAGE_UNKNOWN,
  Config.TASK_TYPE_MISSING_TRACK_TYPE, Config.TASK_TYPE_WAY_WITHOUT_TAGS,
  Config.TASK_TYPE_MISSING_CUISINE];

class AnswerStore extends Store {
  constructor() {
    super();
    this._answers = new Map();
    this._allAnswers = null;
    if (loginStore.isLoggedIn()) {
      this._initializeAnswers();
    } else {
      loginStore.addChangeListener(this._initializeAnswers);
    }
  }

  _setAnswersForType(answers, taskType) {
    this._answers.set(taskType, answers);
    super.emitChange();
  }

  _initializeAnswers() {
    if (!loginStore.isLoggedIn()) return;

    taskTypes.forEach((taskType) => {
      AnswerActions.loadAnswersForType(taskType);
    });
    AnswerActions.loadAnswers();
  }

  _setAllAnswers(answers) {
    this._allAnswers = answers;
    super.emitChange();
  }

  getAnswersForType(taskType) {
    return this._answers.get(taskType);
  }

  getAllAnswers() {
    return this._allAnswers;
  }
}

const answerStore = new AnswerStore();

answerStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.ANSWERS_LOAD:
      answerStore._setAllAnswers(action.data);
      break;
    case ActionTypes.ANSWERS_LOAD_FOR_TYPE:
      answerStore._setAnswersForType(action.data, action.taskType);
      break;
    default:
      return;
  }
});

export default answerStore;
