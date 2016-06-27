import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import LoadingIndicator from '../shared/LoadingIndicator';
import Map from './Map';

import ErrorActions from '../../actions/ErrorActions';
import TaskActions from '../../actions/TaskActions';

import Config from '../../constants/Config';

import errorStore from '../../stores/ErrorStore';
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
    errorStore.addChangeListener(this._onErrorUpdate);
    locationStore.addChangeListener(this._onLocationUpdate);
    taskStore.addChangeListener(this._onTaskUpdate);
    taskRewardStore.addChangeListener(this._onTaskRewardUpdate);
  },

  componentWillUnmount() {
    errorStore.removeChangeListener(this._onErrorUpdate);
    locationStore.removeChangeListener(this._onLocationUpdate);
    taskStore.removeChangeListener(this._onTaskUpdate);
    taskRewardStore.removeChangeListener(this._onTaskRewardUpdate);
  },

  _onErrorUpdate() {
    if (errorStore.getErrorType() === Config.ERROR_POST_MISSION
        || errorStore.getErrorType() === Config.ERROR_POST_VALIDATION) {
      Alert.alert(
        errorStore.getTitle(),
        errorStore.getMessage(),
        [{ text: I18n.t('messagebox_ok'), onPress: () => ErrorActions.clearError() }]);
    }
  },

  _onLocationUpdate() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());
  },

  _onTaskUpdate() {
    this.refs.map.updateAnnotations();
    this.forceUpdate();
  },

  _onTaskRewardUpdate() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());

    const taskReward = taskRewardStore.getTaskReward();
    Actions.taskReward({
      badges: taskReward.badges,
      receivedKoins: taskReward.receivedKoins,
      newKoinsTotal: taskReward.newKoinsTotal,
    });
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
