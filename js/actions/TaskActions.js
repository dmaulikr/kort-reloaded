import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import MissionLoader from '../data/MissionLoader';
import ValidationLoader from '../data/ValidationLoader';

import AppDispatcher from '../dispatcher/AppDispatcher';

function _onTasksLoaded(tasks) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.TASKS_LOAD,
    data: tasks,
  });
}

export default class TaskActions {
  static loadTasks(latitude, longitude) {
    let tasks = [];
    let missionsLoaded = false;
    let validationsLoaded = false;

    MissionLoader.getMissions(latitude, longitude, Config.MISSION_LIMIT, Config.RADIUS, (missions) => {
      tasks = tasks.concat(missions);
      missionsLoaded = true;

      if (validationsLoaded) {
        _onTasksLoaded(tasks);
      }
    });
    ValidationLoader.getValidations(latitude, longitude, Config.VALIDATION_LIMIT, Config.RADIUS, (validations) => {
      tasks = tasks.concat(validations);
      validationsLoaded = true;

      if (missionsLoaded) {
        _onTasksLoaded(tasks);
      }
    });
  }
}
