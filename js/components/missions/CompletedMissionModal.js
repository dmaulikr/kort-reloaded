import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal, } from 'react-native';
import CustomButton from '../shared/CustomButton';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  containerMissionComplete: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
});

const CompletedMissionModal = React.createClass({
  getInitialState() {
    return {
      modalVisible: this.props.modalVisible,
    };
  },

  componentWillMount() {
  },

  componentDidMount() {

  },

  /*
  * Modal for mission completion
  */
  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!this.state.modalVisible) {
      Actions.pop();
    }
  },

  render() {
    return (
      <View>
        <Modal
          animationType = { false }
          transparent = { true }
          visible = { this.state.modalVisible }
          onRequestClose = { () => { this._setModalVisible(false); } }
        >
          <View style = { styles.containerMissionComplete }>
            <View style = { [styles.innerContainer, { backgroundColor: '#fff', padding: 20 }] }>
              <Text>Mission completed.</Text>
              <CustomButton
                onPress = { this._setModalVisible.bind(this, false) }
                style = { styles.modalButton }
              >
                Close
              </CustomButton>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
});

module.exports = CompletedMissionModal;
