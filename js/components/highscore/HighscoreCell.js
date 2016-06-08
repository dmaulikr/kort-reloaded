import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

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

const CollectionCell = React.createClass({
  getInitialState() {
    return {
      username: this.props.highscoreList.username,
      ranking: this.props.highscoreList.ranking,
      you: this.props.highscoreList.you,
      fix_count: this.props.highscoreList.fix_count,
      vote_count: this.props.highscoreList.vote_count,
      koin_count: this.props.highscoreList.koin_count,
    };
  },

  componentDidMount() {
  },

  render() {
    if (this.state.you) {
      this.setState({ username: `${this.state.username} -  This is you!` });
    }
    return (
      <TouchableHighlight onPress={this.props.onSelectRow}>
        <View>
          <View style={styles.row}>
            <View style={styles.columnRank}>
              <Text style={styles.textRanking}>{this.state.ranking}</Text>
            </View>
            <View style={styles.columnText}>
              <Text style={styles.text}>{this.state.username}</Text>
              <View style={styles.rowDescription}>
                <Text style={styles.text}>{`Koins: ${this.state.koin_count}`}</Text>
                <Text style={styles.text}>{`Missions: ${this.state.fix_count}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

module.exports = CollectionCell;
