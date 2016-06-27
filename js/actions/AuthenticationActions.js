import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import UserLoader from '../data/UserLoader';

import authenticationStore from '../stores/AuthenticationStore';

export default class AuthenticationActions {
  static verifyUser(provider, idToken) {
    UserLoader.verifyUser(
      provider,
      idToken,
      (userCredential) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTHENTICATION_VERIFY,
          data: userCredential,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTHENTICATION_ERROR_VERIFY,
          data: error,
        });
      }
    );
  }

  static loadCredential() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUTHENTICATION_LOAD_CREDENTIAL,
    });
  }

  static logOutUser() {
    UserLoader.logoutUser(
      authenticationStore.getUserId(),
      (logoutInfo) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTHENTICATION_LOGOUT,
          logoutInfo,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.AUTHENTICATION_ERROR_LOGOUT,
          data: error,
        });
      }
    );
  }
}
