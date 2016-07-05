import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import StatisticsLoader from '../data/StatisticsLoader';

export default class StatisticsActions {
  static loadStatistics() {
    StatisticsLoader.getStatistics(
      (statistics) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.STATISTICS_LOAD,
          data: statistics,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.STATISTICS_ERROR_LOAD,
          data: error,
        });
      }
    );
  }

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.STATISTICS_CLEAR_ERROR });
  }
}
