import createRequestUrl from '../utils/ApiUrlBuilder';

const GET_USER = '/user/';
const GET_USER_BADGES = '/user/';
const GET_USER_LOGOUT = '/user/';
const PUT_USER_UPDATE = '/user/';

class UserLoader {
  static getUser(secret, onSuccess) {
    const requestUrl = createRequestUrl(
      GET_USER, [secret], null); //queryParameters Array kann null sein
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

  static getUserBadges(id, onSuccess) {
    const userBadgesParameter = id + '/badges';
    const requestUrl = createRequestUrl(
      GET_USER_BADGES, [userBadgesParameter], null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

  static logoutUser(id, onSuccess) {
    const userLogoutParameter = id + '/logout';
    const requestUrl = createRequestUrl(
      GET_USER_LOGOUT, [userLogoutParameter], null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

  static updateUser(id, onSuccess) {
    const requestUrl = createRequestUrl(
      PUT_USER_UPDATE, [id], null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

}

module.exports = UserLoader;
