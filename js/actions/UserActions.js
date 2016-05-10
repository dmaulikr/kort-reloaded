import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class UserActions {
  static getUser(secret) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_DATA,
      secret,
    });
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

  static updateUser(id) { //Parameter für Änderungen
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_UPDATE,
      id,
    });
  }
}
