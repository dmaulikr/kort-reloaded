import I18n from 'react-native-i18n';

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

  _clearError() {
    this._error = null;
  }

  getStatistics() {
    return this._statistics;
  }

  getError() {
    return this._error;
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
    case ActionTypes.STATISTICS_CLEAR_ERROR:
      statisticsStore._clearError();
      break;
    default:
      return;
  }
});

export default statisticsStore;
