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

const HighscoreTabIcon = React.createClass({

  imageUri: '',

  getInitialState() { return { }; },

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_highscore.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_highscore.png');
    }
    return (
      <Image style = { styles.tabIcon } source = { iconUri } />
    );
  },
});

module.exports = HighscoreTabIcon;
