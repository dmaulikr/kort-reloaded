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
    case ActionTypes.USER_VERIFY:

      break;
    case ActionTypes.USER_LOAD:

      break;
    case ActionTypes.USER_BADGES:

      break;
    case ActionTypes.USER_LOGOUT:

      break;
    case ActionTypes.USER_UPDATE:

      break;
    default:
      return;
  }
});

export default userStore;
