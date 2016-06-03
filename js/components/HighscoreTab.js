import React from 'react';
import { View,
  Text,
  Image,
  StyleSheet,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HighscoreCell from './highscore/HighscoreCell';
import highscoreStore from '../stores/HighscoreStore';
import HighscoreActions from '../actions/HighscoreActions';

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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return {
      dataSource: ds.cloneWithRows([{ user_id: '3', username: 'tschortsch', koin_count: '140',
        fix_count: '12', vote_count: '4', ranking: '1', you: true },
        { user_id: '4', username: 'mmelchio', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '3', you: false },
        { user_id: '5', username: 'mmelchio2', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '4', you: false },
        { user_id: '6', username: 'mmelchio3', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '5', you: false },
        { user_id: '7', username: 'mmelchio4', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '6', you: false },
        { user_id: '8', username: 'mmelchio5', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '7', you: false },
        { user_id: '9', username: 'mmelchio6', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '8', you: false },
        { user_id: '10', username: 'mmelchio7', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '9', you: false },
        { user_id: '11', username: 'mmelchio8', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '0', you: false },
        { user_id: '12', username: 'mmelchio9', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '10', you: false },
        { user_id: '13', username: 'mmelchio10', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '11', you: false },
        { user_id: '14', username: 'mmelchio11', koin_count: '110',
          fix_count: ' 1', vote_count: '23', ranking: '12', you: false },
        { user_id: '15', username: 'mmelchio12', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '13', you: false },
        { user_id: '16', username: 'mmelchio13', koin_count: '110',
          fix_count: '1', vote_count: '23', ranking: '14', you: false }]),
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
    highscoreStore.addChangeListener(this._onHighscoreUpdate);

    this._getHighscore();
  },

  componentWillUnmount() {
    highscoreStore.removeChangeListener(this._onHighscoreUpdate);
  },

  _getHighscore() {
    HighscoreActions.loadAbsoluteHighscore('10', '1');
  },

  _onHighscoreUpdate() {
    // console.log('HIGHSCORE-STORE: ' + highscoreStore.getHighscore());
  },

  _renderRow(rowData, sectionID, rowID) {
    return (
      <HighscoreCell
        onSelectRow = { () => this._pressRow(rowData) }
        highscoreList = { rowData }
      />
    );
  },

  _pressRow(rowData) {
    console.log(rowData);
    if (!rowData.you) {
      Actions.profileModal({ data: rowData });
    } else {
      Actions.profile();
    }
  },

  render() {
    return (
      <View style = { styles.container }>
        <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
        <View style = { styles.containerListView }>
          <ListView
            dataSource = { this.state.dataSource }
            renderRow = { this._renderRow }
            renderSeparator = { (sectionID, rowID) =>
              <View key = { `${sectionID}-${rowID}` } style = { styles.separator } />}
          />
        </View>
      </View>
    );
  },
});

HighscoreTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = HighscoreTab;
