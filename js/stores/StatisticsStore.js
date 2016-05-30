import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class StatisticsStore extends Store {
  constructor() {
    super();
    this._statistics = null;
  }

  getStatistics() {
    return this._statistics;
  }

  _updateStatistics(statistics) {
    this._statistics = statistics;
  }
}

const statisticsStore = new StatisticsStore();

statisticsStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.STATISTICS_LOAD:
      statisticsStore._updateStatistics(action.data);
      break;
    default:
      return;
  }
});

export default statisticsStore;
