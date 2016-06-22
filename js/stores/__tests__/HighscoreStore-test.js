jest.unmock('../HighscoreStore');

describe('HighscoreStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const HighscoreEntry = require('../../dto/HighscoreEntry').default;

  let AppDispatcher;
  let highscoreStore;
  let callback;

  function createHighscore() {
    return [
      new HighscoreEntry(null, null, null, null, null, null, null, null, null, null),
      new HighscoreEntry(null, null, null, null, null, null, null, null, null, null),
    ];
  }

  const actionHighscoreLoaded = {
    actionType: ActionTypes.HIGHSCORE_LOAD,
    data: createHighscore(),
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    highscoreStore = require('../HighscoreStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getHighscore()', () => {
    it('initializes with no user highscore entry items', () => {
      const all = highscoreStore.getHighscore();
      expect(all).toBeNull();
    });

    it('updates when highscore is loaded', () => {
      callback(actionHighscoreLoaded);
      const highscore = highscoreStore.getHighscore();
      expect(highscore).toEqual(createHighscore());
    });
  });
});
