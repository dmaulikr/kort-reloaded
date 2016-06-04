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

const ProfileTabIcon = React.createClass({

  iconUri: '',

  getInitialState() { return { }; },

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_profile.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_profile.png');
    }
    return (
      <Image style = { styles.tabIcon } source = { iconUri } />
    );
  },
});

module.exports = ProfileTabIcon;
