import React from 'react';
import { StyleSheet, View, Text, TextInput, Item, Image, Switch, Picker } from 'react-native';
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
    default: {
      height: 26,
      borderWidth: 0.5,
      borderColor: '#0f0f0f',
      flex: 1,
      fontSize: 13,
      padding: 4,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "transparent",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    picker: {
      width: 200,
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
    };
  },

  onValueChange (key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  },

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={{ marginTop: 20 }}>{ this.props.title }</Text>
        <Image source={require('../../assets/img/koin_no_value.png')} />
        <Text style={{ marginBottom: 20 }}>Get the { this.state.koins } Koins!</Text>
        <Image source={require('../../assets/img/poi_name_mission.png')} />
        <Text style={{ marginBottom: 20 }}>{ this.state.mission } ?</Text>
        <Text style={{ marginBottom: 20 }}>{ this.state.txtUnableToSolve }</Text>
        <Switch
            onValueChange={(value) => this.setState({unableToSolve: value})}
            style={{marginBottom: 10}}
            value={this.state.unableToSolve}
        />
        <TextInput
          autoCapitalize="words"
          style={styles.default}
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this, 'selected')}>
          <Item label="hello" value="key0" />
          <Item label="world" value="key1" />
        </Picker>
        <Button onPress={Actions.pop}>Complete Mission</Button>
      </View>
    );
  },
});

module.exports = MissionsModal;
