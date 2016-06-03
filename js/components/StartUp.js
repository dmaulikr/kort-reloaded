import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import loginStore from '../stores/LoginStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
});


const StartUp = React.createClass({
  componentDidMount() {
    loginStore.addChangeListener(this._onCredentialLoaded);
  },

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onCredentialLoaded);
  },

  _onCredentialLoaded() {
    console.log(`is logged in: ${loginStore.isLoggedIn()}`);
    console.log(`is loading: ${loginStore.isLoadingFromLocalStorage()}`);
    if (loginStore.isLoggedIn()) {
      Actions.tabbar();
    } else {
      Actions.login();
    }
  },

  render() {
    return (
      <View style={styles.container} />
    );
  },
});

module.exports = StartUp;
