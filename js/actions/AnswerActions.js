import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AnswerLoader from '../data/AnswerLoader';

export default class AnswerActions {
  static loadAnswers() {
    AnswerLoader.getAnswers(
      (answers) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ANSWERS_LOAD,
          data: answers,
        });
      },
      null
    );
  }

  static loadAnswersForType(taskType) {
    AnswerLoader.getAnswersForType(
      taskType,
      (answers) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ANSWERS_LOAD_FOR_TYPE,
          data: answers,
          taskType,
        });
      },
      null
    );
  }
}
