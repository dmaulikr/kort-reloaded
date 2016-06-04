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

const AboutTabIcon = React.createClass({

  iconUri: '',

  getInitialState() { return { }; },

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_about.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_about.png');
    }
    return (
      <Image style = { styles.tabIcon } source = { iconUri } />
    );
  },
});

module.exports = AboutTabIcon;
