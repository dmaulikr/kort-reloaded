jest.unmock('../LocationStore');

describe('LocationStore', () => {
  let AppDispatcher;
  let locationStore;

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    locationStore = require('../LocationStore').default;
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getPosition()', () => {
    it('initializes with no user location item', () => {
      const position = locationStore.getPosition();
      expect(position).toBeNull();
    });
  });

  describe('getLatitude()', () => {
    it('returns null when location has not been loaded yet', () => {
      const latitude = locationStore.getLatitude();
      expect(latitude).toBeNull();
    });
  });

  describe('getLongitude()', () => {
    it('returns null when location has not been loaded yet', () => {
      const longitude = locationStore.getLongitude();
      expect(longitude).toBeNull();
    });
  });
});
