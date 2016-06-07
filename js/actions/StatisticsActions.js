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
      null
    );
  }
}
