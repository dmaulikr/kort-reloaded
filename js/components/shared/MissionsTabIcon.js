import React from 'react';
import { Image,
  StyleSheet,
  View,
  Platform } from 'react-native';

const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
});

const MissionsTabIcon = React.createClass({

  getInitialState() { return { }; },

  iconUri: '',

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_missions.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_missions.png');
    }
    return (
      <Image style = { styles.tabIcon } source = { iconUri } />
    );
  },
});

module.exports = MissionsTabIcon;
