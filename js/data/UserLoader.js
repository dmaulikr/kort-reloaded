import DataLoader from './DataLoader';

import User from '../dto/User';
import UserBadge from '../dto/UserBadge';
import UserCredential from '../dto/UserCredential';

const VERIFY_USER_REST_PATH = '/user/verify/';
const USER_REST_PATH = '/user/';

function _initUserCredential(rawUserCredential) {
  return new UserCredential(rawUserCredential.id, rawUserCredential.secret);
}

function _initUser(rawUser) {
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

function _initUserWithUpdateInfo(rawUserUpdateInfo) {
  return new User(
    rawUserUpdateInfo.user_id,
    rawUserUpdateInfo.name,
    rawUserUpdateInfo.username,
    rawUserUpdateInfo.oauth_user_id,
    rawUserUpdateInfo.secret
  );
}

function _initUserBadges(rawUserBadges) {
  const _userBadges = [];
  rawUserBadges.forEach((badge) => {
    _userBadges.push(new UserBadge(
      badge.id,
      badge.name,
      badge.title,
      badge.description,
      badge.color,
      badge.sorting,
      badge.won,
      badge.create_date
    ));
  }, this);

  return _userBadges;
}

export default class UserLoader extends DataLoader {
  static verifyUser(provider, idToken, onSuccess) {
    const idTokenParameter = `id_token=${idToken}`;
    const requestUrl = super.createRequestUrl(
      VERIFY_USER_REST_PATH, [provider], [idTokenParameter]);
    super.makeRequest(requestUrl, onSuccess, null, _initUserCredential);
  }

  static getUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      USER_REST_PATH, [id], null);
    super.makeRequest(requestUrl, onSuccess, null, _initUser);
  }

  static getUserBadges(id, onSuccess) {
    const userBadgesParameter = `${id}/badges`;
    const requestUrl = super.createRequestUrl(
      USER_REST_PATH, [userBadgesParameter], null);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, _initUserBadges);
  }

  static logoutUser(id, onSuccess) {
    const userLogoutParameter = `${id}/logout`;
    const requestUrl = super.createRequestUrl(
      USER_REST_PATH, [userLogoutParameter], null);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, null);
  }

  static updateUser(id, onSuccess) {
    const requestUrl = super.createRequestUrl(
      USER_REST_PATH, [id], null);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, _initUserWithUpdateInfo);
  }
}
