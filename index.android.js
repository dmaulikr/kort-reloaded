import React, { AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native';

var Map = require('./components/Map');

import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux';
import Login from './components/Login';
import NavigationDrawer from './components/NavigationDrawer';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
      alignItems: 'center' },
});

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

class App extends React.Component {
  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
        <Scene key="modal" component={Modal}>
          <Scene key="root" hideNavBar={Boolean(true)}>
            <Scene key="login" component={Login} title="Login" initial={Boolean(true)} style={ { flex: 1, backgroundColor: 'transparent' } } />
            <Scene key="tabbar" component={NavigationDrawer}>
              <Scene key="main" tabs={Boolean(true)}>
                <Scene key="missionsTab" component={TabView} title="Missions" hideNavBar={Boolean(true)} icon={TabIcon} />
                <Scene key="profileTab" component={TabView} title="Profile" hideNavBar={Boolean(true)} icon={TabIcon} />
                <Scene key="highscore" component={TabView} title="Highscore" hideNavBar={Boolean(true)} icon={TabIcon} />
                <Scene key="about" component={TabView} title="About" hideNavBar={Boolean(true)} icon={TabIcon} />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('Kort', () => App);
