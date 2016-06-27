import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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

const highscoreLimit = Config.HIGHSCORE_LIMIT;
const highscorePrefetchLimit = Config.HIGHSCORE_PREFETCH_LIMIT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#144E87',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 10,
    height: 90,
    width: 90,
  },
  errorMessage: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    color: '#ffffff',
  },
});

export default class AppLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errorMessage: null };

    this._isAuthenticated = false;
    this._isLocated = false;
    this._hasStartedDataLoading = false;
    this._hasStartedTaskLoading = false;
    this._hasJumpedToMap = false;
    this._isShowingError = false;

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
    this._hasStartedDataLoading = true;

    AnswerActions.loadAllAnswers();
    UserActions.loadOwnUser();
    HighscoreActions.loadAbsoluteHighscore(highscorePrefetchLimit, null);
    HighscoreActions.loadAbsoluteHighscore(highscoreLimit, null);
    StatisticsActions.loadStatistics();
  }

  _loadTasks() {
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
      Actions.tabBar();
      this._hasJumpedToMap = true;
    }
  }

  _onLocationUpdate() {
    if (locationStore.getError() !== null) {
      this.setState({ errorMessage: locationStore.getError().message });
      LocationActions.clearError();
      return;
    }

    if (locationStore.getPosition() !== null) {
      this._isLocated = true;
      this._onUpdate();
    }
  }

  _onAuthenticationUpdate() {
    if (!authenticationStore.isLoggedIn()) {
      Actions.login();
      return;
    }

    this._isAuthenticated = true;
    this._onUpdate();
  }

  render() {
    let content;
    if (this.state.errorMessage === null) {
      content = <LoadingIndicator />;
    } else {
      content = <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.kortlogo} source={require('../assets/img/kort-logo_white.png')} />
        {content}
      </View>
    );
  }
}

module.exports = AppLoader;
