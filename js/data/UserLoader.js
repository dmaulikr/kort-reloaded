import createRequestUrl from '../utils/ApiUrlBuilder';

const GET_USER = '/user/';
const GET_USER_BADGES = '/user/<id>/badges'

class UserLoader {
  static getUser(secret, onSuccess) {
    const requestUrl = createRequestUrl(
      GET_USER, secret, null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }

  static getUserBadges(id, onSuccess) {
    let userBadgesParameter = id + '/badges';
    const requestUrl = createRequestUrl(
      GET_USER_BADGES, userBadgesParameter, null);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }
}

module.exports = UserLoader;
