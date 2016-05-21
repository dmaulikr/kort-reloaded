import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from "react-native-button";
import Map from './missions/Map';
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  getInitialState() { return { }; },
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={()=>Actions.missionModal({data:"Custom data", title:"Custom title" })}>Open Mission Modal</Button>
        <Map />
      </View>
    );
  },
});

// const MissionsTab = function () {
//   return (
//     <View style={styles.container}>
//       <Button onPress={()=>Actions.missionModal({data:"Custom data", title:"Custom title" })}>Open Mission Modal</Button>
//       <Map />
//     </View>
//   );
// };

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
