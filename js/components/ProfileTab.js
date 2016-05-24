import React, { View, Text, Image, StyleSheet, ListView, TouchableHighlight, RecyclerViewBackedScrollView, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerProfileDescription: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerKoins: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerKoinsDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  textSubTitle: {
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
      <View style={ styles.container }>
        <Text style = { [styles.textTitle] }>{ this.props.title }</Text>
        <View style={ styles.containerInfo }>
          <View style={ styles.containerProfile }>
            <Image source = { require('../assets/img/poi_name_mission.png') } />
            <View style={ styles.containerProfileDescription }>
              <Text style = { [styles.textSubTitle] }>Username</Text>
              <Text style = { [styles.textSubTitle] }>{ this.state.username } username</Text>
              <Text style = { [styles.textSubTitle] }>Login via</Text>
              <Text style = { [styles.textSubTitle] }>{ this.state.provider } provider </Text>
              <Text style = { [styles.textSubTitle] }>Completed Missions</Text>
              <Text style = { [styles.textSubTitle] }>{ this.state.completedMissions }</Text>
            </View>
          </View>
          <Text style = { [styles.textSubTitle] }>Collected Koins</Text>
          <View style={ styles.containerKoins }>
            <View style={ styles.containerKoinsDescription }>
              <Image source = { require('../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.textSubTitle] }>{ this.state.collectedKoins } Koins</Text>
            </View>
            <View style={ styles.containerKoinsDescription }>
              <Image source = { require('../assets/img/poi_name_mission.png') } />
              <Text style = { [styles.textSubTitle] }>{ this.state.place } Place</Text>
            </View>
          </View>
        </View>
        <View style={ styles.containerListView }>
          <Text style = { [styles.textSubTitle] }>Won Badges</Text>
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

ProfileTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = ProfileTab;
