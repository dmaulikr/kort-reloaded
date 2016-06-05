import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import App from './App';

import AnswerActions from '../actions/AnswerActions';
import AuthenticationActions from '../actions/AuthenticationActions';
import HighscoreActions from '../actions/HighscoreActions';
import LocationActions from '../actions/LocationActions';
//import MissionActions from '../actions/MissionActions';
import StatisticsActions from '../actions/StatisticsActions';
import TaskActions from '../actions/TaskActions';
import UserActions from '../actions/UserActions';
//import ValidationActions from '../actions/ValidationActions';

import Config from '../constants/Config';

import authenticationStore from '../stores/AuthenticationStore';
import locationStore from '../stores/LocationStore';

const highscoreLimit = Config.HIGHSCORE_LIMIT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
});

export default class AppLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasLoaded: false };
    this._loadTasks = this._loadTasks.bind(this);
    this._onLocationUpdate = this._onLocationUpdate.bind(this);
    this._onAuthenticationUpdate = this._onAuthenticationUpdate.bind(this);
  }

  componentDidMount() {
    locationStore.addChangeListener(this._onLocationUpdate);
    LocationActions.startLocating();
    authenticationStore.addChangeListener(this._onAuthenticationUpdate);
    AuthenticationActions.loadCredential();
  }

  componentWillUnmount() {
    authenticationStore.removeChangeListener(this._onAuthenticationUpdate);
  }

  _loadData() {
    AnswerActions.loadAllAnswers();
    HighscoreActions.loadRelativeHighscore(highscoreLimit, null);
    StatisticsActions.loadStatistics();
    UserActions.loadCurrentUser();
  }

  _loadTasks() {
    const latitude = locationStore.getLatitude();
    const longitude = locationStore.getLongitude();
    console.log(`latitude: ${latitude}`);
    TaskActions.loadTasks(latitude, longitude);
  }

  _onLocationUpdate() {
    if (locationStore.isWatching === false) {
      alert('enable location');
      return;
    }

    if (authenticationStore.isLoggedIn()) {
      this._loadTasks();
      Actions.tabBar();
    }
  }

  _onAuthenticationUpdate() {
    if (authenticationStore.isLoggedIn()) {
      this._loadData();
      if (locationStore.getPosition() !== null) {
        this._loadTasks();
        Actions.tabBar();
        console.log(`latitude: ${latitude}`);
      }
    } else {
      Actions.login();
    }
  }

  render() {
    return <View style={styles.container} />;
  }
}

module.exports = AppLoader;
