import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

import authenticationStore from './AuthenticationStore';

class UserStore extends Store {
  constructor() {
    super();
    this._users = null;
    this._error = null;
  }

  _setUser(user) {
    if (this._users === null) this._users = new Map();
    this._users.set(user.id, user);
    super.emitChange();
  }

  /**
   * Updates the user.
   * @param {Object} userWithUpdateInfo The updated user Object.
   * @returns {void}
   */
  _updateOwnUser(userWithUpdateInfo) {
    if (this._users === null) return;

    const user = this._users.get(userWithUpdateInfo.id);
    if (user === undefined) return;

    const updatedUser = user;
    updatedUser.name = userWithUpdateInfo.name;
    updatedUser.userName = userWithUpdateInfo.userName;
    updatedUser.oauthUserId = userWithUpdateInfo.oauthUserId;
    updatedUser.secret = userWithUpdateInfo.secret;

    this._setUser(updatedUser);
  }

  _raiseDefaultError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  _raiseUpdateError() {
    this._error = new Error(I18n.t('firststeps_alert_submit_failure_title'),
      I18n.t('firststeps_alert_submit_failure_message'));
    super.emitChange();
  }

  _clearError() {
    this._error = null;
  }

  getUser(userId) {
    if (this._users === null) return null;

    const users = this._users.get(userId);
    if (users === undefined) return null;

    return this._users.get(userId);
  }

  getOwnUser() {
    const ownUserId = authenticationStore.getUserId();
    return this.getUser(ownUserId);
  }

  getError() {
    return this._error;
  }
}

const userStore = new UserStore();

userStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_LOAD:
      userStore._setUser(action.data);
      break;
    case ActionTypes.USER_UPDATE:
      userStore._updateOwnUser(action.data);
      break;
    case ActionTypes.USER_ERROR_LOAD:
      userStore._raiseDefaultError();
      break;
    case ActionTypes.USER_ERROR_UPDATE:
      userStore._raiseUpdateError();
      break;
    case ActionTypes.USER_CLEAR_ERROR:
      userStore._clearError();
      break;
    default:
      return;
  }
});

export default userStore;
