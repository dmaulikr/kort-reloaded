import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import MissionLoader from '../data/MissionLoader';
import ValidationLoader from '../data/ValidationLoader';


function _onMissionsLoaded(missions) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.MISSIONS_LOAD,
    data: missions,
  });
}

function _onValidationsLoaded(validations) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.VALIDATIONS_LOAD,
    data: validations,
  });
}

function _onTasksLoaded(tasks) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.TASKS_LOAD,
    data: tasks,
  });
}

export default class TaskActions {

  /**
   * Loads all tasks for the given coordinates.
   * @param {number} latitude The latitude of the coordinates.
   * @param {number} longitude The longitude of the coordinates.
   * @returns {void}
   */
  static loadTasks(latitude, longitude) {
    let tasks = [];
    let missionsLoaded = false;
    let validationsLoaded = false;

    MissionLoader.getMissions(
      latitude,
      longitude,
      (missions) => {
        _onMissionsLoaded(missions);

        tasks = tasks.concat(missions);
        missionsLoaded = true;
        if (validationsLoaded) {
          _onTasksLoaded(tasks);
        }
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.MISSIONS_ERROR_LOAD,
          data: error,
        });
      }
    );
    ValidationLoader.getValidations(latitude, longitude,
      (validations) => {
        _onValidationsLoaded(validations);
        tasks = tasks.concat(validations);
        validationsLoaded = true;
        if (missionsLoaded) {
          _onTasksLoaded(tasks);
        }
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.VALIDATIONS_ERROR_LOAD,
          data: error,
        });
      }
    );
  }

  static clearLoadError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.TASKS_CLEAR_LOAD_ERROR });
  }

  static clearSendError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.TASKS_CLEAR_SEND_ERROR });
  }
}
