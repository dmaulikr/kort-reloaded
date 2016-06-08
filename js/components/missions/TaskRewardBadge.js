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

const TaskRewardBadge = React.createClass({
  propTypes: {
    badges: React.PropTypes.any.isRequired,
  },

  _renderBadges() {
    let badgeField;

    if (!this.props.badges) {
      badgeField = <View />;
    } else { // ToDo: If two badges are won at the same time.
      switch (this.props.badges) {
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

    return badgeField;
  },

  render() {
    return (
      <View style={styles.container}>
        {this._renderBadges()}
      </View>
    );
  },
});

module.exports = TaskRewardBadge;
