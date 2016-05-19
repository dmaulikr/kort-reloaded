import React from 'react';
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';
import Login from './Login';
import TabView from './TabView';
import MissionsTab from './MissionsTab';
import TabIcon from './TabIcon';

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
    //Actions.login();
  },

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }}>
        <Scene key="root" hideNavBar>
          <Scene key="login"
            component={Login}
            title="Login"
            direction="vertical"
            style={ { flex: 1, backgroundColor: 'transparent' } }
          />
          <Scene key="tabbar" tabs initial>
            <Scene key="missions"
              component={MissionsTab}
              title="Missions"
              hideNavBar
              icon={TabIcon}
            />
            <Scene key="profile"
              component={TabView}
              title="Profile"
              hideNavBar
              icon={TabIcon}
            />
            <Scene key="highscore"
              component={TabView}
              title="Highscore"
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

export default App;
