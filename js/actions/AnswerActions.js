import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AnswerLoader from '../data/AnswerLoader';
import Config from '../constants/Config';

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
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_GET_ALL_ANSWERS,
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
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_GET_ANSWERS_FOR_TYPE,
        });
      }
    );
  }
}
