import React from 'react';
import { View, Text, Image, StyleSheet, ListView, TouchableHighlight, RecyclerViewBackedScrollView, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const HighscoreTab = React.createClass({
  getInitialState() { return { }; },
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Tab {this.props.title} </Text>
      </View>
    );
  },
});

HighscoreTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = HighscoreTab;
