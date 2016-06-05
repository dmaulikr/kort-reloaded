import React from 'react';
import { StyleSheet,
  Text,
  View } from 'react-native';
import Map from './missions/Map';
import LocationButton from './shared/LocationButton';
import Loading from './shared/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  getInitialState() { return { }; },

  render() {
    return (
      <View style = { styles.container }>
        <View style = { styles.mapContainer }>
          <Map />
        </View>
        <LocationButton onPress={console.log()} />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
