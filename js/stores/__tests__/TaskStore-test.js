jest.unmock('../../dto/Mission');
jest.unmock('../Store');
jest.unmock('../../dto/Task');
jest.unmock('../TaskStore');
jest.unmock('../../dto/Validation');

describe('TaskStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const Mission = require('../../dto/Mission').default;
  const Validation = require('../../dto/Validation').default;

  let AppDispatcher;
  let taskStore;
  let callback;

  function createMission() {
    return new Mission('60437923', 'missing_track_type', 'Type of track unknown',
      'What kind of track is this?', 'select', '47.1001980000000000', '8.0997026000000000', '5',
      null, null, 'Type', '258950045', 'way', '95',
      '0101000020E610000000A71C380C332040F38FBE49D38C4740', '', '', '', '', '');
  }

  function createValidation() {
    return new Validation('24247', 'missing_maxspeed', 'Missing speed limit',
      'What\'s the speed limit for this street?', 'number', '47.2405892000000000',
      '8.9220751000000000', '5', null, null, '1496', '50', false, '0', '0', '3', '5446313', 'way',
      '0101000020E610000070E93D3A1AD82140AAE27CA0CB9E4740', '', '', '', '', '');
  }

  function createTasks() {
    return [
      createMission(),
      createValidation(),
    ];
  }

  function createDifferentTasks() {
    return [
      new Validation('20947', 'missing_track_type', 'Type of track unknown',
        'Is this path of the following kind?', 'select', '47.2519775000000000',
        '8.8848209000000000', '5', null, null, '1535', 'grade3', false, '0', '0', '3', '108028151',
        'way', '0101000020E610000073A2B83E07C52140F7E978CC40A04740', '', '', '', '', ''
      ),
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

  const actionNoTaskLoaded = {
    actionType: ActionTypes.TASKS_LOAD,
    data: [],
  };

  const actionOneMissionLoaded = {
    actionType: ActionTypes.TASKS_LOAD,
    data: [createMission()],
  };

  const actionOneValidationLoaded = {
    actionType: ActionTypes.TASKS_LOAD,
    data: [createValidation()],
  };

  const actionTasksLoaded = {
    actionType: ActionTypes.TASKS_LOAD,
    data: createTasks(),
  };

  const actionDifferentTasksLoaded = {
    actionType: ActionTypes.TASKS_LOAD,
    data: createDifferentTasks(),
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    taskStore = require('../TaskStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getAll()', () => {
    it('initializes with no task items', () => {
      const all = taskStore.getAll();
      expect(all).toBeNull();
    });

    it('updates when no tasks are available', () => {
      let all = taskStore.getAll();
      expect(all).toBeNull();
      callback(actionNoTaskLoaded);
      all = taskStore.getAll();
      expect(all.length).toBe(0);
    });

    it('updates after loading a mission', () => {
      callback(actionOneMissionLoaded);
      const all = taskStore.getAll();
      expect(all.length).toBe(1);
      expect(all[0].id).toEqual(createMission().id);
    });

    it('updates after loading a validation', () => {
      callback(actionOneValidationLoaded);
      const all = taskStore.getAll();
      expect(all.length).toBe(1);
      expect(all[0]).toEqual(createValidation());
    });

    it('updates after loading tasks', () => {
      callback(actionTasksLoaded);
      const all = taskStore.getAll();
      expect(all).toEqual(createTasks());
    });

    it('udpates after loading different tasks', () => {
      callback(actionTasksLoaded);
      let all = taskStore.getAll();
      expect(all).toEqual(createTasks());
      callback(actionDifferentTasksLoaded);
      all = taskStore.getAll();
      expect(all).toEqual(createDifferentTasks());
    });
  });

  describe('get(id)', () => {
    it('returns null when tasks were not loaded yet', () => {
      const task = taskStore.get(42);
      expect(task).toBeNull();
    });

    it('returns null when no tasks were available', () => {
      callback(actionNoTaskLoaded);
      const task = taskStore.get(42);
      expect(task).toBeNull();
    });

    it('returns correct task when several tasks were loaded', () => {
      callback(actionTasksLoaded);
      const task = taskStore.get('24247');
      expect(task).toEqual(createValidation());
    });
  });
});
