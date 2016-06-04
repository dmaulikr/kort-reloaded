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
    if (loginStore.isLoadingFromLocalStorage()) {
      loginStore.addChangeListener(this._onCredentialLoaded);
    } else {
      this._onCredentialLoaded();
    }
  },

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onCredentialLoaded);
  },

  _onCredentialLoaded() {
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
