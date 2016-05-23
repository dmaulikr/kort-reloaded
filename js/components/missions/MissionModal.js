import React from 'react';
import { StyleSheet, View, Text, TextInput, Item, Image, Switch, Picker, Modal } from 'react-native';
import Button from "react-native-button";
import CustomButton from '../ui-components/CustomButton';
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  textTitle: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 7,
  },
  text: {
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 14,
  },
  containerMissionComplete: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  containerSolve: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 7,
  },
  containerMission: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 7,
  },
  containerInput: {
  },
  containerPicker: {
  },
  textEdit: {
    height: 45,
    marginTop: 10,
    backgroundColor: "#ffff",
  },
  picker: {
    flex: 1,
    justifyContent: "flex-start",
  },
  containerButton: {

    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

const MissionsModal = React.createClass({
  getInitialState() {
    return {
      title: '',
      koins: 0,
      mission: '',
      txtUnableToSolve: 'Unable to solve',
      unableToSolve: false,
      answer: '',
      selected: 'key',
      btnCompleteMission: '',
      view: '',
      modalVisible: false,
    };
  },

  componentDidMount() {

  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  onValueChange (key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  },

  render() {
    if (this.state.unableToSolve) {
      return (
        <View style = { [styles.container] }>
          <Modal
            animationType={false}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}
          >
            <View style={[styles.containerMissionComplete, 'rgba(0, 0, 0, 0.5)']}>
              <View style={[styles.innerContainer, { backgroundColor: '#fff', padding: 20 }]}>
                <Text>Mission completed.</Text>
                <CustomButton
                  onPress={this._setModalVisible.bind(this, false)}
                  style={styles.modalButton}>
                  Close
                </CustomButton>
              </View>
            </View>
          </Modal>
          <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
          <View style={ [styles.containerMission] }>
            <Image source = {require('../../assets/img/poi_name_mission.png') } />
            <Text style = { [styles.text] }>Get the { this.state.koins } Koins!</Text>
          </View>
          <View style={ [styles.containerMission] }>
            <Image source = {require('../../assets/img/poi_name_mission.png') } />
            <Text style = { [styles.text] }>{ this.state.mission } ?</Text>
          </View>
          <View style = { [styles.containerSolve] }>
            <Text style = { [styles.text] }>{ this.state.txtUnableToSolve }</Text>
            <Switch
                onValueChange = { (value) => this.setState({ unableToSolve: value }) }
                value = { this.state.unableToSolve }
            />
          </View>
          <Button style = { { paddingTop: 20 } } onPress = { Actions.pop }>Complete Mission</Button>
          <CustomButton style = { { paddingTop: 20 } } onPress={this._setModalVisible.bind(this, true)}>
            Complete Mission
          </CustomButton>
        </View>
      );
    } else {
      if (true) {
        return (
          <View style = { [styles.container] }>
            <Modal
              animationType={false}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}
            >
              <View style={[styles.containerMissionComplete, 'rgba(0, 0, 0, 0.5)']}>
                <View style={[styles.innerContainer, { backgroundColor: '#fff', padding: 20 }]}>
                  <Text>Mission completed.</Text>
                  <CustomButton
                    onPress={this._setModalVisible.bind(this, false)}
                    style={styles.modalButton}>
                    Close
                  </CustomButton>
                </View>
              </View>
            </Modal>
            <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
            <View style = { [styles.containerMission] }>
              <Image source = {require('../../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.text] }>Get the { this.state.koins } Koins!</Text>
            </View>
            <View style = { [styles.containerMission] }>
              <Image source = {require('../../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.text] }>{ this.state.mission } ?</Text>
            </View>
            <View style = { [styles.containerSolve] }>
              <Text style = { [styles.text] }>{ this.state.txtUnableToSolve }</Text>
              <Switch
                  onValueChange = { (value) => this.setState({ unableToSolve: value }) }
                  value = { this.state.unableToSolve }
              />
            </View>
            <View style = { [styles.containerInput] }>
              <TextInput
                style = { [styles.textEdit] }
                autoCapitalize = "words"
                placeholder="Mission type"
                onChangeText = {(answer) => this.setState({ answer })}
                value = { this.state.answer }
              />
            </View>
            <View style = { [styles.containerButton] }>
              <Button style = { { marginTop: 10 } } onPress = { Actions.pop }>Complete Mission</Button>
              <CustomButton style = { { paddingTop: 20 } } onPress={this._setModalVisible.bind(this, true)}>
                Complete Mission
              </CustomButton>
            </View>
          </View>
        );
      } else {
        return (
          <View style = { [styles.container] }>
            <Modal
              animationType={false}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}
            >
              <View style={[styles.containerMissionComplete, 'rgba(0, 0, 0, 0.5)']}>
                <View style={[styles.innerContainer, { backgroundColor: '#fff', padding: 20 }]}>
                  <Text>Mission completed.</Text>
                  <CustomButton
                    onPress={this._setModalVisible.bind(this, false)}
                    style={styles.modalButton}>
                    Close
                  </CustomButton>
                </View>
              </View>
            </Modal>
            <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
            <View style = { [styles.containerMission] }>
              <Image source = {require('../../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.text] }>Get the { this.state.koins } Koins!</Text>
            </View>
            <View style = { [styles.containerMission] }>
              <Image source = {require('../../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.text] }>{ this.state.mission } ?</Text>
            </View>
            <View style = { [styles.containerSolve] }>
              <Text style = { [styles.text] }>{ this.state.txtUnableToSolve }</Text>
              <Switch
                  onValueChange = { (value) => this.setState({ unableToSolve: value }) }
                  value = { this.state.unableToSolve }
              />
            </View>
            <View style = { [styles.containerPicker] }>
              <Picker
                style = { styles.picker }
                selectedValue = { this.state.selected }
                onValueChange = { this.onValueChange.bind(this, 'selected') }>
                <Item label = "hello" value = "key0" />
                <Item label = "world" value = "key1" />
              </Picker>
            </View>
            <View style = { [styles.containerButton] }>
              <Button onPress = { Actions.pop }>Complete Mission</Button>
              <CustomButton style = { { paddingTop: 20 } } onPress={this._setModalVisible.bind(this, true)}>
                Complete Mission
              </CustomButton>
            </View>
          </View>
        );
      }
    }
  },
});

module.exports = MissionsModal;
