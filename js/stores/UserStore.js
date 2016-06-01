import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class UserStore extends Store {
  constructor() {
    super();
    this._user = null;
    this._userBadges = null;
    this.dispatchToken = AppDispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.USER_LOAD:
          this._setUser(action.data);
          break;
        case ActionTypes.USER_BADGES:
          this._setUserBadges(action.data);
          break;
        case ActionTypes.USER_UPDATE:
          this._updateUser(action.data);
          break;
        default:
          return;
      }
    });
  }

  _setUser(user) {
    this._user = user;
    super.emitChange();
  }

  _setUserBadges(userBadges) {
    this._userBadges = userBadges;
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

  getUserBadges() {
    return this._userBadges;
  }
}

const userStore = new UserStore();

userStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_LOAD:
      userStore._setUser(action.data);
      break;
    case ActionTypes.USER_BADGES:
      userStore._setUserBadges(action.data);
      break;
    case ActionTypes.USER_UPDATE:
      userStore._updateUser(action.data);
      break;
    default:
      return;
  }
});

export default userStore;
