import DataLoader from './DataLoader';
import Config from '../constants/Config';
import Mission from '../dto/Mission';

const missionsGetRestPath = Config.MISSIONS_GET_PATH;
const limit = Config.MISSIONS_LIMIT;
const radius = Config.RADIUS;

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
  static getMissions(latitude, longitude, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      missionsGetRestPath, [latitude, longitude], parameters);
    super.makeRequest(requestUrl, onSuccess, null, _initMissions);
  }
}

export default MissionLoader;
