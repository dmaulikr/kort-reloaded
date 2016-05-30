import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

export default class HighscoreStore extends Store {
  constructor() {
    super();
    this._highscore = null;
    this.dispatchToken = AppDispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.HIGHSCORE_LOAD:
          this._updateHighscore(action.data);
          break;
        default:
          return;
      }
    });
  }

  _updateHighscore(highscore) {
    this._highscore = highscore;
    super.emitChange();
  }
}
