import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

import authenticationStore from '../stores/AuthenticationStore';

export default class AuthenticationActions {

  /**
   * Verifies the user.
   * @param {string} provider The id of the user.
   * @param {string} idToken The id token of the user.
   * @returns {void}
   */
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

  /**
   * Logs out the user.
   * @returns {void}
   */
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

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.AUTHENTICATION_CLEAR_ERROR });
  }
}
