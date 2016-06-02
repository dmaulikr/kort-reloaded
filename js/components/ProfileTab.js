import React, { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LoginActions from '../actions/LoginActions';
import loginStore from '../stores/LoginStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


const ProfileTab = React.createClass({
  componentDidMount() {
    loginStore.addChangeListener(this.onLogout);
  },

  onLogout() {
    Actions.login();
  },

  render() {
    const userId = loginStore.getUserCredential().userId;
    console.log(userId);
    return (
      <View style={styles.container}>
        <Text onClick={() => LoginActions.logOutUser(userId)}>Log out</Text>
      </View>
    );
  },
});

ProfileTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = ProfileTab;
