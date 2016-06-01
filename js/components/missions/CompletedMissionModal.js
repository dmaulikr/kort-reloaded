import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image } from 'react-native';
import CustomButton from '../shared/CustomButton';
import CompletedMissionModalBadge from './CompletedMissionModalBadge';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  innerContainerMissionComplete: {
    flexDirection: 'row',
  },
  modalButton: {
    marginTop: 10,
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
  textMission: {
    alignSelf: 'center',
    marginTop: 5,
    width: 200,
  },
});

const CompletedMissionModal = React.createClass({
  getInitialState() {
    return {
      modalVisible: this.props.modalVisible,
      koins: this.props.koins,
      userKoins: this.props.userKoins,
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  render() {
    return (
      <View>
        <View style = { styles.container }>
          <View style = { [styles.innerContainer, { backgroundColor: '#fff', padding: 20 }] }>
            <Text>Mission completed. You increased your reputation!</Text>
            <View style = { styles.innerContainerMissionComplete }>
              <Image
                style = { styles.icon }
                source = { require('../../assets/img/koin_no_value.png') }
              />
              <Text style = { styles.textMission }>
                Bravo! You have won { this.state.koins } Koins!
                You now have a total amount of { this.state.userKoins } Koins.
              </Text>
            </View>
            <CompletedMissionModalBadge
              wonBadge
              badge = "badge1"
            />
            <CustomButton
              onPress = { Actions.pop }
              style = { styles.modalButton }
            >
              Ok
            </CustomButton>
          </View>
        </View>
      </View>
    );
  },
});

module.exports = CompletedMissionModal;
