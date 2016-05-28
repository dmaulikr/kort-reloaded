import React from 'react';
import { Scene, Modal, Router, Reducer } from 'react-native-router-flux';
import Login from './Login';
import MissionsTab from './MissionsTab';
import ProfileTab from './ProfileTab';
import HighscoreTab from './HighscoreTab';
import AboutTab from './AboutTab';
import TabIcon from './TabIcon';
import MissionModal from './missions/MissionModal';
import ProfileModal from './profile/ProfileModal';

/*
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
      alignItems: 'center' },
});
*/

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const App = React.createClass({
  getInitialState() { return { }; },

  componentDidMount() {
    // Actions.login();
  },

  render() {
    return (
      <Router createReducer = { reducerCreate } sceneStyle = { { backgroundColor: '#F7F7F7' } }>
        <Scene key = 'modal' component = { Modal } >
          <Scene key = 'root' hideNavBar>
            <Scene key = 'tabbar'  panHandlers = { null } tabs >
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
                initial
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
            <Scene key = 'login'
              component = { Login }
              title = 'Login'
              direction = 'vertical'
              style = { { flex: 1, backgroundColor: 'transparent' } }
            />
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
      </Router>
    );
  },
});

export default App;
