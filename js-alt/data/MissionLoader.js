import DataLoader from './DataLoader';
import Mission from '../dto/Mission';

const MISSIONS_REST_PATH = '/mission/position';

function _initMissions(rawMissions) {
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

class MissionLoader extends DataLoader {
  static getMissions(latitude, longitude, limit, radius, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      MISSIONS_REST_PATH, [latitude, longitude], parameters);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, _initMissions);
  }
}

export default MissionLoader;
