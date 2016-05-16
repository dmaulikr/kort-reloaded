<<<<<<< b0b86527f96cc7df0fc6da4023c77e81d082c3c6
import { AppRegistry } from 'react-native';
import App from './js/components/App';
=======

import React, { AppRegistry } from 'react-native';

// var Map = require('./components/Map');

import { Scene, Router, Reducer } from 'react-native-router-flux';

import Login from './components/Login';
import TabView from './components/TabView';
import MissionsTab from './components/MissionsTab';
import TabIcon from './components/TabIcon';

/*
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
      alignItems: 'center' },
});
*/

const reducerCreate = params => {
  const defaultReducer = Reducer(params); // eslint-disable-line new-cap
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
                component={TabView}
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
>>>>>>> update

AppRegistry.registerComponent('Kort', () => App);
