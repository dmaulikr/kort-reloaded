import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Mission from '../dto/Mission';
import TaskFixUpdate from '../dto/TaskFixUpdate';
import UserBadge from '../dto/UserBadge';

const missionsGetRestPath = Config.MISSIONS_GET_PATH;
const missionPostRestPath = Config.MISSION_PUT_PATH;

const limit = Config.MISSIONS_LIMIT;
const radius = Config.RADIUS;

export default class MissionLoader extends DataLoader {
  static _initMissions(rawMissions) {
    const missions = [];
    rawMissions.return.forEach((rawMission) => {
      missions.push(
        new Mission(rawMission.id, rawMission.type, rawMission.title, rawMission.description,
          rawMission.view_type, rawMission.latitude, rawMission.longitude,
          rawMission.fix_koin_count, rawMission.promo_id, rawMission.extra_coins,
          rawMission.answer_placeholder, rawMission.osm_id, rawMission.osm_type, rawMission.schema,
          rawMission.geom, rawMission.txt1, rawMission.txt2, rawMission.txt3, rawMission.txt4,
          rawMission.txt5
        )
      );
    }, this);

    return missions;
  }

  static _initJsonMission(mission, message) {
    return JSON.stringify({
      id: mission.id,
      user_id: mission.userId,
      error_id: mission.id,
      schema: mission.schema,
      osm_id: mission.osmId,
      message,
    });
  }

  static _initTaskFixUpdate(rawTaskFixUpdate) {
    const badges = [];
    rawTaskFixUpdate.badges.forEach((rawBadge) => {
      badges.push(new UserBadge(null, rawBadge.name, null, null, null, null, null, null));
    });

    return new TaskFixUpdate(badges, rawTaskFixUpdate.koint_count_new,
      rawTaskFixUpdate.koin_count_total);
  }

  static getMissions(latitude, longitude, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      missionsGetRestPath, [latitude, longitude], parameters);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawMissions) => onSuccess(MissionLoader._initMissions(rawMissions)),
      null
    );
  }

  static postMission(mission, onSuccess, onError) {
    const requestUrl(missionPostRestPath, null, null);
    super.makePostRequest(
      requestUrl,
      MissionLoader._initJsonMission(mission);
      (rawMissions) => onSuccess(MissionLoader._initMissions(rawMissions)),
      onError
    )
  }

  
}
