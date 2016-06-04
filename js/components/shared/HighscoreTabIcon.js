import React from 'react';
import { Image,
  Platform,
  StyleSheet,
  Text,
  View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  tabIcon: {
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: 8,
  },
});

const HighscoreTabIcon = React.createClass({

  getInitialState() { return { }; },

  imageUri: '',

  render() {
    if (Platform.OS === 'android') {
      iconUri = require('../../assets/tabIcons/ic_android_highscore.png');
    } else {
      iconUri = require('../../assets/tabIcons/ic_ios_highscore.png');
    }
    return (
      <View style = { styles.container }>
        <Image style = { styles.tabIcon } source = { iconUri } />
        <Text style = { styles.tabTitle }>Highscore</Text>
      </View>
    );
  },
});

module.exports = HighscoreTabIcon;
