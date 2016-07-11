import React from 'react';
import { Alert, StyleSheet, View, Text, Image, Modal } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import LoadingIndicatorMap from '../shared/LoadingIndicatorMap';
import Map from './Map';

import TaskActions from '../../actions/TaskActions';

import locationStore from '../../stores/LocationStore';
import taskStore from '../../stores/TaskStore';
import taskRewardStore from '../../stores/TaskRewardStore';

import Button from '../shared/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerModalContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  innerModalContainerMissionComplete: {
    flexDirection: 'row',
  },
  modalButton: {
    marginTop: 10,
  },
});

const MissionsTab = React.createClass({
  getInitialState() {
    return {
      modalVisible: true,
    };
  },

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

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    const loadingIndicator = (taskStore.getAll() === null) ? <LoadingIndicatorMap /> : null;
    return (
      <View>
      <Modal
          animationType='none'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={styles.modalContainer}>
            <View style={[styles.innerModalContainer, {padding: 20 }]}>
              <Text>{I18n.t('reward_alert_title')}</Text>
              <View style={styles.innerModalContainerMissionComplete}>
                <Image style={styles.icon} source={require('../../assets/img/koin_no_value.png')} />
                <Text style={styles.textMission}>
                  {I18n.t('reward_alert_koins_new', { koin_count_new: receivedKoins })}{'\n'}
                  {I18n.t('reward_alert_koins_total', { koin_count_total: newKoinsTotal })}
                </Text>
                </View>
                <Button onPress={Actions.pop}>{I18n.t('messagebox_ok')}</Button>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <Map ref="map" />
            {loadingIndicator}
            <View style={styles.loadingBackground} />
          </View>
        </View>
      </View>
    );
  },
});

module.exports = MissionsTab;
