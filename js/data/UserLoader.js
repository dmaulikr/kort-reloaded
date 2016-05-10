import createRequestUrl from '../utils/ApiUrlBuilder';

const USER_REST_PATH = '/user/';

class UserLoader {
  static getUser(secret, onSuccess) {
    const requestUrl = createRequestUrl(
      USER_REST_PATH, [secret], null); //queryParameters Array kann null sein
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
      USER_REST_PATH, [userBadgesParameter], null);
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
      USER_REST_PATH, [userLogoutParameter], null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

  static updateUser(id, onSuccess) {
    const requestUrl = createRequestUrl(
      USER_REST_PATH, [id], null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

}

module.exports = UserLoader;
