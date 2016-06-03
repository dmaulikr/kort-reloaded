import React from 'react';
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';

import Login from './Login';
import TabView from './TabView';
import MissionsTab from './MissionsTab';
import ProfileTab from './ProfileTab';
import TabIcon from './TabIcon';
import StartUp from './StartUp';

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="startup" component={StartUp} initial hideNavBar />
    <Scene key="tabbar" tabs>
      <Scene key="missions" component={MissionsTab} title="Missions" hideNavBar icon={TabIcon} />
      <Scene key="profile" component={ProfileTab} title="Profile" hideNavBar icon={TabIcon} />
      <Scene key="highscore" component={TabView} title="Highscore" hideNavBar icon={TabIcon} />
      <Scene key="about" component={TabView} title="About" hideNavBar icon={TabIcon} />
    </Scene>
    <Scene key="login" component={Login} title="Login" direction="vertical" />
  </Scene>
);

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const App = function (props) {
  return <Router scenes={scenes} createReducer={reducerCreate} />;
};

export default App;
