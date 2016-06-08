import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Map from './Map';
import CenterLocationButton from '../shared/CenterLocationButton';

import TaskActions from '../../actions/TaskActions';

import locationStore from '../../stores/LocationStore';
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
  componentDidMount() {
    taskRewardStore.addChangeListener(this._onTaskRewardUpdate);
  },

  _onTaskRewardUpdate() {
    TaskActions.loadTasks(locationStore.getLatitude(), locationStore.getLongitude());

    const taskReward = taskRewardStore.getTaskReward();
    Actions.taskReward({
      badges: taskReward.badges,
      receivedKoins: taskReward.receivedKoins,
      newKoinsTotal: taskReward.newKoinsTotal
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map ref="map" />
        </View>
        <CenterLocationButton onPress={() => console.log()} />
      </View>
    );
  },
});

module.exports = MissionsTab;
