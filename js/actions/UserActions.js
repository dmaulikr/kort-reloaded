import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

export default class UserActions {
  static setUser(id_token, provider) {

  }

  static getUserBadges(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_BADGES,
      id,
    });
  }

  static logoutUser(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_LOGOUT,
      id,
    });
  }

  static updateUser(id) { // Parameter für Änderungen
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_UPDATE,
      id,
    });
  }
}
