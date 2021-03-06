import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import SolveTaskInput from './SolveTaskInput';
import Button from '../shared/Button';
import TaskMap from './TaskMap';

import MissionActions from '../../actions/MissionActions';
import ValidationActions from '../../actions/ValidationActions';

import Mission from '../../dto/Mission';
import Validation from '../../dto/Validation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTask: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  containerMap: {
    flex: 1,
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
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
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
    Actions.pop();
    MissionActions.solveMission(this.props.task, input.answerValue, input.unableToSolve);
  },

  solveValidation() {
    const validation = this.props.task;
    const input = this.refs.input.state;
    const missionUnsolvable = validation.unsolvable;
    const userUnsolvable = input.unableToSolve;
    const missionAnswer = validation.fixMessage;
    const userAnswer = input.answerValue;

    let valid;
    if (missionUnsolvable === userUnsolvable) {
      if (missionUnsolvable) {
        valid = true;
      } else {
        valid = missionAnswer === userAnswer;
      }
    } else {
      valid = false;
    }

    Actions.pop();
    ValidationActions.solveValidation(validation, valid);
  },

  solveTask() {
    if (this.props.task instanceof Mission) {
      this.solveMission();
    } else if (this.props.task instanceof Validation) {
      this.solveValidation();
    }
  },

  render() {
    const annotationImages = {
      language_unknown_mission: require('image!language_unknown_mission'),
      missing_cuisine_mission: require('image!missing_cuisine_mission'),
      missing_maxspeed_mission: require('image!missing_maxspeed_mission'),
      motorway_ref_mission: require('image!motorway_ref_mission'),
      poi_name_mission: require('image!poi_name_mission'),
      religion_mission: require('image!religion_mission'),
      type_of_track_unknown_mission: require('image!type_of_track_unknown_mission'),
      undefined_mission: require('image!undefined_mission'),
    };
    const annotationImage = annotationImages[this.props.task.annotationImage];

    return (
      <View style={styles.container}>
        <View style={styles.containerMap}>
          <TaskMap
            ref="map"
            task={this.props.task}
          />
        </View>
        <View style={styles.containerTask}>
          <Text style={styles.textTitle}>{this.props.task.title}</Text>
          <View style={styles.containerMission}>
            <View style={styles.containerMissionDescription}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/koin_no_value.png')}
              />
              <Text style ={styles.textMission}>
                {I18n.t('fix_form_koins_earn', { fix_koin_count: this.props.task.fixKoinCount })}
              </Text>
            </View>
            <View style={styles.containerMissionDescription}>
              <Image
                style={styles.icon}
                source={annotationImage}
              />
              <Text style={styles.textMission}>
                {this.props.task.question}
              </Text>
            </View>
          </View>
          <SolveTaskInput
            ref="input"
            viewType={this.props.task.viewType}
            missionType={this.props.task.type}
            unableToSolve={this.state.unableToSolve}
          />
          <View style={styles.containerButton}>
            <View style={ { flex: 1, padding: 5 } }>
              <Button onPress={Actions.pop}>{I18n.t('messagebox_cancel')}</Button>
            </View>
            <View style={ { flex: 1, padding: 5 } }>
              <Button onPress={this.solveTask}>{I18n.t('fix_form_button_submit')}</Button>
            </View>
          </View>
        </View>
      </View>
    );
  },
});

module.exports = SolveTaskModal;
