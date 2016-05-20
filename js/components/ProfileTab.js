import React, { View, Text, StyleSheet } from 'react-native';
import userStore from '../stores/userStore';
import UserActions from '../actions/UserActions';

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


const ProfileTab = React.createClass({
  getInitialState() {
    return {
      user: userStore.getUserInfo(),
    };
  },
  componentWillMount() {

  },
  componentDidMount() {
    userStore.addChangeListener(this.onChange);
    UserActions.getUser();
  },
  componentWillUnmount() {
    userStore.removeChangeListener(this.onChange);
  },
  onChange() {
    this.updateProfileText(userStore.getUserInfo());
  },
  updateProfileText(user) {
    this.setState({ user: user });
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>Your id is: {this.state.user.id}</Text>
      </View>
    );
  },
});

ProfileTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = ProfileTab;
