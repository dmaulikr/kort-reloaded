import ActionTypes from '../constants/ActionTypes
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

export default class LoginActions {
  static verifyUser(provider, idToken) {
    UserLoader.verifyUser(provider, idToken, (userCredential) => {
      console.log(userCredential);
      AppDispatcher.dispatch({
        actionType: ActionTypes.LOGIN_VERIFY,
        data: userCredential,
      });
    });
  }

  static logoutUser(id) {
    UserLoader.logoutUser(id, (logoutInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.LOGIN_LOGOUT,
        logoutInfo,
      });
    });
  }
}
