import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AnswerLoader from '../data/AnswerLoader';

export default class AnswerActions {
  static loadAllAnswers() {
    AnswerLoader.getAllAnswers(
      (answers) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ANSWERS_LOAD,
          data: answers,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ANSWERS_ERROR_LOAD,
          data: error,
        });
      }
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
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ANSWERS_ERROR_LOAD_FOR_TYPE,
          data: error,
        });
      }
    );
  }

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.ANSWERS_CLEAR_ERROR });
  }
}
