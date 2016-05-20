import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';
import Store from './Store';

let _userInfo = [];
let _userBadges = [];
let _userLogoutMessage = '';
let _userUpdateInfo = [];

class UserStore extends Store {

  setUserInfo() {
    return _userInfo;
  }

  getUserBadges() {
    return _userBadges;
  }

  logoutUser() {
    return _userLogoutMessage;
  }

  updateUser() {
    return _userUpdateInfo;
  }
}

const userStore = new UserStore();

function getRawUser(rawUser) {
  _userInfo = [];
  _userInfo.push({
    id: rawUser.user_id,
    secret: rawUser.secret,
  });

  userStore.emitChange();
}

function getRawUserBadges(rawUserBadges) {
  _userBadges = [];
  rawUserBadges.forEach((badge) => {
    _userBadges.push({
      id: badge.id,
      name: badge.name,
      title: badge.title,
      description: badge.description,
      color: badge.color,
      sorting: badge.sorting,
      won: badge.won,
      create_date: badge.create_date,
    });
  }, this);

  userStore.emitChange();
}

function getRawUserLogoutMessage(rawUserLogoutMessage) {
  _userLogoutMessage = rawUserLogoutMessage;

  userStore.emitChange();
}

function getRawUserUpdateInfo(rawUserUpdateInfo) {
  _userUpdateInfo = [];
  _userUpdateInfo.push({
    user_id: rawUserUpdateInfo.user_id,
    name: rawUserUpdateInfo.name,
    username: rawUserUpdateInfo.username,
    oauth_user_id: rawUserUpdateInfo.oauth_user_id,
    secret: rawUserUpdateInfo.secret,
  });

  userStore.emitChange();
}

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
