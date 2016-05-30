import Config from '../constants/Config';

const Buffer = require('buffer').Buffer;

const requestLocation = `${Config.SERVER}${Config.API_PATH}`;

export default class DataLoader {
  static _getQueryParametersString(queryParameters) {
    let queryParametersString;
    queryParametersString = queryParameters[0];
    for (let i = 1; i < queryParameters.length; i++) {
      queryParametersString += `,${queryParameters[i]}`;
    }
    return queryParametersString;
  }

  static _getParametersString(parameters) {
    let parametersString;
    parametersString = `?${parameters[0]}`;
    for (let i = 1; i < parameters.length; i++) {
      parametersString += `&${parameters[i]}`;
    }
    return parametersString;
  }

  static _createAuthorizationHash() {
    const userLoggedIn = true;
    if (!userLoggedIn) {
      return null;
    }

    const userId = Config.TEST_USER_ID;
    const secret = Config.TEST_SECRET;
    const hash = new Buffer(`${userId}:${secret}`).toString('base64');
    return hash;
  }

  static createRequestUrl(apiUrl, queryParameters, parameters) {
    let requestUrl = requestLocation;

    if (!apiUrl.startsWith('/')) requestUrl += '/';
    requestUrl = requestUrl + apiUrl;

    if (!requestUrl.endsWith('/')) requestUrl += '/';

    if (queryParameters !== null && queryParameters.length !== 0 && queryParameters[0] !== null) {
      requestUrl += DataLoader._getQueryParametersString(queryParameters);
    }

    if (parameters !== null && parameters.length !== 0 && parameters[0] !== null) {
      requestUrl += DataLoader._getParametersString(parameters);
    }

    return requestUrl;
  }

  static makeGetRequest(requestUrl, authorized, onSuccess, onError) {
    let authorizationHeader;
    if (authorized) {
      const authorizationHash = DataLoader._createAuthorizationHash();
      if (authorizationHash === null) {
        const error = new Error('User needs to be logged in for this request.',
          'js/data/DataLoader.js');
        if (onError != null) {
          onError(error);
        } else {
          console.log(error);
        }
        return;
      }

      authorizationHeader = { Authorization: `Basic ${authorizationHash}` };
    } else {
      authorizationHeader = {};
    }

    fetch(requestUrl, { headers: authorizationHeader })
      .then((response) => response.json())
      .then((responseData) => responseData)
      .then((data) => onSuccess(data))
      .catch((error) => {
        if (onError != null) {
          onError(error);
        } else {
          console.log(error);
        }
      })
      .done();
  }

  static makePostRequest(requestUrl, jsonBody, onSuccess, onError) {
    const authorizationHash = DataLoader._createAuthorizationHash();
    if (authorizationHash === null) {
      const error = new Error('User needs to be logged in for this request.',
        'js/data/DataLoader.js');
      if (onError != null) {
        onError(error);
      } else {
        console.log(error);
      }
      return;
    }

    const headers = {
      Accept: 'application/json',
      Authorization: `Basic ${authorizationHash}`,
      'Content-Type': 'application/json',
    };

    fetch(requestUrl, {
      headers,
      method: 'POST',
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((responseData) => responseData)
      .then((data) => onSuccess(data))
      .catch((error) => {
        if (onError != null) {
          onError(error);
        } else {
          console.log(error);
        }
      })
      .done();
  }
}
