import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Item,
  Text,
  Switch,
  Picker } from 'react-native';

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

const MissionModalInput = React.createClass({

  getInitialState() {
    return {
      unableToSolve: this.props.unableToSolve,
      txtUnableToSolve: 'Unable to solve',
      viewType: this.props.viewType,
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

    if (this.state.unableToSolve) {
      inputField = (
        <View />
      );
    } else {
      switch (this.state.viewType) {
        case 'select':
          inputField = (
            <Picker
              style = { styles.picker }
              selectedValue = { this.state.selected }
              onValueChange = { this.onValueChange.bind(this, 'selected') }
            >
              <Item label = "hello" value = "key0" />
              <Item label = "world" value = "key1" />
            </Picker>
          );
          break;
        case 'text':
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
            onValueChange = { (value) => this.setState({ unableToSolve: value }) }
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
