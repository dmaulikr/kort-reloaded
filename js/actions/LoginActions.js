import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

export default class LoginActions {
  static verifyUser(provider, idToken) {
    UserLoader.verifyUser(provider, idToken, (userCredential) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.LOGIN_VERIFY,
        data: userCredential,
      });
    });
  }

  static logOutUser(userId) {
    console.log('logout invoked');
    UserLoader.logoutUser(
      userId,
      (logoutInfo) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.LOGIN_LOGOUT,
          logoutInfo,
        });
      },
      null
    );
  }
}
