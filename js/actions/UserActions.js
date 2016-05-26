import ActionTypes from '../constants/ActionTypes';

import UserLoader from '../data/UserLoader';

import AppDispatcher from '../dispatcher/AppDispatcher';

export default class UserActions {
  static verifyUser(provider, idToken) {
    UserLoader.verifyUser(provider, idToken, (userCredential) => {
      console.log(userCredential);
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_VERIFY,
        data: userCredential,
      });
    });
  }

  static getUserBadges(id) {
    UserLoader.getUserBadges(id, (userBadges) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_BADGES,
        data: userBadges,
      });
    });
  }

  static logoutUser(id) {
    UserLoader.logoutUser(id, (logoutInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_LOGOUT,
        logoutInfo,
      });
    });
  }

  static updateUser(id) {
    UserLoader.updateUser(id, (userWithUpdateInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_UPDATE,
        data: userWithUpdateInfo,
      });
    });
  }
}
