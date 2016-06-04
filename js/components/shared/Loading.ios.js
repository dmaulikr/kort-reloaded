import React from 'react';
import { ActivityIndicatorIOS,
  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
});


const Loading = function () {
  return (
    <ActivityIndicatorIOS
      animating
      style={[styles.centering, styles.gray, { height: 80 }]}
      color="white"
      size="large"
    />
  );
};

module.exports = Loading;
