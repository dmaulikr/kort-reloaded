import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SolveTaskInput from './SolveTaskInput';
import Button from '../shared/Button';

import MissionActions from '../../actions/MissionActions';
import ValidationActions from '../../actions/ValidationActions';

import Mission from '../../dto/Mission';
import Validation from '../../dto/Validation';

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

const SolveTaskModal = React.createClass({
  propTypes: {
    task: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    return {
      userKoins: 0,
      txtUnableToSolve: 'Unable to solve',
      unableToSolve: false,
      btnCompleteMission: '',
      modalVisible: false,
    };
  },

  solveMission() {
    const input = this.refs.input.state;
    MissionActions.solveMission(this.props.task, input.answerValue, input.unableToSolve);
    Actions.pop();
  },

  solveValidation() {
    const validation = this.props.task;
    const input = this.refs.input.state;
    const missionUnsolvable = validation.unsolvable;
    const userUnsolvable = input.unableToSolve
    const missionAnswer = validation.fixMessage;
    const userAnswer = input.answerValue;

    let valid;
    if (missionUnsolvable === userUnsolvable) {
      if (missionUnsolvable) {
        valid = true;
      } else {
        const valid = missionAnswer === userAnswer;
      }
    } else {
      valid = false;
    }

    ValidationActions.solveValidation(validation, valid);
    Actions.pop();
  },

  solveTask() {
    if (this.props.task instanceof Mission) {
      this.solveMission();
    } else if (this.props.task instanceof Validation) {
      this.solveValidation();
    }
  },

  render() {
    console.log('ADLER', 'fixMessage', this.props.task.fixMessage);
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>{this.props.task.title}</Text>
        <View style={styles.containerMission}>
          <View style={styles.containerMissionDescription}>
            <Image
              style={styles.icon}
              source={require('../../assets/img/koin_no_value.png')}
            />
            <Text style ={styles.textMission}>Get the {this.props.task.fixKoinCount} Koins!</Text>
          </View>
          <View style={styles.containerMissionDescription}>
            <Image
              style={styles.icon}
              source={require('../../assets/img/poi_name_mission.png')}
            />
          <Text style={styles.textMission}>{this.props.task.question}</Text>
          </View>
        </View>
        <SolveTaskInput
          ref="input"
          viewType={this.props.task.viewType}
          missionType={this.props.task.type}
          unableToSolve={this.state.unableToSolve}
        />
        <View style={styles.containerButton}>
          <Button onPress={Actions.pop}>
            Cancel
          </Button>
          <Button onPress={this.solveTask}>
            Complete Mission
          </Button>
        </View>
      </View>
    );
  },
});

module.exports = SolveTaskModal;
