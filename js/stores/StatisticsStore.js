import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import StatisticsActions from '../actions/StatisticsActions';
import Store from './Store';

class StatisticsStore extends Store {
  constructor() {
    super();
    this._statistics = null;
  }

  _setStatistics(statistics) {
    this._statistics = statistics;
    super.emitChange();
  }

  _initializeStatistics() {
    StatisticsActions.loadStatistics();
  }

  getStatistics() {
    return this._statistics;
  }
}

const statisticsStore = new StatisticsStore();

statisticsStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.STATISTICS_LOAD:
      statisticsStore._setStatistics(action.data);
      break;
    default:
      return;
  }
});

export default statisticsStore;
