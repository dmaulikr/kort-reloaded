import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MissionLoader from '../data/MissionLoader';
import ValidationLoader from '../data/ValidationLoader';

const missionLimit = 10;
const validationLimit = 10;
const radius = 5000;

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

    MissionLoader.getMissions(latitude, longitude, missionLimit, radius, (missions) => {
      tasks = tasks.concat(missions);
      missionsLoaded = true;

      if (validationsLoaded) {
        _onTasksLoaded(tasks);
      }
    });
    ValidationLoader.getValidations(latitude, longitude, validationLimit, radius, (validations) => {
      tasks = tasks.concat(validations);
      validationsLoaded = true;

      if (missionsLoaded) {
        _onTasksLoaded(tasks);
      }
    });
  }
}

export default TaskActions;
