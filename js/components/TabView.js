import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


const AboutTab = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <View style={ [styles.container, this.props.sceneStyle] }>
        <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
      </View>
    );
  },
});

AboutTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = AboutTab;
