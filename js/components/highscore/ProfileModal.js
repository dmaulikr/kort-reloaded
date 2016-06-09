import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Profile from '../shared/Profile';


const ProfileModal = React.createClass({
  render() {
    return (
      <Profile user={this.props.user} />
    );
  },
});

module.exports = ProfileModal;
