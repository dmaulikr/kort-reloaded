import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MissionLoader from '../data/MissionLoader';
import Store from './Store';

let _missions = [];

class MissionStore extends Store {

  getAll() {
    return _missions;
  }
}

const missionStore = new MissionStore();

function initMissions(rawMissions) {
  _missions = [];
  rawMissions.forEach((mission) => {
    _missions.push({
      id: mission.id,
      title: mission.title,
      type: mission.type,
      description: mission.description,
      latitude: mission.latitude,
      longitude: mission.longitude,
      fixKoinCount: mission.fixKoinCount,
      promotionExtraKoins: mission.promotionExtraKoins,
      promoId: mission.promoId,
      answerPlaceholder: mission.answerPlaceholder,
      viewType: mission.viewType,
    });
  }, this);

  missionStore.emitChange();
}

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSIONS_LOAD:
      MissionLoader.getMissions(
        action.latitude, action.longitude, action.limit, action.radius, initMissions);
      break;

    default:
      return;
  }
});

export default missionStore;
