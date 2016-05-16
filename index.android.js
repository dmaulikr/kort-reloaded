
import React, { AppRegistry } from 'react-native';

import { Scene, Router, Reducer } from 'react-native-router-flux';

import Login from './js/components/Login';
import TabView from './js/components/TabView';
import MissionsTab from './js/components/MissionsTab';
import TabIcon from './js/components/TabIcon';

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

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
        <Scene key="root" hideNavBar>
          <Scene key="login"
            component={Login}
            title="Login"
            initial
            style={ { flex: 1, backgroundColor: 'transparent' } }
          />
            <Scene key="tabbar" tabs>
              <Scene key="missions"
                component={MissionsTab}
                title="Missions"
                hideNavBar
                icon={TabIcon}
              />
              <Scene key="highscore"
                component={TabView}
                title="Highscore"
                hideNavBar
                icon={TabIcon}
              />
              <Scene key="profile"
                component={ProfileTab}
                title="Profile"
                hideNavBar
                icon={TabIcon}
              />
              <Scene key="about"
                component={TabView}
                title="About"
                hideNavBar
                icon={TabIcon}
              />
            </Scene>
        </Scene>
      </Router>
    );
  },
});

AppRegistry.registerComponent('Kort', () => App);
