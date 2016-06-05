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
import SolveTaskModal from './missions/SolveTaskModal';
import TaskRewardModal from './missions/TaskRewardModal';
import ProfileModal from './highscore/ProfileModal';
import StartUp from './StartUp';

const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar>
      <Scene key="startup" component={StartUp} hideNavBar />
      <Scene key="tabbar" panHandlers={null} tabs type="replace" tabBarStyle={{ flex: 1, alignItems: 'flex-start' }}>
        <Scene key="missions" component={MissionsTab} title="Missions" hideNavBar icon={MissionsTabIcon} />
        <Scene key="profile" component={ProfileTab} title="Profile" hideNavBar icon={ProfileTabIcon} />
        <Scene key="highscore" component={HighscoreTab} title="Highscore" hideNavBar icon={HighscoreTabIcon} />
        <Scene key="about" component={AboutTab} title="About" hideNavBar icon={AboutTabIcon} />
      </Scene>
      <Scene key="login" initial component={Login} title="Login" direction="vertical" sceneStyle={{backgroundColor:'#87ceeb'}} />
      <Scene key="solveTask" panHandlers={null} component={SolveTaskModal} direction="vertical" />
      <Scene key="taskReward" panHandlers={null} component={TaskRewardModal} direction="vertical" />
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
