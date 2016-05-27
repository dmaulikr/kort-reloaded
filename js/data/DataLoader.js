import Config from '../constants/Config';

const Buffer = require('buffer').Buffer;

const requestLocation = `${Config.SERVER}${Config.API_PATH}`;

function _getQueryParametersString(queryParameters) {
  let queryParametersString;
  queryParametersString = queryParameters[0];
  for (let i = 1; i < queryParameters.length; i++) {
    queryParametersString += `,${queryParameters[i]}`;
  }
  return queryParametersString;
}

function _getParametersString(parameters) {
  let parametersString;
  parametersString = `?${parameters[0]}`;
  for (let i = 1; i < parameters.length; i++) {
    parametersString += `&${parameters[i]}`;
  }
  return parametersString;
}

class DataLoader {
  static createRequestUrl(apiUrl, queryParameters, parameters) {
    let requestUrl = requestLocation;

    if (!apiUrl.startsWith('/')) requestUrl += '/';
    requestUrl = requestUrl + apiUrl;

    if (!requestUrl.endsWith('/')) requestUrl += '/';

    if (queryParameters !== null && queryParameters.length !== 0 && queryParameters[0] !== null) {
      requestUrl += _getQueryParametersString(queryParameters);
    }

    if (parameters !== null && parameters.length !== 0 && parameters[0] !== null) {
      requestUrl += _getParametersString(parameters);
    }

    return requestUrl;
  }

  static makeRequest(requestUrl, onSuccess, onError, initializer) {
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        let response = responseData.return;
        if (initializer != null) {
          response = initializer(response);
        }
        onSuccess(response);
      })
      .done();
  }

  static makeAuthenticatedRequest(requestUrl, onSuccess, onError, initializer) {
    const userId = Config.TEST_USER_ID;
    const secret = Config.TEST_SECRET;
    const hash = new Buffer(`${userId}:${secret}`).toString('base64');

    fetch(requestUrl, { headers: { Authorization: `Basic ${hash}` } })
      .then((response) => response.json())
      .then((responseData) => {
        let response = responseData.return;
        if (initializer != null) {
          response = initializer(response);
        }
        onSuccess(response);
      })
      .done();
  }
}

export default DataLoader;
