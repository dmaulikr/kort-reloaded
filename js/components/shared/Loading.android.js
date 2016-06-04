import React from 'react';
import { ProgressBarAndroid,
  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spinner: {
    width: 30,
    height: 30,
  },
});


const Loading = function () {
  return <ProgressBarAndroid styleAttr="Large" style={styles.spinner} />;
};

module.exports = Loading;