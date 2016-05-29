import React from 'react';
import { BackAndroid } from 'react-native';
import { Scene, Modal, Router, Reducer, Actions } from 'react-native-router-flux';
import Login from './Login';
import MissionsTab from './MissionsTab';
import ProfileTab from './ProfileTab';
import HighscoreTab from './HighscoreTab';
import AboutTab from './AboutTab';
import TabIcon from './shared/TabIcon';
import MissionModal from './missions/MissionModal';
import ProfileModal from './highscore/ProfileModal';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const scenes = Actions.create(
  <Scene key = 'modal' component = { Modal } >
    <Scene key = 'root' hideNavBar>
      <Scene key = 'login'
        initial
        component = { Login }
        title = 'Login'
        direction = 'vertical'
        style = { { flex: 1, backgroundColor: 'transparent' } }
      />
      <Scene key = 'tabbar'  panHandlers = { null } tabs type = 'replace'>
        <Scene key = 'missions'
          component = { MissionsTab }
          title = 'Missions'
          hideNavBar
          icon = { TabIcon }
        />
        <Scene key = 'profile'
          component = { ProfileTab }
          title = 'Profile'
          hideNavBar
          icon = { TabIcon }
        />
        <Scene key = 'highscore'
          component = { HighscoreTab }
          title = 'Highscore'
          hideNavBar
          icon = { TabIcon }
        />
        <Scene key = 'about'
          component = { AboutTab }
          title = 'About'
          hideNavBar
          icon = { TabIcon }
        />
      </Scene>
      <Scene
        key = 'missionModal'
        panHandlers = { null }
        component = { MissionModal }
        direction = 'vertical'
      />
      <Scene
        key = 'profileModal'
        panHandlers = { null }
        component = { ProfileModal }
        direction = 'vertical'
      />
    </Scene>
  </Scene>
);

const App = React.createClass({
  getInitialState() { return { }; },

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
  },

  componentDidMount() {
    // Actions.login();
  },

  render() {
    return (
      <Router
        createReducer = { reducerCreate }
        sceneStyle = { { backgroundColor: '#F7F7F7' } }
        scenes = { scenes }
      />
    );
  },
});

export default App;
