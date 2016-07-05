import Config from '../constants/Config';

import DataLoader from './DataLoader';

import User from '../dto/User';
import UserBadge from '../dto/UserBadge';
import UserCredential from '../dto/UserCredential';

const userRestPath = Config.USER_PATH;
const verifyUserRestPath = Config.USER_VERIFY_PATH;

export default class UserLoader extends DataLoader {
  static _initUserCredential(rawUserCredential) {
    return new UserCredential(rawUserCredential.user_id, rawUserCredential.secret);
  }

  static _initUser(rawUser) {
    const rawUserObject = rawUser.return;
    return new User(rawUserObject.id, rawUserObject.name, rawUserObject.username,
      rawUserObject.oauth_user_id, rawUserObject.oauth_provider, rawUserObject.token,
      rawUserObject.fix_count, rawUserObject.vote_count, rawUserObject.koin_count,
      rawUserObject.ranking, rawUserObject.secret, rawUserObject.pic_url, rawUserObject.logged_in
    );
  }

  static _initUserBadges(rawUserBadges) {
    const userBadges = [];
    rawUserBadges.return.forEach((rawBadge) => {
      userBadges.push(
        new UserBadge(rawBadge.id, rawBadge.name, rawBadge.title, rawBadge.description,
          rawBadge.color, rawBadge.sorting, rawBadge.won, rawBadge.create_date
        )
      );
    });

    return userBadges;
  }

  static _initUserWithUpdateInfo(rawUserUpdateInfo) {
    return new User(rawUserUpdateInfo.user_id, rawUserUpdateInfo.name, rawUserUpdateInfo.username,
      rawUserUpdateInfo.oauth_user_id, null, null, null, null, null, null, rawUserUpdateInfo.secret,
      null, null
    );
  }

  static _initJsonUser(user) {
    return JSON.stringify({
      logged_in: user.loggedIn,
      id: user.id,
      username: user.userName,
      oauth_user_id: user.oauthUserId,
      oauth_provider: user.oauthProvider,
      pic_url: user.picUrl,
      name: user.name,
      token: user.token,
      fix_count: user.missionCount,
      vote_count: user.validationCount,
      koin_count: user.koinCount,
      secret: user.secret,
    });
  }

  static verifyUser(provider, idToken, onSuccess, onError) {
    const idTokenParameter = `id_token=${idToken}`;
    const requestUrl = super.createRequestUrl(
      verifyUserRestPath, [provider], [idTokenParameter]);
    super.makeGetRequest(
      requestUrl,
      false,
      (rawUserCredential) => onSuccess(UserLoader._initUserCredential(rawUserCredential)),
      onError
    );
  }

  static getUser(userSecret, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [userSecret], null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawUser) => onSuccess(UserLoader._initUser(rawUser)),
      onError
    );
  }

  static getUserBadges(id, onSuccess, onError) {
    const userBadgesParameter = `${id}/badges`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userBadgesParameter], null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawUserBadges) => onSuccess(UserLoader._initUserBadges(rawUserBadges)),
      onError
    );
  }

  static logoutUser(userId, onSuccess, onError) {
    const userLogoutParameter = `${userId}/logout`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userLogoutParameter], null);
    const authorizationHeader = super._createHeaders('GET');

    fetch(requestUrl, { headers: authorizationHeader })
      .then((response) => response)
      .then((responseData) => responseData)
      .then((data) => onSuccess(data))
      .catch((error) => {
        if (onError !== null) onError(error);
      })
      .done();
  }

  static updateUser(user, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [user.id], null);
    super.makePutRequest(
      requestUrl,
      UserLoader._initJsonUser(user),
      (rawUserUpdateInfo) => onSuccess(UserLoader._initUserWithUpdateInfo(rawUserUpdateInfo)),
      onError
    );
  }
}
