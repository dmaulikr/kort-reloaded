jest.unmock('../../dto/Mission');
jest.unmock('../MissionStore');
jest.unmock('../Store');
jest.unmock('../../dto/Task');

describe('MissionStore', () => {
  const Mission = require('../../dto/Mission').default;
  const ActionTypes = require('../../constants/ActionTypes');

  let AppDispatcher;
  let missionStore;
  let callback;

  function createMission() {
    return new Mission('60437923', 'missing_track_type', 'Type of track unknown',
      'What kind of track is this?', 'select', '47.1001980000000000', '8.0997026000000000', '5',
      null, null, 'Type', '258950045', 'way', '95',
      '0101000020E610000000A71C380C332040F38FBE49D38C4740', '', '', '', '', '');
  }

  function createMissions() {
    return [
      new Mission('60437923', 'missing_track_type', 'Type of track unknown',
        'What kind of track is this?', 'select', '47.1001980000000000', '8.0997026000000000', '5',
        null, null, 'Type', '258950045', 'way', '95',
        '0101000020E610000000A71C380C332040F38FBE49D38C4740', '', '', '', '', ''
      ),
      new Mission('59813509', 'missing_track_type', 'Type of track unknown',
        'What kind of track is this?', 'select', '47.1017361000000000', '8.1022390000000000', '5',
        null, null, 'Type', '222551643', 'way', '95',
        '0101000020E610000062C092AB583420404A2943B0058D4740', '', '', '', '', ''
      ),
    ];
  }

  function createDifferentMissions() {
    return [
      new Mission('24248263', 'missing_track_type', 'Type of track unknown',
        'What kind of track is this?', 'select', '47.2240278000000000', '8.9865292000000000', '5',
        null, null, 'Type', '5062374', 'way', '95',
        '0101000020E61000001C19F55A1AF921408A3265F1AC9C4740', '', '', '', '', ''
      ),
      new Mission('34015219', 'missing_cuisine', 'Restaurant without a cuisine',
        'What\'s the cuisine type of \'Restaurant Linth\'?', 'select', '47.2243090000000000',
        '8.9820507000000000', '15', null, null, 'Cuisine', '34015219', 'node', '1001',
        '0101000020E61000002BB05B56CFF621403EBDFF27B69C4740', 'Restaurant Linth', null, null, null,
        null
      ),
    ];
  }

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    missionStore = require('../MissionStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no mission items', () => {
    const all = missionStore.getAll();
    expect(all).toBeNull();
  });

  describe('MISSIONS_LOAD', () => {
    const actionMissionsLoadNoMission = {
      actionType: ActionTypes.MISSIONS_LOAD,
      data: [],
    };
    const actionMissionsLoadOneMission = {
      actionType: ActionTypes.MISSIONS_LOAD,
      data: [createMission()],
    };
    const actionMissionsLoadMissions = {
      actionType: ActionTypes.MISSIONS_LOAD,
      data: createMissions(),
    };
    const actionMissionsLoadDifferentMissions = {
      actionType: ActionTypes.MISSIONS_LOAD,
      data: createDifferentMissions(),
    };

    it('updates when no missions are available', () => {
      let all = missionStore.getAll();
      expect(all).toBeNull();
      callback(actionMissionsLoadNoMission);
      all = missionStore.getAll();
      expect(all.length).toBe(0);
    });

    it('loads a mission', () => {
      callback(actionMissionsLoadOneMission);
      const all = missionStore.getAll();
      expect(all.length).toBe(1);
      expect(all[0].id).toEqual(createMission().id);
    });

    it('updates after loading new missions', () => {
      let all = missionStore.getAll();
      expect(all).toBeNull();
      callback(actionMissionsLoadMissions);
      all = missionStore.getAll();
      expect(all).toEqual(createMissions());
    });

    it('updates after loading different missions', () => {
      callback(actionMissionsLoadMissions);
      let all = missionStore.getAll();
      expect(all).toEqual(createMissions());
      callback(actionMissionsLoadDifferentMissions);
      all = missionStore.getAll();
      expect(all).toEqual(createDifferentMissions());
    });
  });
});
