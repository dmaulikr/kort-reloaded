import React from 'react';
import { BackAndroid } from 'react-native';
import { Actions,
  Modal,
  Scene,
  Router,
  Reducer } from 'react-native-router-flux';
import Login from './Login';
import MissionsTab from './MissionsTab';
import ProfileTab from './ProfileTab';
import HighscoreTab from './HighscoreTab';
import AboutTab from './AboutTab';
import MissionsTabIcon from './shared/MissionsTabIcon';
import ProfileTabIcon from './shared/ProfileTabIcon';
import HighscoreTabIcon from './shared/HighscoreTabIcon';
import AboutTabIcon from './shared/AboutTabIcon';
import MissionModal from './missions/MissionModal';
import CompletedMissionModal from './missions/CompletedMissionModal';
import ProfileModal from './highscore/ProfileModal';
import StartUp from './StartUp';

const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar>
      <Scene key="startup" component={StartUp} hideNavBar />
      <Scene key="tabbar" initial panHandlers={null} tabs type="replace">
        <Scene key="missions" component={MissionsTab} title="Missions" hideNavBar icon={MissionsTabIcon} />
        <Scene key="profile" component={ProfileTab} title="Profile" hideNavBar icon={ProfileTabIcon} />
        <Scene key="highscore" component={HighscoreTab} title="Highscore" hideNavBar icon={HighscoreTabIcon} />
        <Scene key="about" component={AboutTab} title="About" hideNavBar icon={AboutTabIcon} />
      </Scene>
      <Scene key="login" component={Login} title="Login" direction="vertical" />
      <Scene key="missionModal" panHandlers={null} component={MissionModal} direction="vertical" />
      <Scene key="completedMissionModal" panHandlers={null} component={CompletedMissionModal} direction="vertical" />
      <Scene key="profileModal" hideNavBar={false} panHandlers={null} component={ProfileModal} direction="vertical" />
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
  getInitialState() { return { }; },

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
  },

  render() {
    return <Router scenes={scenes} createReducer={reducerCreate} />;
  },
});

export default App;
