import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoginActions from '../actions/LoginActions';
import loginStore from '../stores/LoginStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  }
});


const StartUp = React.createClass({
  componentDidMount() {
    //Actions.missions();
    loginStore.addChangeListener(this._onCredentialLoaded);
  },

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onCredentialLoaded);
  },

  _onCredentialLoaded() {
    if (loginStore.isLoggedIn()) {
      console.log(loginStore.getUserCredential());
      Actions.tabbar();
    } else {
      Actions.login();
    }
  },

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  },
});

module.exports = StartUp;
