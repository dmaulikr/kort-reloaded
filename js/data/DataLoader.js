import Config from '../constants/Config';
import loginStore from '../stores/LoginStore';

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
      throw new Error('User needs to be logged in for this request.',
        'js/data/DataLoader.js');
    }

    const authenticatedUser = loginStore.getUserCredential();
    const userId = authenticatedUser.userId;
    const secret = authenticatedUser.secret;
    console.log(`authenticated User: ${userId} / ${secret}`);
    const hash = new Buffer(`${userId}:${secret}`).toString('base64');
    return hash;
  }

  static _createHeaders(requestMethod) {
    const authorizationHash = DataLoader._createAuthorizationHash();

    if (requestMethod === 'GET') {
      return { Authorization: `Basic ${authorizationHash}` };
    } else if (requestMethod === 'POST' || requestMethod === 'PUT'){
      return {
        Authorization: `Basic ${authorizationHash}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }

    return null;
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
    let authorizationHeader = {};
    if (authorized === true) {
      authorizationHeader = this._createHeaders('GET');
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

  static _makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod) {
    if (requestMethod !== 'PUT' || requestMethod !== 'POST') {
      throw new Error('Request method needs to be of type \'PUT\' or \'POST\'.');
    }

    const headers = this._createHeaders(requestMethod);

    fetch(requestUrl, {
      headers,
      requestMethod,
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

  static makePostRequest(requestUrl, jsonBody, onSuccess, onError) {
    const requestMethod = 'POST';
    DataLoader._makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod);
  }

  static makePutRequest(requestUrl, jsonBody, onSuccess, onError) {
    const requestMethod = 'PUT';
    DataLoader._makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod);
  }
}
