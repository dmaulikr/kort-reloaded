import createRequestUrl from '../utils/ApiUrlBuilder';

const MISSIONS_REST_PATH = '/mission/position';

class MissionLoader {
  static getMissions(latitude, longitude, limit, radius, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = createRequestUrl(
      MISSIONS_REST_PATH, [latitude, longitude], parameters);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }
}

module.exports = MissionLoader;
