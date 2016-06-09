  import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AuthenticationActions from '../../actions/AuthenticationActions';
import UserActions from '../../actions/UserActions';

import authenticationStore from '../../stores/AuthenticationStore';
import userStore from '../../stores/UserStore';

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 46,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerProfileDescription: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  containerKoins: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerKoinsDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textSubTitle: {
    fontSize: 18,
    marginTop: 7,
    width: 200,
  },
  textSubTitleItem: {
    fontSize: 18,
    marginTop: 7,
    width: 240,
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
});

const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    isViewOnly: React.PropTypes.bool,
    isOwnProfile: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      user: null,
      isViewOnly: true,
      isOwnProfile: true,
    };
  },

  getInitialState() {
    return { user: null };
  },

  componentDidMount() {
    authenticationStore.addChangeListener(this._onAuthenticationUpdate);
    userStore.addChangeListener(this._onUserUpdate);

    this._updateUser();
  },

  componentWillUnmount() {
    userStore.removeChangeListener(this._onUserUpdate);
  },

  _onAuthenticationUpdate() {
    if (!authenticationStore.isLoggedIn()) Actions.login();
  },

  _updateUser() {
    if (this.props.user !== null) {
      this.setState({ user: this.props.user });
    } else if (this.props.isOwnProfile) {
      if (userStore.getOwnUser() === null) {
        UserActions.loadOwnUser();
      } else {
        const user = userStore.getOwnUser();
        this.setState({ user });
      }
    }
  },

  _onUserUpdate() {
    this._updateUser();
  },

  render() {
    let name, userName, oauthProvider, solveCount, collectedKoins, ranking; // eslint-disable-line one-var, max-len
    if (this.state.user === null) {
      name = '';
      userName = '';
      oauthProvider = '';
      solveCount = '';
      collectedKoins = '';
      ranking = '';
    } else {
      name = (this.state.user.name === null) ? '' : this.state.user.name;
      userName = this.state.user.userName;
      oauthProvider = (this.state.user.oauthProvider === null) ? '' : this.state.user.oauthProvider;
      solveCount = this.state.user.solveCount;
      collectedKoins = this.state.user.koinCount;
      ranking = this.state.user.ranking;
    }

    let logoutButton, editUserButton; // eslint-disable-line one-var
    if (this.props.isViewOnly) {
      logoutButton = null;
    } else {
      logoutButton = <Text onPress={() => AuthenticationActions.logOutUser()}>Log out</Text>;
    }

    let nameInfo, oauthProviderInfo; // eslint-disable-line one-var
    if (this.props.isOwnProfile) {
      nameInfo = (
        <View>
          <Text style={styles.textSubTitle}>Name</Text>
          <Text style={styles.textSubTitle}>{name}</Text>
        </View>
      );
      oauthProviderInfo = (
        <View>
          <Text style={styles.textSubTitle}>Login via</Text>
          <Text style={styles.textSubTitle}>{oauthProvider}</Text>
        </View>
      );
    } else {
      nameInfo = null;
      oauthProvider = null;
    }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.containerProfile}>
              <Image
                style={{ width: 64, height: 64, padding: 64 }}
                source={{ uri: this.state.picUrl }}
              />
              <View style={styles.containerProfileDescription}>
                {nameInfo}
                <Text style={styles.textSubTitle}>Username</Text>
                <Text style={styles.textSubTitle}>{userName}</Text>
                {oauthProviderInfo}
                {logoutButton}
                <Text style={styles.textSubTitle}>Completed Missions</Text>
                <Text style={styles.textSubTitle}>{solveCount}</Text>
              </View>
            </View>
            <Text style={styles.textSubTitle}>Collected Koins</Text>
            <View style={styles.containerKoins}>
              <View style={styles.containerKoinsDescription}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/koin_no_value.png')}
                />
                <Text style={styles.textSubTitle}>{collectedKoins} Koins</Text>
              </View>
              <View style={styles.containerKoinsDescription}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/highscore.png')}
                />
                <Text style={styles.textSubTitle}>{ranking}. Place</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  },
});

module.exports = Profile;
