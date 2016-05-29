import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class MissionStore extends Store {
  constructor() {
    super();
    this._missions = null;
  }

  getAll() {
    return this._missions;
  }

  _updateMissions(missions) {
    this._missions = missions;
    super.emitChange();
  }
}

const missionStore = new MissionStore();

missionStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.MISSIONS_LOAD:
      missionStore._updateMissions(action.data);
      break;
    default:
      return;
  }
});

export default missionStore;
