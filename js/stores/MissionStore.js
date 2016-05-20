import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

let _missions = [];

class MissionStore extends Store {

  getAll() {
    return _missions;
  }
}

const missionStore = new MissionStore();

function initMissions(rawMissions) {
  const missions = [];
  rawMissions.forEach((mission) => {
    missions.push({
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
  // only emit change if missions changed
  // currently depends on the assumption that missions are always returned in the same order
  // TODO: make comparison more robust
  if (missions.toString() !== _missions.toString()) {
    _missions = missions;
    missionStore.emitChange();
  }
}

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSIONS_LOAD:
      initMissions(action.data);
      break;

    default:
      return;
  }
});

export default missionStore;
