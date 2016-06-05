import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15 + 45,
    left: 15,
    overflow: 'hidden',
  },
  icon: {
    width: 35,
    height: 35,
  },
});


const LocationButton = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  },

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
    const colorStyle = { color: this.state.active ? '#fff' : '#000' };

    return (
      <TouchableHighlight
        onHideUnderlay = {this._onUnhighlight}
        onPress = {this.props.onPress}
        onShowUnderlay = {this._onHighlight}
        style = {[styles.button, this.props.style]}
        underlayColor="#008000"
      >
        <Image style = { styles.icon }
          source = { require('../../assets/img/ic_my_location.png') }
        />
      </TouchableHighlight>
    );
  },
});

module.exports = LocationButton;
