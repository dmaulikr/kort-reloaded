import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 7,
  },
  containerBadges: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
});

const CompletedMissionModalBadge = React.createClass({
  propTypes: {
    wonBadges: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    // remove state
    return {
      wonBadge: this.props.wonBadges,
      badge: this.props.wonBadges,
    };
  },

  render() {
    let badgeField;

    if (!this.state.wonBadge) {
      badgeField = <View />;
    } else { // ToDo: If two badges are won at the same time.
      switch (this.state.badge) {
        case 'badge0':
          badgeField = (
            <View style={styles.containerBadges}>
              <Text>Won badges:</Text>
              <Image
                style={styles.icon}
                source={require('../../assets/img/koin_no_value.png')}
              />
            </View>
          );
          break;
        case 'badge1':
          badgeField = (
            <View style={styles.containerBadges}>
              <Text>Won badges:</Text>
              <Image
                style={styles.icon}
                source={require('../../assets/img/koin_no_value.png')}
              />
            </View>
          );
          break;
        default:
          badgeField = <View />;
          break;
      }
    }

    return (
      <View style={styles.container}>
        {badgeField}
      </View>
    );
  },
});

module.exports = CompletedMissionModalBadge;
