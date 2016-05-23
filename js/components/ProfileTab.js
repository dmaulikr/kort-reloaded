import React, { View, Text, Image, StyleSheet, ListView, TouchableHighlight, RecyclerViewBackedScrollView, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 7,
  },
  row: {
    flexDirection: 'row',
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


const ProfileTab = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11']),
      username: '',
      provider: '',
      completedMissions: 0,
      collectedKoins: 0,
      place: '',
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount() {
    this._pressData = {};
  },
  componentDidMount() {
  },
  componentWillUnmount() {
  },
  onChange() {
  },
  updateProfileText(user) {
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
      return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)}>
          <View>
            <View style={styles.row}>
              <Image style={styles.thumb} source={ require('../assets/img/poi_name_mission.png') } />
              <Text style={styles.text}>
                {rowData + ' - '}
              </Text>
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
      <View style={styles.container}>
        <Image source = { require('../assets/img/poi_name_mission.png') } />
        <Text style = { [styles.textTitle] }>Username</Text>
        <Text style = { [styles.textTitle] }>{ this.state.username }</Text>
        <Text style = { [styles.textTitle] }>Login via</Text>
        <Text style = { [styles.textTitle] }>{ this.state.provider }</Text>
        <Text style = { [styles.textTitle] }>Completed Missions</Text>
        <Text style = { [styles.textTitle] }>{ this.state.completedMissions }</Text>
        <Text style = { [styles.textTitle] }>Collected Koins</Text>
        <Image source = { require('../assets/img/poi_name_mission.png') } />
        <Text style = { [styles.textTitle] }>{ this.state.collectedKoins } Koins</Text>
        <Image source = { require('../assets/img/poi_name_mission.png') } />
        <Text style = { [styles.textTitle] }>{ this.state.place } Place</Text>
        <Text style = { [styles.textTitle] }>Won Badges</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
      </View>
    );
  },
});

ProfileTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = ProfileTab;
