import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import Store from './Store';

class ErrorStore extends Store {
  constructor() {
    super();
    this._lastError = null;
    this._errorType = null;
    this._title = null;
    this._message = null;
  }

  _setDescriptionFor(type) {
    switch (type) {
      case Config.ERROR_POST_TASK:
        this._title = I18n.t('fix_alert_submit_failure_title');
        this._message = I18n.t('fix_alert_submit_failure_message');
        break;
      default:
        this._title = I18n.t('error_title_default');
        this._message = I18n.t('error_message_default');
    }
  }

  _setError(error, type) {
    this._lastError = error;
    this._errorType = type;
    this._setDescriptionFor(type);
    super.emitChange();
  }

  _clearError() {
    this._lastError = null;
    this._errorType = null;
    this.errorTitle = null;
    this._message = null;
  }

  getError() {
    return this._lastError;
  }

  getErrorType() {
    return this._errorType;
  }

  getTitle() {
    return this._title;
  }

  getMessage() {
    return this._message;
  }
}

const errorStore = new ErrorStore();

errorStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.ERROR_RAISE:
      errorStore._setError(action.data, action.type);
      break;
    case ActionTypes.ERROR_CLEAR:
      errorStore._clearError();
      break;
    default:
      return;
  }
});

export default errorStore;
