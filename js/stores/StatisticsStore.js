import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class StatisticsStore extends Store {
  constructor() {
    super();
    this._statistics = null;
    this._error = null;
  }

  _setStatistics(statistics) {
    this._statistics = statistics;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  getStatistics() {
    return this._statistics;
  }

  getError() {
    const error = this._error;
    this._error = null;
    return error;
  }
}

const statisticsStore = new StatisticsStore();

statisticsStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.STATISTICS_LOAD:
      statisticsStore._setStatistics(action.data);
      break;
    case ActionTypes.STATISTICS_ERROR_LOAD:
      statisticsStore._raiseError();
      break;
    default:
      return;
  }
});

export default statisticsStore;
