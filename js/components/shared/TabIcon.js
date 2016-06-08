/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
  caption: {
    textAlign: 'center',
    fontSize: 8,
  },
});

const TabIcon = ({ caption, icon }) => (
  <View>
    <Image style={styles.tabIcon} source={icon} />
    <Text style={styles.caption}>{caption}</Text>
  </View>
);

TabIcon.propTypes = {
  caption: React.PropTypes.any.isRequired,
  icon: React.PropTypes.any.isRequired,
};

const MissionsTabIcon = () => {
  const caption = 'Missions';
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_missions.png');
  } else {
    icon = require('../../assets/tabIcons/ic_ios_missions.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const ProfileTabIcon = () => {
  const caption = 'Profile';
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_profile.png');
  } else {
    icon = require('../../assets/tabIcons/ic_ios_profile.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const HighscoreTabIcon = () => {
  const caption = 'Highscore';
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_highscore.png');
  } else {
    icon = require('../../assets/tabIcons/ic_ios_highscore.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const AboutTabIcon = () => {
  const caption = 'About';
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_about.png');
  } else {
    icon = require('../../assets/tabIcons/ic_ios_about.png');
  }
  return <TabIcon caption={caption} icon={icon} />;
};

module.exports = { MissionsTabIcon, ProfileTabIcon, HighscoreTabIcon, AboutTabIcon };
