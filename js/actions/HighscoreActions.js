import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import HighscoreLoader from '../data/HighscoreLoader';

export default class HighscoreActions {
  static _dispatchHighScoreLoaded(highscoreEntries) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.HIGHSCORE_LOAD,
      data: highscoreEntries,
    });
  }

  static loadAbsoluteHighscore(limit, page) {
    HighscoreLoader.getAbsoluteHighscore(
      limit,
      page,
      HighscoreActions._dispatchHighScoreLoaded,
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_GET_HIGHSCORE,
        });
      }
    );
  }

  static loadRelativeHighscore(limit, page) {
    HighscoreLoader.getRelativeHighscore(
      limit,
      page,
      HighscoreActions._dispatchHighScoreLoaded,
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_GET_HIGHSCORE,
        });
      }
    );
  }
}
