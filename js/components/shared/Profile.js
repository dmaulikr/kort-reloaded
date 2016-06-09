import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AuthenticationActions from '../../actions/AuthenticationActions';
import UserActions from '../../actions/UserActions';

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
  containerBadges: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  containerBadgeGrid: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerBadgeGridItem: {
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
    return {
      user: null,
      userBadges: [{ title: 'title', description: 'description',
        won: false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' },
        { title: 'title', description: 'description', won:
          false, pictureFile: '../../assets/img/locked.png' }],
    };
  },

  componentDidMount() {
    userStore.addChangeListener(this._onUserUpdate);

    this._updateUser();
  },

  componentWillUnmount() {
    userStore.removeChangeListener(this._onUserUpdate);
  },

  _onLogout() {
    Actions.login();
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
    let name, oauthProvider, solveCount, collectedKoins, ranking; // eslint-disable-line one-var
    if (this.state.user === null) {
      name = '';
      oauthProvider = '';
      solveCount = '';
      collectedKoins = '';
      ranking = '';
    } else {
      name = this.state.user.name;
      oauthProvider = this.state.user.oauthProvider;
      solveCount = this.state.user.solveCount;
      collectedKoins = this.state.user.koinCount;
      ranking = this.state.user.ranking;
    }

    let logoutButton, editUserButton; // eslint-disable-line one-var
    if (this.props.isViewOnly === false) {
      logoutButton = <Text onPress={() => AuthenticationActions.logOutUser()}>Log out</Text>;
    } else {
      logoutButton = null;
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
                <Text style={styles.textSubTitle}>Username</Text>
                <Text style={styles.textSubTitle}>{name}</Text>
                <Text style={styles.textSubTitle}>Login via</Text>
                <Text style={styles.textSubTitle}>{oauthProvider}</Text>
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
          <View style={styles.containerBadges}>
            <Text style={styles.textSubTitle}>Won Badges</Text>
            <View style={styles.containerBadgeGrid}>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[0].title}: {this.state.userBadges[0].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[1].title}: {this.state.userBadges[1].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[2].title}: {this.state.userBadges[2].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[3].title}: {this.state.userBadges[3].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[4].title}: {this.state.userBadges[4].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[5].title}: {this.state.userBadges[5].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[6].title}: {this.state.userBadges[6].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[7].title}: {this.state.userBadges[7].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[8].title}: {this.state.userBadges[8].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[9].title}: {this.state.userBadges[9].description}
                </Text>
              </View>
              <View style={styles.containerBadgeGridItem}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/poi_name_mission.png')}
                />
                <Text style={styles.textSubTitleItem}>
                  {this.state.userBadges[10].title}: {this.state.userBadges[10].description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  },
});

module.exports = Profile;
