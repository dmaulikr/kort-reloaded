import React from 'react';
import {
  StyleSheet,
  TextInput,
  Item,
  Picker } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    marginTop: 10,
  },
  picker: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

const MissionModalInput = React.createClass({
  propTypes() {
    inputType: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    return {
      unableToSolve: false,
      selected: 'key0',
      answer: ' ',
    };
  },

  /*
  * Picker
  */
  onValueChange(key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  },

  render() {
    let inputField;
    if (this.state.unableToSolve) inputField = null;
    switch (this.props.inputType) {
      case: 'select':
        inputField = (
          <Picker
            style = { styles.picker }
            selectedValue = { this.state.selected }
            onValueChange = { this.onValueChange.bind(this, 'selected') }
          >
            <Item label = 'hello' value = 'key0' />
            <Item label = 'world' value = 'key1' />
          </Picker>
        );
        break;
      case: 'input':
        inputField = (
          <TextInput
            style = { styles.textInput }
            autoCapitalize = 'words'
            placeholder = 'Mission type'
            onChangeText = { (answer) => this.setState({ answer }) }
            value = { this.state.answer }
          />
        );
        break;
      default:
        inputField = null;
        return;
    }
    return (
      { inputField }
    );
  }
});
