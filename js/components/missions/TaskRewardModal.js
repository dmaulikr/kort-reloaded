import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import Button from '../shared/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainerMissionComplete: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
  textTitle: {
    fontSize: 14,
    marginTop: 5,
  },
  textMission: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 200,
  },
});

const TaskRewardModal = ({ badges, receivedKoins, newKoinsTotal }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Text style={styles.textTitle}>{I18n.t('reward_alert_title')}</Text>
      <View style={styles.innerContainerMissionComplete}>
        <Image style={styles.icon} source={require('../../assets/img/koin_no_value.png')} />
        <Text style={styles.textMission}>
          {I18n.t('reward_alert_koins_new', { koin_count_new: receivedKoins })}{'\n'}
          {I18n.t('reward_alert_koins_total', { koin_count_total: newKoinsTotal })}
        </Text>
      </View>
      <Button onPress={Actions.pop}>{I18n.t('messagebox_ok')}</Button>
    </View>
  </View>
);

TaskRewardModal.propTypes = {
  badges: React.PropTypes.array,
  receivedKoins: React.PropTypes.any.isRequired,
  newKoinsTotal: React.PropTypes.any.isRequired,
};

module.exports = TaskRewardModal;
