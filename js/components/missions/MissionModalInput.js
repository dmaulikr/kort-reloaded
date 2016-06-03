import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Item,
  Text,
  Switch,
  Picker } from 'react-native';
import Config from '../../constants/Config';
import answerStore from '../../stores/AnswerStore';
import AnswerActions from '../../actions/AnswerActions';

const styles = StyleSheet.create({
  containerSolve: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
  },
  textInput: {
    height: 45,
    marginTop: 10,
  },
  picker: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

const select = Config.SELECT;
const text = Config.TEXT;

const MissionModalInput = React.createClass({

  getInitialState() {
    return {
      unableToSolve: this.props.unableToSolve,
      txtUnableToSolve: 'Unable to solve',
      viewType: this.props.viewType,
      selected: 'key0',
      selectableAnswers: null,
      answer: '',
    };
  },

  componentDidMount() {
    if (this.props.viewType === select) {
      answerStore.addChangeListener(this._getAnswerSelection);

      this._getAnswerSelection();
    }
  },

  componentWillUnmount() {
    if (this.props.viewType === select) {
      answerStore.removeChangeListener(this._getAnswerSelection);
    }
  },

  /*
  * Picker
  */
  onValueChange(key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);

    for (let answer of answerStore.getAnswersForType(this.props.missionType)) {
      if (answer.id === value) {
        this.setState({ answer: answer.title });
      }
    }
  },

  _getAnswerSelection() {
    const answers = answerStore.getAnswersForType(this.props.missionType);

    if (answers) this.setState({ selectableAnswers: answers });
  },

  render() {
    console.log(this.props.selectableAnswers);

    let inputField;

    if (this.state.unableToSolve) {
      inputField = (
        <View />
      );
    } else {
      switch (this.props.viewType) {
        case select:
          const selectableTypeAnswers = [];
          for (let answer of answerStore.getAnswersForType(this.props.missionType)) {
            selectableTypeAnswers.push(<Item label = { answer.title } value = { answer.id } />);
          }
          inputField = (
            <Picker
              style = { styles.picker }
              selectedValue = { this.state.selected }
              onValueChange = { this.onValueChange.bind(this, 'selected') }
            >
              { selectableTypeAnswers }
            </Picker>
          );
          break;
        case text:
          inputField = (
            <TextInput
              style = { styles.textInput }
              autoCapitalize = "words"
              placeholder = "Mission type"
              onChangeText = { (answer) => this.setState({ answer }) }
              value = { this.state.answer }
            />
          );
          break;
        default:
          inputField = (
            <View />
          );
          break;
      }
    }

    return (
      <View>
        <View style = { styles.containerSolve }>
          <Text style = { styles.text }>{ this.state.txtUnableToSolve }</Text>
          <Switch
            onValueChange = { (value) => this.setState({ unableToSolve: value, answer: '' }) }
            value = { this.state.unableToSolve }
          />
        </View>
        <View>
          { inputField }
        </View>
      </View>
    );
  },
});

module.exports = MissionModalInput;
