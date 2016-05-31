import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal } from 'react-native';
import CustomButton from '../shared/CustomButton';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 14,
  },
});

const BadgeWonModal = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  render() {
    return (
      <View style = { styles.container }>

      </View>
    );
  },
});

module.exports = BadgeWonModal;
