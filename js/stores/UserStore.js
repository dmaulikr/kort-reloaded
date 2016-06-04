import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class UserStore extends Store {
  constructor() {
    super();
    this._user = null;
  }

  _setUser(user) {
    this._user = user;
    super.emitChange();
  }

  _updateUser(userWithUpdateInfo) {
    if (userWithUpdateInfo.id !== this._user.id) return;

    const newUser = this._user;
    newUser.name = userWithUpdateInfo.name;
    newUser.userName = userWithUpdateInfo.userName;
    newUser.oauthUserId = userWithUpdateInfo.oauthUserId;
    newUser.secret = userWithUpdateInfo.secret;

    this._setUser(newUser);
  }

  getUser() {
    return this._user;
  }
}

const userStore = new UserStore();

userStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_LOAD:
      userStore._setUser(action.data);
      break;
    case ActionTypes.USER_UPDATE:
      userStore._updateUser(action.data);
      break;
    default:
      return;
  }
});

export default userStore;
