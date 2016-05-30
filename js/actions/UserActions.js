import ActionTypes from '../constants/ActionTypes
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

export default class UserActions {
  static getUser(id) {
    UserLoader.getUser(id, (user) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_LOAD,
        data: user,
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

  static updateUser(id) {
    UserLoader.updateUser(id, (userWithUpdateInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_UPDATE,
        data: userWithUpdateInfo,
      });
    });
  }
}
