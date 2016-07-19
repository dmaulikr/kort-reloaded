import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class TaskStore extends Store {
  constructor() {
    super();
    this._tasks = null;
    this._error = null;
  }

  _setTasks(tasks) {
    tasks.push({
      id: '11164111',
      type: 'poi_name',
      title: 'Objekt ohne Namen',
      question: 'Wie heisst diese/s Café?',
      viewType: 'text',
      latitude: '47.4330700000000000',
      longitude: '9.3818100000000000',
      fixKoinCount: '15',
      promoId: null,
      promoExtraKoins: null,
      osmId: '4092637290',
      osmType: 'node',
      geom: '0101000020E6100000A4614216B3BF2240076D286B8AB64740',
      txt1: 'cafe',
      txt2: '',
      txt3: '',
      txt4: '',
      txt5: '',
      annotationImage: 'poi_name_mission',
      answerPlaceholder: 'Name',
      schema: '95'
    });
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
