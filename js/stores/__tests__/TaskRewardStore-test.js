jest.unmock('../TaskRewardStore');
jest.unmock('../../dto/TaskReward');

describe('TaskRewardStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const TaskReward = require('../../dto/TaskReward').default;

  let AppDispatcher;
  let taskRewardStore;
  let callback;

  function createTaskReward() {
    return new TaskReward(null, 5, 10);
  }

  function createDifferentTaskReward() {
    return new TaskReward(null, 15, 100);
  }

  const actionTaskRewardLoadedUponMission = {
    actionType: ActionTypes.MISSION_SEND,
    data: createTaskReward(),
  };

  const actionTaskRewardLoadedUponValidation = {
    actionType: ActionTypes.VALIDATION_SEND,
    data: createTaskReward(),
  };

  const actionDifferentTaskRewardLoaded = {
    actionType: ActionTypes.MISSION_SEND,
    data: createDifferentTaskReward(),
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    taskRewardStore = require('../TaskRewardStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getTaskReward()', () => {
    it('initializes with no user taskReward item', () => {
      const all = taskRewardStore.getTaskReward();
      expect(all).toBeNull();
    });

    it('updates when task reward is loaded upon successfully solving a mission', () => {
      callback(actionTaskRewardLoadedUponMission);
      const taskReward = taskRewardStore.getTaskReward();
      expect(taskReward).toEqual(createTaskReward());
    });

    it('updates when task reward is loaded upon successfully solving a validation', () => {
      callback(actionTaskRewardLoadedUponValidation);
      const taskReward = taskRewardStore.getTaskReward();
      expect(taskReward).toEqual(createTaskReward());
    });

    it('updates task reward when a different one is loaded', () => {
      callback(actionTaskRewardLoadedUponMission);
      callback(actionDifferentTaskRewardLoaded);
      const taskReward = taskRewardStore.getTaskReward();
      expect(taskReward).toEqual(createDifferentTaskReward());
    });
  });
});
