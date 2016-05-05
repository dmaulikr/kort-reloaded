import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';
import Store from './Store';

let _userInfo = [];

class UserStore extends Store {

  getUserInfo() {
    return _userInfo;
  }
}

const userStore = new UserStore();

function init(rawUser) {
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

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_DATA:
      UserLoader.getUser(
        action.secret, initUser);
      break;

    default:
      return;
  }
});

export default userStore;
