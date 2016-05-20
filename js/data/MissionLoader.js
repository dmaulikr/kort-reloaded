import createRequestUrl from '../utils/ApiUrlBuilder';
import Mission from '../dto/Mission';

const MISSIONS_REST_PATH = '/mission/position';

function initMissions(rawMissions) {
  const missions = [];
  rawMissions.forEach((mission) => {
    missions.push(new Mission(
      mission.id,
      mission.type,
      mission.title,
      mission.description,
      mission.view_type,
      mission.latitude,
      mission.longitude,
      mission.fix_koin_count,
      mission.promo_id,
      mission.extra_coins,
      mission.answer_placeholder)
    );
  }, this);

  return missions;
}

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
        onSuccess(initMissions(responseData.return));
      })
      .done();
  }
}

export default MissionLoader;
