import React from 'react';
import { StyleSheet, View, Text, TextInput, Item, Image, Switch, Picker } from 'react-native';
import Button from "react-native-button";
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "transparent",
    paddingHorizontal: 14,
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
  picker: {
    alignSelf: "stretch",
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
    };
  },

  componentDidMount() {

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
                onValueChange={ (value) => this.setState({ unableToSolve: value }) }
                value = { this.state.unableToSolve }
            />
          </View>
          <Button onPress={ Actions.pop }>Complete Mission</Button>
        </View>
      );
    } else {
      return (
        <View style = { [styles.container] }>
          <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
          <View style={ [styles.containerMission] }>
            <Image source = {require('../../assets/img/poi_name_mission.png') } />
            <Text style = { [styles.text] }>Get the { this.state.koins } Koins!</Text>
          </View>
          <View style={ [styles.containerMission] }>
            <Image source = {require('../../assets/img/poi_name_mission.png') } />
            <Text style = { [styles.text] }>{ this.state.mission } ?</Text>
          </View>
          <View style={ [styles.containerSolve] }>
            <Text style = { [styles.text] }>{ this.state.txtUnableToSolve }</Text>
            <Switch
                onValueChange={ (value) => this.setState({ unableToSolve: value }) }
                value = { this.state.unableToSolve }
            />
          </View>
          <TextInput
            autoCapitalize="words"
          />
          <Picker
            style = { styles.picker }
            selectedValue = { this.state.selected }
            onValueChange = { this.onValueChange.bind(this, 'selected') }>
            <Item label = "hello" value = "key0" />
            <Item label = "world" value = "key1" />
          </Picker>
          <Button onPress={ Actions.pop }>Complete Mission</Button>
        </View>
      );
    }

  },
});

module.exports = MissionsModal;
