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

function updateMissions(missions) {
  // only emit change if missions changed
  // currently depends on the assumption that missions are always retrieved in the same order
  // TODO: make comparison more robust
  if (missions.toString() !== _missions.toString()) {
    _missions = missions;
    missionStore.emitChange();
  }
}

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSIONS_LOAD:
      updateMissions(action.data);
      break;

    default:
      return;
  }
});

export default missionStore;
