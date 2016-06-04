import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import App from './App';

import AnswerActions from '../actions/AnswerActions';
import AuthenticationActions from '../actions/AuthenticationActions';
import HighscoreActions from '../actions/HighscoreActions';
import MissionActions from '../actions/MissionActions';
import PromotionActions from '../actions/PromotionActions';
import StatisticsActions from '../actions/StatisticsActions';
import TaskActions from '../actions/TaskActions';
import UserActions from '../actions/UserActions';
import ValidationActions from '../actions/ValidationActions';

import Config from '../constants/Config';

import authenticationStore from '../stores/AuthenticationStore';

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
    this._onAuthenticationUpdate = this._onAuthenticationUpdate.bind(this);
  }

  componentDidMount() {
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

  _onAuthenticationUpdate() {
    if (authenticationStore.isLoggedIn()) {
      this._loadData();
      Actions.tabBar();
    } else {
      Actions.login();
    }
  }

  render() {
    return <View style={styles.container} />;
  }
}

module.exports = AppLoader;
