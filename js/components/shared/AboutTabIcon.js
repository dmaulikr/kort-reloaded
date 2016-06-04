import React from 'react';
import { Image,
  Platform,
  StyleSheet,
  Text,
  View } from 'react-native';

const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: 8,
  },
});

const AboutTabIcon = React.createClass({

  getInitialState() { return { }; },

  iconUri: '',

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_about.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_about.png');
    }
    return (
      <View>
        <Image style = { styles.tabIcon } source = { iconUri } />
        <Text style = { styles.tabTitle }>About</Text>
      </View>
    );
  },
});

module.exports = AboutTabIcon;
