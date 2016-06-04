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

const ProfileTabIcon = React.createClass({

  getInitialState() { return { }; },

  iconUri: '',

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_profile.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_profile.png');
    }
    return (
      <View>
        <Image style = { styles.tabIcon } source = { iconUri } />
        <Text style = { styles.tabTitle }>Profile</Text>
      </View>
    );
  },
});

module.exports = ProfileTabIcon;
