import Config from '../constants/Config';

import DataLoader from './DataLoader';

import User from '../dto/User';
import UserBadge from '../dto/UserBadge';
import UserCredential from '../dto/UserCredential';

const userRestPath = Config.USER_PATH;
const verifyUserRestPath = Config.USER_VERIFY_PATH;

export default class UserLoader extends DataLoader {
  static _initUserCredential(rawUserCredential) {
    return new UserCredential(rawUserCredential.id, rawUserCredential.secret);
  }

  static _initUser(rawUser) {
    const rawUserObject = rawUser.return;
    return new User(rawUserObject.id, rawUserObject.name, rawUserObject.user_name,
      rawUserObject.oauth_user_id, rawUserObject.oauth_provider, rawUserObject.token,
      rawUserObject.fix_count, rawUserObject.vote_count, rawUserObject.koin_count,
      rawUserObject.secret, rawUserObject.pic_url, rawUserObject.logged_in
    );
  }

  static _initUserWithUpdateInfo(rawUserUpdateInfo) {
    return new User(rawUserUpdateInfo.user_id, rawUserUpdateInfo.name, rawUserUpdateInfo.username,
      rawUserUpdateInfo.oauth_user_id, rawUserUpdateInfo.secret
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
    }, this);

    return userBadges;
  }

  static verifyUser(provider, idToken, onSuccess) {
    const idTokenParameter = `id_token=${idToken}`;
    const requestUrl = super.createRequestUrl(
      verifyUserRestPath, [provider], [idTokenParameter]);
    super.makeGetRequest(
      requestUrl,
      false,
      (rawUserCredential) => onSuccess(UserLoader._initUserCredential(rawUserCredential)),
      null
    );
  }

  static getUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [id], null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawUser) => onSuccess(UserLoader._initAnswers(rawUser)),
      null
    );
  }

  static getUserBadges(id, onSuccess) {
    const userBadgesParameter = `${id}/badges`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userBadgesParameter], null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawUserBadges) => onSuccess(UserLoader._initAnswers(rawUserBadges)),
      null
    );
  }

  static logoutUser(id, onSuccess) {
    const userLogoutParameter = `${id}/logout`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userLogoutParameter], null);
    super.makeGetRequest(requestUrl, true, onSuccess, null, null);
  }

  static updateUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [id], null);
    super.makePutRequest(
      requestUrl,
      true,
      (rawUserUpdateInfo) => onSuccess(UserLoader._initAnswers(rawUserUpdateInfo)),
      null
    );
  }
}
