import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoadingIndicator from './shared/LoadingIndicator';

import AnswerActions from '../actions/AnswerActions';
import AuthenticationActions from '../actions/AuthenticationActions';
import HighscoreActions from '../actions/HighscoreActions';
import LocationActions from '../actions/LocationActions';
import StatisticsActions from '../actions/StatisticsActions';
import TaskActions from '../actions/TaskActions';
import UserActions from '../actions/UserActions';

import Config from '../constants/Config';

import authenticationStore from '../stores/AuthenticationStore';
import locationStore from '../stores/LocationStore';

import answerStore from '../stores/AnswerStore';
import highscoreStore from '../stores/HighscoreStore';
import statisticsStore from '../stores/StatisticsStore';
import taskStore from '../stores/TaskStore';
import userStore from '../stores/UserStore';

const highscoreLimit = Config.HIGHSCORE_LIMIT;
const highscorePrefetchLimit = Config.HIGHSCORE_PREFETCH_LIMIT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#144E87',
  },
});

export default class AppLoader extends React.Component {
  constructor(props) {
    super(props);

    this._isAuthenticated = false;
    this._isLocated = false;
    this._hasStartedDataLoading = false;
    this._hasStartedTaskLoading = false;
    this._hasJumpedToMap = false;

    this._loadTasks = this._loadTasks.bind(this);
    this._onLocationUpdate = this._onLocationUpdate.bind(this);
    this._onAuthenticationUpdate = this._onAuthenticationUpdate.bind(this);
  }

  componentDidMount() {
    locationStore.addChangeListener(this._onLocationUpdate);
    LocationActions.startLocating();
    authenticationStore.addChangeListener(this._onAuthenticationUpdate);
    AuthenticationActions.loadCredential();

    answerStore.addChangeListener(this._onAnswerUpdate);
    highscoreStore.addChangeListener(this._onHighscoreUpdate);
    statisticsStore.addChangeListener(this._onStatisticsUpdate);
    userStore.addChangeListener(this._onUserUpdate);
    taskStore.addChangeListener(this._onTaskUpdate);
  }

  componentWillUnmount() {
    authenticationStore.removeChangeListener(this._onAuthenticationUpdate);
  }

  _loadData() {
    console.log('LOADER:', 'begin loading data');
    this._hasStartedDataLoading = true;

    AnswerActions.loadAllAnswers();
    UserActions.loadOwnUser();
    HighscoreActions.loadAbsoluteHighscore(highscorePrefetchLimit, null);
    HighscoreActions.loadAbsoluteHighscore(highscoreLimit, null);
    StatisticsActions.loadStatistics();
  }

  _loadTasks() {
    console.log('LOADER:', 'begin loading tasks');
    this._hasStartedTaskLoading = true;

    const latitude = locationStore.getLatitude();
    const longitude = locationStore.getLongitude();
    TaskActions.loadTasks(latitude, longitude);
  }

  _onUpdate() {
    if (this._isAuthenticated) {
      if (this._isLocated) {
        if (!this._hasStartedTaskLoading) {
          this._loadTasks();
        }
      }

      if (!this._hasStartedDataLoading) {
        this._loadData();
      }
    }

    if (!this._hasJumpedToMap && this._hasStartedTaskLoading && this._hasStartedDataLoading) {
      console.log('LOADER:', 'onAuthenticationUpdate loads tabBar');
      Actions.tabBar();
      this._hasJumpedToMap = true;
    }
  }

  _onLocationUpdate() {
    if (locationStore.isWatching === false) {
      alert('enable location');
      return;
    }

    if (locationStore.getPosition() !== null) {
      console.log('LOADER:', 'position loaded');
      this._isLocated = true;
      this._onUpdate();
    }
  }

  _onAuthenticationUpdate() {
    if (!authenticationStore.isLoggedIn()) {
      Actions.login();
      return;
    }

    console.log('LOADER:', 'user authenticated');
    this._isAuthenticated = true;
    this._onUpdate();
  }

  _onAnswerUpdate() {
    if (answerStore.getAllAnswers() !== null) console.log('LOADER:', 'answers loaded');
  }

  _onHighscoreUpdate() {
    if (highscoreStore.getHighscore() !== null) console.log('LOADER:', 'highscore loaded');
  }

  _onStatisticsUpdate() {
    if (statisticsStore.getStatistics() !== null) console.log('LOADER:', 'statistics loaded');
  }

  _onUserUpdate() {
    if (userStore.getUser() !== null) console.log('LOADER:', 'user loaded');
  }

  _onTaskUpdate() {
    if (taskStore.getAll() !== null) console.log('LOADER:', 'tasks loaded');
  }

  render() {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }
}

module.exports = AppLoader;
