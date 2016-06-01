import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import Map from './missions/Map';
import { Actions } from 'react-native-router-flux';
import CompletedMissionModal from './missions/CompletedMissionModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MissionsTab = React.createClass({
  getInitialState() {
    return {
      modalVisible: true,
    };
  },

  /*
  * Modal for mission completion
  */
  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  },

  render() {
    return (
      <View style = { styles.container }>
        <Modal
          animationType = { false }
          transparent
          visible = { this.state.modalVisible }
          onRequestClose = { () => { this._setModalVisible(false); } }
        >
          <CompletedMissionModal />
        </Modal>
        <Map />
      </View>
    );
  },
});

// const MissionsTab = function () {
//   return (
//     <View style={styles.container}>
//       <Button
//         onPress = { ()=>Actions.missionModal({ data:'Custom data', title:'Custom title' }) }
//       >
//         Open Mission Modal
//       </Button>
//       <Map />
//     </View>
//   );
// };

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
