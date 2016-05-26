import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
});


const CustomButton = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({ active: true });
  },

  _onUnhighlight() {
    this.setState({ active: false });
  },

  render() {
    let colorStyle = { // eslint-disable-line prefer-const
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay = { this._onUnhighlight }
        onPress = { this.props.onPress }
        onShowUnderlay = { this._onHighlight }
        style = { [styles.button, this.props.style] }
        underlayColor="#a9d9d4"
      >
          <Text style = { [styles.buttonText, colorStyle] }>{ this.props.children }</Text>
      </TouchableHighlight>
    );
  },
});

module.exports = CustomButton;
