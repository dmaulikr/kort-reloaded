import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TaskButton from '../shared/TaskButton';
import TaskRewardBadge from './TaskRewardBadge';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

const TaskRewardModal = ({ badges, receivedKoins, newKoinsTotal }) => (
  <View>
    <View style={styles.container}>
      <View style={[styles.innerContainer, { backgroundColor: '#fff', padding: 20 }]}>
        <Text>Mission completed. You increased your reputation!</Text>
        <View style={styles.innerContainerMissionComplete}>
          <Image style={styles.icon} source={require('../../assets/img/koin_no_value.png')} />
          <Text style={styles.textMission}>
            Bravo! You have won {receivedKoins} Koins!
            You now have a total amount of {newKoinsTotal} Koins.
          </Text>
          </View>
          <TaskRewardBadge wonBadge badge = "badge1" />
          <TaskButton onPress={Actions.pop} style={styles.modalButton}>OK</TaskButton>
      </View>
    </View>
  </View>
);

TaskRewardModal.propTypes = {
  badges: React.PropTypes.any.isRequired,
  receivedKoins: React.PropTypes.any.isRequired,
  newKoinsTotal: React.PropTypes.any.isRequired,
};

module.exports = TaskRewardModal;
