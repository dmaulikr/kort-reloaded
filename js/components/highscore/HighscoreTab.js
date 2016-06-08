import React from 'react';
import { View, Text, Image, StyleSheet, ListView, TouchableHighlight,
  RecyclerViewBackedScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import HighscoreActions from '../../actions/HighscoreActions';
import HighscoreCell from './HighscoreCell';
import highscoreStore from '../../stores/HighscoreStore';

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
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

const HighscoreTab = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  },

  componentDidMount() {
    highscoreStore.addChangeListener(this._onHighscoreUpdate);

    if (highscoreStore.getHighscore() === null) {
      HighscoreActions.loadAbsoluteHighscore();
    } else {
      this._updateHighscore();
    }
  },

  componentWillUnmount() {
    highscoreStore.removeChangeListener(this._onHighscoreUpdate);
  },

  _updateHighscore() {
    const highscore = highscoreStore.getHighscore();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(highscore),
    });
  },

  _onHighscoreUpdate() {
    this._updateHighscore();
  },

  _renderRow(rowData) {
    return (
      <HighscoreCell
        onSelectRow={() => Actions.profileModal({ data: rowData })}
        data={rowData}
      />
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerListView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={styles.separator} />
            }
          />
        </View>
      </View>
    );
  },
});

module.exports = HighscoreTab;
