import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

export default class UserActions {
  static getUser(userSecret) {
    UserLoader.getUser(userSecret, (user) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_LOAD,
        data: user,
      });
    });
  }

  static getUserBadges(userId) {
    UserLoader.getUserBadges(id, (userBadges) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_BADGES,
        data: userBadges,
      });
    });
  }

  static updateUser(user) {
    UserLoader.updateUser(id, (userWithUpdateInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_UPDATE,
        data: userWithUpdateInfo,
      });
    });
  }
}
