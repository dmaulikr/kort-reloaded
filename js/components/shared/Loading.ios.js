import React from 'react';
import { ActivityIndicatorIOS, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: 45,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
});


const Loading = () => (
  <View style={styles.overlayContainer}>
    <ActivityIndicatorIOS
      animating
      style={[styles.centering, styles.gray, { height: 80 }]}
      color="white"
      size="large"
    />
  </View>
);

module.exports = Loading;
