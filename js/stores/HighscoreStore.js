import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class HighscoreStore extends Store {
  constructor() {
    super();
    this._highscore = null;
  }

  _setHighscore(highscore) {
    this._highscore = highscore;
    super.emitChange();
  }

  getHighscore() {
    return this._highscore;
  }
}

const highscoreStore = new HighscoreStore();

highscoreStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.HIGHSCORE_LOAD:
      highscoreStore._setHighscore(action.data);
      break;
    default:
      return;
  }
});

export default highscoreStore;
