import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

import authenticationStore from '../stores/AuthenticationStore';

export default class UserActions {
  static loadUser(userId, userSecret) {
    UserLoader.getUser(
      userSecret,
      (user) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.USER_LOAD,
          data: user,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.USER_ERROR_LOAD,
          data: error,
        });
      }
    );
  }

  static loadOwnUser() {
    const userCredential = authenticationStore.getUserCredential();
    UserActions.loadUser(userCredential.userId, userCredential.secret);
  }

  static updateUser(user) {
    UserLoader.updateUser(
      user.id,
      (userWithUpdateInfo) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.USER_UPDATE,
          data: userWithUpdateInfo,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.USER_ERROR_UPDATE,
          data: error,
        });
      }
    );
  }

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.USER_CLEAR_ERROR });
  }
}
