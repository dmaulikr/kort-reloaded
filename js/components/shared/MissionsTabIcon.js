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
  tabTitle: {
    textAlign: 'center',
    fontSize: 8,
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
      <View>
        <Image style = { styles.tabIcon } source = { iconUri } />
        <Text style = { styles.tabTitle }>Missions</Text>
      </View>
    );
  },
});

module.exports = MissionsTabIcon;
