import React from 'react';
import { Text } from 'react-native';

const TabIcon = React.createClass({
  getInitialState() { return { }; },
  render() {
    return (
      <Text style={{ color: this.props.selected ? 'red' : 'black' }}> {this.props.title} </Text>
    );
  },
});

module.exports = TabIcon;
