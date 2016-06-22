import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import Store from './Store';

const distanceFilter = Config.LOCATION_DISTANCE_FILTER;

class LocationStore extends Store {
  constructor() {
    super();
    this._position = null;
    this._isWatching = false;

    this._onPositionChange = this._onPositionChange.bind(this);
  }

  _onPositionChange(position) {
    this._position = position;
    super.emitChange();
  }

  _startWatchingLocation() {
    this._isWatching = true;
    navigator.geolocation.getCurrentPosition(this._onPositionChange);
    this._locationWatchId = navigator.geolocation.watchPosition(
      this._onPositionChange,
      (error) => {
        this.isWatching = false;
        super.emitChange();
      },
      { enableHighAccurracy: true, distanceFilter });
  }

  _stopWatchingLocation() {
    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  getPosition() {
    return this._position;
  }

  getLatitude() {
    const latitude = this._position === null ? null : this._position.coords.latitude;
    return latitude;
  }

  getLongitude() {
    const longitude = this._position === null ? null : this._position.coords.longitude;
    return longitude;
  }

  isWatching() {
    return this._isWatching;
  }
}

const locationStore = new LocationStore();

locationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.LOCATION_START_LOCATING:
      locationStore._startWatchingLocation();
      break;
    case ActionTypes.LOCATION_STOP_LOCATING:
      locationStore._stopWatchingLocation();
      break;
    default:
      return;
  }
});

export default locationStore;
