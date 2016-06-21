import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    this.refs.map.updateAnnotations();
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
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map ref="map" />
        </View>
      </View>
    );
  },
});

module.exports = MissionsTab;
