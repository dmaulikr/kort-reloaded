import React from 'react';
import { StyleSheet,
  View } from 'react-native';
import Map from './missions/Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  getInitialState() { return { }; },

  render() {
    return (
      <View style = { styles.container }>
        <Map />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
