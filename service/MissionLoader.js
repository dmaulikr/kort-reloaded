import createRequestUrl from '../util/ApiUrlBuilder';
import Mission from '../model/Mission';

const GET_MISSIONS_REQUEST_URL = 'https://kort.herokuapp.com/server/webservices/mission/position';

export default class {
  static getMissions(latitude, longitude, limit, radius, onSuccess) {
    var parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = createRequestUrl(GET_MISSIONS_REQUEST_URL, [latitude, longitude], parameters);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(this.castReturnArrayToMissionsArray(responseData.return));
      })
      .done();
  }

  static castReturnArrayToMissionsArray(requestArray) {
    const missionsArray = new Array(requestArray.length);
    for(var i = 0; i < requestArray.length; i++) {
      missionsArray[i] = new Mission(requestArray[i].id, requestArray[i].title,
        requestArray[i].type, requestArray[i].description, requestArray[i].latitude,
        requestArray[i].longitude, requestArray[i].fix_koin_count, requestArray[i].extra_coins,
        requestArray[i].promo_id, requestArray[i].answer_placeholder, requestArray[i].view_type);
    }
    return missionsArray;
  }
}
