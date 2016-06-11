import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

import authenticationStore from './AuthenticationStore';

class UserStore extends Store {
  constructor() {
    super();
    this._users = null;
  }

  _setUser(user) {
    if (this._users === null) this._users = new Map();
    this._users.set(user.id, user);
    super.emitChange();
  }

  _updateOwnUser(userWithUpdateInfo) {
    if (this._users === null) return;

    const user = this._users.get(userWithUpdateInfo.id);
    if (user == null) return;

    const updatedUser = user;
    updatedUser.name = userWithUpdateInfo.name;
    updatedUser.userName = userWithUpdateInfo.userName;
    updatedUser.oauthUserId = userWithUpdateInfo.oauthUserId;
    updatedUser.secret = userWithUpdateInfo.secret;

    this._setUser(updatedUser);
  }

  getUser(userId) {
    if (this._users === null) return null;

    return this._users.get(userId);
  }

  getOwnUser() {
    if (this._users === null) return null;

    return this._users.get(authenticationStore.getUserId());
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
    default:
      return;
  }
});

export default userStore;
