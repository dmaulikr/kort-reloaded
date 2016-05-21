import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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
});

const MissionsModal = () => {
  return (
    <View style={[styles.container]}>
      <Text>Mission page: {this.props.data}</Text>
      <Button onPress={() => Actions.refresh({title:"Changed title"})}>Change title</Button>
      <Button onPress={Actions.pop}>Back</Button>
    </View>
  );
};

module.exports = MissionsModal;
