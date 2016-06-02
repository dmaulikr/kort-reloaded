import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Mission from '../dto/Mission';
import TaskReward from '../dto/TaskReward';
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
    });

    return missions;
  }

  static _initJsonMission(mission, message, isUnsolvable) {
    const falsePositive = isUnsolvable ? 1 : 0;
    return JSON.stringify({
      id: mission.id,
      user_id: mission.userId,
      error_id: mission.id,
      schema: mission.schema,
      osm_id: mission.osmId,
      message,
      falsepositive,
    });
  }

  static _initTaskReward(rawTaskReward) {
    const badges = [];
    rawTaskReward.badges.forEach((rawBadge) => {
      badges.push(new UserBadge(null, rawBadge.name, null, null, null, null, null, null));
    });

    return new TaskReward(badges, rawTaskReward.koint_count_new,
      rawTaskReward.koin_count_total);
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

  static postMission(mission,  message, isUnsolvable, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(missionPostRestPath, null, null);
    super.makePostRequest(
      requestUrl,
      MissionLoader._initJsonMission(mission, message, isUnsolvable),
      (rawTaskReward) => onSuccess(MissionLoader._initTaskReward(rawTaskReward)),
      onError
    );
  }


}
