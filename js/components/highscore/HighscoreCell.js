import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import User from '../../dto/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 45,
  },
  containerListView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  rowDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  columnRank: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  columnText: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    flex: 1,
  },
  textRanking: {
  },
});

const HighscoreCell = ({ onSelectRow, user }) => {
  const userName = user.userName;
  const ranking = user.ranking;
  const koinCount = user.koinCount;
  const solveCount = user.solveCount;

  return (
    <TouchableHighlight onPress={onSelectRow}>
      <View>
        <View style={styles.row}>
          <View style={styles.columnRank}>
            <Text style={styles.textRanking}>{ranking}</Text>
          </View>
          <View style={styles.columnText}>
            <Text style={styles.text}>{userName}</Text>
            <View style={styles.rowDescription}>
              <Text style={styles.text}>{`Koins: ${koinCount}`}</Text>
              <Text style={styles.text}>{`Missions: ${solveCount}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

HighscoreCell.propTypes = {
  onSelectRow: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

module.exports = HighscoreCell;
