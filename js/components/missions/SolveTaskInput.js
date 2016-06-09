import React from 'react';
import { StyleSheet, View, TextInput, Text, Switch, Picker } from 'react-native';

import Config from '../../constants/Config';

import answerStore from '../../stores/AnswerStore';

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
const Item = Picker.Item;

const SolveTaskInput = React.createClass({
  propTypes: {
    missionType: React.PropTypes.any.isRequired,
    viewType: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    return {
      unableToSolve: false,
      selectableAnswers: null,
      answerValue: null,
    };
  },

  componentWillMount() {
    if (this.props.viewType === select) {
      answerStore.addChangeListener(this._onAnswersChange);
      this._updateSelectableAnswers();
    }
  },

  componentWillUnmount() {
    if (this.props.viewType === select) {
      answerStore.removeChangeListener(this._onAnswersChange);
    }
  },

  _updateSelectableAnswers() {
    const answers = answerStore.getAnswersForType(this.props.missionType);
    this.setState({ selectableAnswers: answers });
    if (answers !== null) this.setState({ answerValue: answers[0].value });
  },

  _onAnswersChange() {
    this._updateSelectableAnswers();
  },

  _renderPickerInputField() {
    const answerItems = [];

    if (this.state.selectableAnswers !== null) {
      for (const answer of this.state.selectableAnswers) {
        answerItems.push(<Item key={answer.id} label={answer.title} value={answer.value} />);
      }
    }

    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.answerValue}
        onValueChange={(answer) => this.setState({ answerValue: answer })}
      >
        {answerItems}
      </Picker>
    );
  },

  _renderTextInputField() {
    return (
      <TextInput
        style={styles.textInput}
        autoCapitalize="words"
        onChangeText={(answer) => this.setState({ answerValue: answer })}
        value={this.state.answerValue}
      />
    );
  },

  _renderInputField() {
    const emptyInputField = <View />;

    if (this.state.unableToSolve) {
      this.state.answerValue = '-';
      return emptyInputField;
    }

    switch (this.props.viewType) {
      case select:
        return this._renderPickerInputField();
      case text:
        return this._renderTextInputField();
      default:
        return emptyInputField;
    }
  },

  render() {
    return (
      <View>
        <View style={styles.containerSolve}>
          <Text style={styles.text}>Unable to solve</Text>
          <Switch
            onValueChange={(value) => this.setState({ unableToSolve: value })}
            value={this.state.unableToSolve}
          />
        </View>
        <View>
          {this._renderInputField()}
        </View>
      </View>
    );
  },
});

module.exports = SolveTaskInput;
