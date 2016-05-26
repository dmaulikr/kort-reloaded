import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';
import Store from './Store';

let _user;
let _userBadges = [];
let _userLoggedIn;

class UserStore extends Store {
  getUserBadges() {
    return _userBadges;
  }
}

const userStore = new UserStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_DATA:
      UserLoader.getUser(
        action.secret, getRawUser);
      break;
    case ActionTypes.USER_BADGES:
      UserLoader.getUserBadges(
        action.id, getRawUserBadges);
      break;
    case ActionTypes.USER_LOGOUT:
      UserLoader.logoutUser(
        action.id, getRawUserLogoutMessage);
      break;
    case ActionTypes.USER_UPDATE:
      UserLoader.updateUser(
        action.id, getRawUserUpdateInfo);
      break;

    default:
      return;
  }
});

export default userStore;
