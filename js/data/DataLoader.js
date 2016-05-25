const Buffer = require('buffer').Buffer;

const REQUEST_LOCATION = 'https://kort.herokuapp.com/server/webservices';

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
    let requestUrl = REQUEST_LOCATION;

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
        var response = responseData.return;
        if (initializer != null) {
          response = initializer(response);
        }
        onSuccess(response);
      })
      .done();
  }

  static makeAuthenticatedRequest(requestUrl, onSuccess, onError, initializer) {
    const userId = '4156';
    const secret = '680ebf81e9b139e894769b42cd57e077e35859c5';
    const hash = new Buffer(`${userId}:${secret}`).toString('base64');

    fetch(requestUrl, {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        var response = responseData.return;
        if (initializer != null) {
          response = initializer(response);
        }
        onSuccess(response);
      })
      .done();
  }
}

export default DataLoader;
