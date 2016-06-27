import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import I18n from 'react-native-i18n';
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
      this._showError(locationStore.getError());
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

  _showError(error) {
    if (this._isShowingError) return;

    Alert.alert(error.title, error.message,
      [{ text: I18n.t('messagebox_ok'), onPress: () => {this._isShowingError = false;} }]
    );
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
