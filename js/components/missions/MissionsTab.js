import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import LoadingIndicator from '../shared/LoadingIndicator';
import Map from './Map';

import TaskActions from '../../actions/TaskActions';

import locationStore from '../../stores/LocationStore';
import taskStore from '../../stores/TaskStore';
import taskRewardStore from '../../stores/TaskRewardStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  componentWillMount() {
    locationStore.addChangeListener(this._onLocationUpdate);
    taskStore.addChangeListener(this._onTaskUpdate);
    taskRewardStore.addChangeListener(this._onTaskRewardUpdate);
  },

  componentWillUnmount() {
    locationStore.removeChangeListener(this._onLocationUpdate);
    taskStore.removeChangeListener(this._onTaskUpdate);
    taskRewardStore.removeChangeListener(this._onTaskRewardUpdate);
  },

  _onLocationUpdate() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());
  },

  _onTaskUpdate() {
    if (taskStore.getError() !== null) {
      this._showError(taskStore.getError());
      TaskActions.clearLoadError();
      return;
    }

    this.refs.map.updateAnnotations();
    this.forceUpdate();
  },

  _onTaskRewardUpdate() {
    if (taskRewardStore.getError() !== null) {
      this._showError(taskRewardStore.getError());
      TaskActions.clearSendError();
      return;
    }

    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());

    const taskReward = taskRewardStore.getTaskReward();
    Actions.taskReward({
      badges: taskReward.badges,
      receivedKoins: taskReward.receivedKoins,
      newKoinsTotal: taskReward.newKoinsTotal,
    });
  },

  _showError(error) {
    Alert.alert(error.title, error.message,
      [{ text: I18n.t('messagebox_ok'), onPress: () => {this._isShowingError = false;} }]
    );
  },

  render() {
    const loadingIndicator = (taskStore.getAll() === null) ? <LoadingIndicator /> : null;
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map ref="map" />
          {loadingIndicator}
          <View style={styles.loadingBackground} />
        </View>
      </View>
    );
  },
});

module.exports = MissionsTab;
