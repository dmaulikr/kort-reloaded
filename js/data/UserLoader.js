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
    return new User(
      rawUser.id,
      rawUser.name,
      rawUser.user_name,
      rawUser.oauth_user_id,
      rawUser.oauth_provider,
      rawUser.token,
      rawUser.fix_count,
      rawUser.vote_count,
      rawUser.koin_count,
      rawUser.secret,
      rawUser.pic_url,
      rawUser.logged_in);
  }

  static _initUserWithUpdateInfo(rawUserUpdateInfo) {
    return new User(
      rawUserUpdateInfo.user_id,
      rawUserUpdateInfo.name,
      rawUserUpdateInfo.username,
      rawUserUpdateInfo.oauth_user_id,
      rawUserUpdateInfo.secret
    );
  }

  static _initUserBadges(rawUserBadges) {
    const userBadges = [];
    rawUserBadges.forEach((rawBadge) => {
      userBadges.push(new UserBadge(
        rawBadge.id,
        rawBadge.name,
        rawBadge.title,
        rawBadge.description,
        rawBadge.color,
        rawBadge.sorting,
        rawBadge.won,
        rawBadge.create_date
      ));
    }, this);

    return userBadges;
  }

  static verifyUser(provider, idToken, onSuccess) {
    const idTokenParameter = `id_token=${idToken}`;
    const requestUrl = super.createRequestUrl(
      verifyUserRestPath, [provider], [idTokenParameter]);
    super.makeGetRequest(requestUrl, onSuccess, null, UserLoader._initUserCredential);
  }

  static getUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [id], null);
    super.makeGetRequest(requestUrl, onSuccess, null, UserLoader._initUser);
  }

  static getUserBadges(id, onSuccess) {
    const userBadgesParameter = `${id}/badges`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userBadgesParameter], null);
    super.makeGetRequest(requestUrl, onSuccess, null, UserLoader._initUserBadges);
  }

  static logoutUser(id, onSuccess) {
    const userLogoutParameter = `${id}/logout`;
    const requestUrl = super.createRequestUrl(
      userRestPath, [userLogoutParameter], null);
    super.makeGetRequest(requestUrl, onSuccess, null, null);
  }

  static updateUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      userRestPath, [id], null);
    super.makePutRequest(requestUrl, onSuccess, null, UserLoader._initUserWithUpdateInfo);
  }
}
