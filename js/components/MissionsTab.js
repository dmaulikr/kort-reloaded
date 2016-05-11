import React, {
  StyleSheet,
  View,
} from 'react-native';
import Map from './Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  },
});

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
