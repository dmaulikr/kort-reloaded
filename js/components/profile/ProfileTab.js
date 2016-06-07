import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import AuthenticationActions from '../../actions/AuthenticationActions';

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

const ProfileTab = React.createClass({
  getInitialState() {
    return {
      userName: '',
      solveCount: 0,
      koinCount: 0,
      picUrl: '',
      authProvider: '',
      place: '',
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
    authenticationStore.addChangeListener(this.onLogout);

    userStore.addChangeListener(this._onUserUpdate);
  },

  componentWillUnmount() {
    userStore.removeChangeListener(this._onUserUpdate);
  },

  onLogout() {
    Actions.login();
  },

  _onUserUpdate() {
    const user = userStore.getUser();

    this.setState({
      userName: user.userName,
      solveCount: user.solveCount,
      koinCount: user.koinCount,
      picUrl: user.picUrl,
      authProvider: user.authProvider,
    });

    this._onUserBadgesUpdate();
  },

  _onUserBadgesUpdate() {
  },

  render() {
    const userId = authenticationStore.getUserCredential().userId;
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
                <Text style={styles.textSubTitle}>{this.state.userName}</Text>
                <Text style={styles.textSubTitle}>Login via</Text>
                <Text style={styles.textSubTitle}>{this.state.authProvider}</Text>
                <Text onPress={() => AuthenticationActions.logOutUser(userId)}>Log out</Text>
                <Text style={styles.textSubTitle}>Completed Missions</Text>
                <Text style={styles.textSubTitle}>{this.state.solveCount}</Text>
              </View>
            </View>
            <Text style={styles.textSubTitle}>Collected Koins</Text>
            <View style={styles.containerKoins}>
              <View style={styles.containerKoinsDescription}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/koin_no_value.png')}
                />
                <Text style={styles.textSubTitle}>{this.state.koinCount} Koins</Text>
              </View>
              <View style={styles.containerKoinsDescription}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/highscore.png')}
                />
                <Text style={styles.textSubTitle}>{this.state.place}. Place</Text>
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

ProfileTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = ProfileTab;
