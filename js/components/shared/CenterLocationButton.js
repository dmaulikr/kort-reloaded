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
    top: 15 + 45,
    right: 16,
    overflow: 'hidden',
  },
  icon: {
    width: 35,
    height: 35,
  },
});


const CenterLocationButton = React.createClass({
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
        underlayColor = {colorStyle}
      >
        <Image style = { styles.icon }
          source = { require('../../assets/location/ic_my_location.png') }
        />
      </TouchableHighlight>
    );
  },
});

module.exports = CenterLocationButton;
