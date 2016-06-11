import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserLoader from '../data/UserLoader';

import authenticationStore from '../stores/AuthenticationStore';

export default class UserActions {
  static _onUserDataLoaded(userWithoutBadges, userBadges) {
    const user = userWithoutBadges;
    user.badges = userBadges;

    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_LOAD,
      data: user,
    });
  }

  static loadUser(userId, userSecret) {
    let userWithoutBadges;
    let userBadges;
    let userLoaded = false;
    let badgesLoaded = false;

    UserLoader.getUser(userSecret, (user) => {
      if (badgesLoaded) {
        UserActions._onUserDataLoaded(user, userBadges);
      } else {
        userWithoutBadges = user;
      }
      userLoaded = true;
    });

    UserLoader.getUserBadges(userId, (badges) => {
      if (userLoaded) {
        UserActions._onUserDataLoaded(userWithoutBadges, badges);
      } else {
        userBadges = badges;
      }
      badgesLoaded = true;
    });
  }

  static loadOwnUser() {
    const userCredential = authenticationStore.getUserCredential();
    UserActions.loadUser(userCredential.userId, userCredential.secret);
  }

  static updateUser(user) {
    UserLoader.updateUser(user.id, (userWithUpdateInfo) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.USER_UPDATE,
        data: userWithUpdateInfo,
      });
    });
  }
}
