import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class LoginStore extends Store {
  constructor() {
    super();
    this._userCredential = null;
    this._loggedIn = false;
  }

  getUserCredential() {
    return this._userCredential;
  }

  isLoggedIn() {
    return this._loggedIn;
  }
}

const loginStore = new LoginStore();

loginStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.USER_VERIFY:

      break;
    case ActionTypes.USER_LOGOUT:

      break;
    default:
      return;
  }
});

export default loginStore;
