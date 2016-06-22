/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import I18n from 'react-native-i18n';

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
  const caption = I18n.t('tab_bugmap');
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_missions.png');
  } else {
    icon = require('../../assets/tabIcons/ic_android_missions.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const ProfileTabIcon = () => {
  const caption = I18n.t('tab_profile');
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_profile.png');
  } else {
    icon = require('../../assets/tabIcons/ic_android_profile.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const HighscoreTabIcon = () => {
  const caption = I18n.t('tab_highscore');
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_highscore.png');
  } else {
    icon = require('../../assets/tabIcons/ic_android_highscore.png');
  }

  return <TabIcon caption={caption} icon={icon} />;
};

const AboutTabIcon = () => {
  const caption = I18n.t('tab_about');
  let icon;
  if (Platform.OS === 'android') {
    icon = require('../../assets/tabIcons/ic_android_about.png');
  } else {
    icon = require('../../assets/tabIcons/ic_android_about.png');
  }
  return <TabIcon caption={caption} icon={icon} />;
};

module.exports = { MissionsTabIcon, ProfileTabIcon, HighscoreTabIcon, AboutTabIcon };
