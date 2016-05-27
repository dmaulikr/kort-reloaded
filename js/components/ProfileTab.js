import React, { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 45,
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
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
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
      username: '',
      provider: '',
      completedMissions: 0,
      collectedKoins: 0,
      place: '',
    };
  },

  componentWillMount() {
    this._pressData = {};
  },
  componentDidMount() {
  },
  componentWillUnmount() {
  },
  onChange() {
  },
  updateProfileText(user) {
  },

  render() {
    let _scrollView = ScrollView;
    return (
      <ScrollView
        ref = { (scrollView) => { _scrollView = scrollView; } }
        automaticallyAdjustContentInsets = { false }
        onScroll = { () => { console.log('onScroll!'); } }
        scrollEventThrottle = { 200 }
        style = { styles.scrollView }
      >
        <View style = { styles.container }>
          <Text style = { styles.textTitle }>{ this.props.title }</Text>
          <View style = { styles.containerInfo }>
            <View style = { styles.containerProfile }>
              <Image source = { require('../assets/img/poi_name_mission.png') } />
              <View style = { styles.containerProfileDescription }>
                <Text style = { styles.textSubTitle }>Username</Text>
                <Text style = { styles.textSubTitle }>{ this.state.username } username</Text>
                <Text style = { styles.textSubTitle }>Login via</Text>
                <Text style = { styles.textSubTitle }>{ this.state.provider } provider </Text>
                <Text style = { styles.textSubTitle }>Completed Missions</Text>
                <Text style = { styles.textSubTitle }>{ this.state.completedMissions }</Text>
              </View>
            </View>
            <Text style = { styles.textSubTitle }>Collected Koins</Text>
            <View style = { styles.containerKoins }>
              <View style = { styles.containerKoinsDescription }>
                <Image
                  style = { styles.icon }
                  source = { require('../assets/img/koin_no_value.png') }
                />
                <Text style = { styles.textSubTitle }>{ this.state.collectedKoins } Koins</Text>
              </View>
              <View style = { styles.containerKoinsDescription }>
                <Image
                  style = { styles.icon }
                  source = { require('../assets/img/highscore.png') }
                />
                <Text style = { styles.textSubTitle }>{ this.state.place }. Place</Text>
              </View>
            </View>
          </View>
          <View style = { styles.containerBadges }>
            <Text style = { styles.textSubTitle }>Won Badges</Text>
            <View style = { styles.containerBadgeGrid }>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>
                  Badge description Badge description
                  Badge description Badge description
                  Badge description Badge description
                </Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
              </View>
              <View style = { styles.containerBadgeGridItem }>
                <Image source = { require('../assets/img/poi_name_mission.png') } />
                <Text style = { styles.textSubTitleItem }>Badge description</Text>
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
