import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

import Mission from '../dto/Mission';

class TaskStore extends Store {
  constructor() {
    super();
    this._tasks = null;
    this._error = null;
  }

  _setTasks(tasks) {
    tasks.push(new Mission(
      '11164111',
      'poi_name',
      'Object without a name',
      `What's this gas station called like?`,
      'text',
      '46.84637',
      '9.51115',
      '15',
      null,
      null,
      'Name',
      '4092637290',
      'node',
      '95',
      '0101000020E6100000A4614216B3BF2240076D286B8AB64740',
      'cafe',
      '',
      '',
      '',
      ''
    ),
    new Mission(
      '11164112',
      'missing_cuisine',
      'Restaurant without a cuisine',
      `What's the cuisine type of 'McDonald's'?`,
      'select',
      '46.84600',
      '9.51275',
      '15',
      null,
      null,
      'Name',
      '4092637290',
      'node',
      '95',
      '0101000020E6100000A4614216B3BF2240076D286B8AB64740',
      'cafe',
      '',
      '',
      '',
      ''
    ));
    this._tasks = tasks;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  _clearError() {
    this._error = null;
  }

  getAll() {
    return this._tasks;
  }

  get(id) {
    if (this._tasks === null) return null;

    for (const task of this._tasks) {
      if (id === task.id) {
        return task;
      }
    }

    return null;
  }

  getError() {
    return this._error;
  }
}

const taskStore = new TaskStore();

taskStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.TASKS_LOAD:
      taskStore._setTasks(action.data);
      break;
    case ActionTypes.MISSIONS_ERROR_LOAD:
    case ActionTypes.VALIDATIONS_ERROR_LOAD:
      taskStore._raiseError();
      break;
    case ActionTypes.TASKS_CLEAR_LOAD_ERROR:
      taskStore._clearError();
      break;
    default:
      return;
  }
});

export default taskStore;
