const REQUEST_LOCATION = 'https://kort.herokuapp.com/server/webservices';

function getQueryParametersString(queryParameters) {
  let queryParametersString;
  queryParametersString = queryParameters[0];
  for (let i = 1; i < queryParameters.length; i++) {
    queryParametersString += `,${queryParameters[i]}`;
  }
  return queryParametersString;
}

function getParametersString(parameters) {
  let parametersString;
  parametersString = `?${parameters[0]}`;
  for (let i = 1; i < parameters.length; i++) {
    parametersString += `&${parameters[i]}`;
  }
  return parametersString;
}

export default function createRequestUrl(apiUrl, queryParameters, parameters) {
  let requestUrl = REQUEST_LOCATION;
  if (!apiUrl.startsWith('/')) requestUrl += '/';
  requestUrl = requestUrl + apiUrl;
  if (!requestUrl.endsWith('/')) requestUrl += '/';
  if (queryParameters !== null && queryParameters.length !== 0) {
    requestUrl += getQueryParametersString(queryParameters);
  }
  if (parameters !== null && parameters.length !== 0) {
    requestUrl += getParametersString(parameters);
  }
  return requestUrl;
}
