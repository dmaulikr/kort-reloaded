import createRequestUrl from '../utils/ApiUrlBuilder';

const GET_USER = '/user/';

class UserLoader {
  static getUser(secret, onSuccess) {
    const parameters = [];
    if (secret !== null) parameters.push(`${secret}`);
    const requestUrl = createRequestUrl(
      GET_USER, parameters);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }
}

module.exports = UserLoader;
