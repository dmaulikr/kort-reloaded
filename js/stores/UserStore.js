import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';
import Store from './Store';

let _userInfo = [];
let _userBadges = [];
let _userLogoutMessage = '';

class UserStore extends Store {

  getUserInfo() {
    return _userInfo;
  }

  getUserBadges() {
    return _userBadges;
  }

  logoutUser() {
    return _userLogoutMessage;
  }
}

const userStore = new UserStore();

function getRawUser(rawUser) {
  _userInfo = [];
  _userInfo.push({
    id: rawUser.id,
    name: rawUser.name,
    username: rawUser.username,
    oauth_user_id: rawUser.oauth_user_id,
    oauth_provider: rawUser.oauth_provider,
    token: rawUser.token,
    fix_count: rawUser.fix_count,
    vote_count: rawUser.vote_count,
    koin_count: rawUser.koin_count,
    secret: rawUser.secret,
    pic_url: rawUser.pic_url,
    logged_in: rawUser.logged_in,
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

    default:
      return;
  }
});

export default userStore;
