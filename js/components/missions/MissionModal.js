import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal } from 'react-native';
import CustomButton from '../shared/CustomButton';
import { Actions } from 'react-native-router-flux';
import MissionModalInput from './MissionModalInput';
import CompletedMissionModal from './CompletedMissionModal';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 14,
  },
  containerMissionComplete: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  containerMission: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerMissionDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
  textMission: {
    alignSelf: 'center',
    marginTop: 5,
    width: 200,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  innerContainerMissionCompleted: {
    flexDirection: 'row',
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

const MissionsModal = React.createClass({
  getInitialState() { // this.props.data....
    return {
      type: this.props.data.type,
      title: this.props.data.title,
      question: this.props.data.question,
      viewType: this.props.data.viewType,
      fixKoinCount: this.props.data.fixKoinCount,
      userKoins: 0,
      txtUnableToSolve: 'Unable to solve',
      unableToSolve: false,
      answer: '',
      btnCompleteMission: '',
      modalVisible: false,
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  render() {
    return (
      <View style = { styles.container }>
        <Text style = { styles.textTitle }>{ this.state.title }</Text>
        <View style = { styles.containerMission }>
          <View style = { styles.containerMissionDescription }>
            <Image
              style = { styles.icon }
              source = { require('../../assets/img/koin_no_value.png') }
            />
            <Text style = { styles.textMission }>Get the { this.state.fixKoinCount } Koins!</Text>
          </View>
          <View style = { styles.containerMissionDescription }>
            <Image
              style = { styles.icon }
              source = { require('../../assets/img/poi_name_mission.png') }
            />
          <Text style = { styles.textMission }>{ this.state.question }</Text>
          </View>
        </View>
        <MissionModalInput
          viewType = { this.state.viewType }
          unableToSolve = { this.state.unableToSolve }
        />
        <View style = { styles.containerButton }>
          <CustomButton style = { { paddingTop: 20 } } onPress = { Actions.pop }>
            Cancel
          </CustomButton>
          <CustomButton
            style = { { paddingTop: 20 } }
            onPress = { Actions.pop }
          >
            Complete Mission
          </CustomButton>
        </View>
      </View>
    );
  },
});

module.exports = MissionsModal;
