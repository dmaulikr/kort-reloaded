/* eslint-disable max-len */
import React from 'react';
import { BackAndroid } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions, Modal, Scene, Router, Reducer } from 'react-native-router-flux';

import Login from './Login';
import MissionsTab from './missions/MissionsTab';
import ProfileTab from './profile/ProfileTab';
import HighscoreTab from './highscore/HighscoreTab';
import AboutTab from './about/AboutTab';

import SolveTaskModal from './missions/SolveTaskModal';
import TaskRewardModal from './missions/TaskRewardModal';
import ProfileModal from './highscore/ProfileModal';
import AppLoader from './AppLoader';
import { MissionsTabIcon, ProfileTabIcon, HighscoreTabIcon, AboutTabIcon } from './shared/TabIcon';

import Translations from '../constants/i18n/Translations';

const scenes = Actions.create(
  <Scene key="modal" component={Modal}>
    <Scene key="root" hideNavBar>
      <Scene key="appLoader" component={AppLoader} hideNavBar panHandlers={null} />
      <Scene key="login" component={Login} hideNavBar panHandlers={null} direction="vertical" sceneStyle={{ backgroundColor: '#144E87' }} />
      <Scene key="tabBar" panHandlers={null} tabs type="replace" tabBarStyle={{ flex: 1, alignItems: 'flex-start' }}>
        <Scene key="missions" component={MissionsTab} hideNavBar icon={MissionsTabIcon} />
        <Scene key="profile" component={ProfileTab} hideNavBar icon={ProfileTabIcon} sceneStyle={{ backgroundColor: '#ffffff' }} />
        <Scene key="highscore" component={HighscoreTab} hideNavBar icon={HighscoreTabIcon} sceneStyle={{ backgroundColor: '#ffffff' }} />
        <Scene key="about" component={AboutTab} hideNavBar icon={AboutTabIcon} sceneStyle={{ backgroundColor: '#ffffff' }} />
      </Scene>
      <Scene key="solveTask" panHandlers={null} component={SolveTaskModal} direction="vertical" />
      <Scene key="taskReward" panHandlers={null} component={TaskRewardModal} direction="vertical" />
      <Scene key="profileModal" hideNavBar panHandlers={null} component={ProfileModal} direction="horizontal" />
    </Scene>
  </Scene>
);

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const App = React.createClass({
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

    this._configureI18n();
  },

  _configureI18n() {
    I18n.fallbacks = true;
    I18n.defaultLocale = 'en';
    I18n.translations = Translations;
  },

  render() {
    return <Router scenes={scenes} createReducer={reducerCreate} />;
  },
});

export default App;
