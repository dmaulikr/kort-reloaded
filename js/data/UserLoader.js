import createRequestUrl from '../utils/ApiUrlBuilder';

const VERIFY_USER_REST_PATH = '/user/verify/';
const USER_REST_PATH = '/user/';

class UserLoader {
  static setUser(provider, id_token, onSuccess) {
    const requestUrl = createRequestUrl(
      VERIFY_USER_REST_PATH, [provider], id_token); // id_token Format: "id_token=xxxxx"
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
