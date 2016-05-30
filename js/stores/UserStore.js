import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class UserStore extends Store {
  constructor() {
    super();
    this._user = null;
    this._userBadges = null;
  }

  getUserBadges() {
    return this._userBadges;
  }
}

const userStore = new UserStore();

userStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_LOAD:

      break;
    case ActionTypes.USER_BADGES:

      break;
    case ActionTypes.USER_UPDATE:

      break;
    default:
      return;
  }
});

export default userStore;
