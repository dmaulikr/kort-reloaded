
  export default function createRequestUrl(requestUrl, queryParameters, parameters) {
    var requestUrl = requestUrl;
    if (!requestUrl.endsWith('/')) requestUrl += '/';
    requestUrl += getQueryParametersString(queryParameters);
    if (parameters !== null && parameters.length !== 0) {
      requestUrl += getParametersString(parameters);
    }
    return requestUrl;
  }

  function getQueryParametersString(queryParameters) {
    var queryParametersString;
    queryParametersString = queryParameters[0];
    for (var i = 1; i < queryParameters.length; i++) {
      queryParametersString += `,${queryParameters[i]}`;
    }
    return queryParametersString;
  }

  function getParametersString(parameters) {
    var parametersString;
    parametersString = `?parameters[0]`;
    for (var i = 1; i < parameters.length; i++) {
      parametersString += `&${parameters[i]}`;
    }
    return parametersString;
  }
