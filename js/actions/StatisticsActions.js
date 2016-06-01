import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AnswerLoader from '../data/AnswerLoader';

export default class StatisticsActions {
  static loadStatistics() {
    AnswerLoader.getStatistics(
      (statistics) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.STATISTICS_LOAD,
          data: statistics,
        });
      },
      null
    );
  }
}
