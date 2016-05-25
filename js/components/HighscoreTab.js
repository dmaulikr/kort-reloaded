import React from 'react';
import { View, Text, Image, StyleSheet, ListView, TouchableHighlight, RecyclerViewBackedScrollView, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 45,
  },
  containerListView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  textTitle: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      name: '',
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11']),
    };
  },

  componentWillMount() {
    this._pressData = {};
    // setState von dataSource - array aus allen usern erzeugen und an cloneWithRows übergeben
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
      return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)}>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={ require('../assets/img/poi_name_mission.png') } />
              <View style={styles.column}>
                <Text style={styles.text}>
                  {rowData + ' - '}
                </Text>
                <Text style={styles.text}>

                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 11; ii++) { // magic number!
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },

  render() {
    return (
      <View style={ [styles.container, this.props.sceneStyle] }>
        <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
        <View style={ styles.containerListView }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this._renderRow }
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
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
