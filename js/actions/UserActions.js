import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class UserActions {
  static getUser(secret) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_DATA,
      secret,
    });
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_BADGES,
      id,
    });
  }
}
