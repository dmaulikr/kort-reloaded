import { EventEmitter } from 'events';

import Config from '../constants/Config';

const changeEvent = Config.CHANGE_EVENT;

export default class Store extends EventEmitter {

  emitChange() {
    this.emit(changeEvent);
  }

  addChangeListener(callback) {
    this.on(changeEvent, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(changeEvent, callback);
  }
}

Store.dispatchToken = null;
