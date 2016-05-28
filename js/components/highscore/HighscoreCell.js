import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFD'
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginRight: 15,
    marginLeft: 15
  },
  commentDetailsContainer: {
    flex: 1
  },
  collectionTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 25,
    color: '#DA552F'
  },
  collectionDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
  },
  collectionCurator: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 25,
    color: '#DA552F'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
});

var CollectionCell = React.createClass({
  getInitialState: function() {
    return {
      username: this.props.highscorelist.username,
      fix_count: this.props.highscorelist.fix_count,
      vote_count: this.props.highscorelist.vote_count,
      koin_count: this.props.highscorelist.koin_count,
    }
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
            <View style={styles.commentDetailsContainer}>
              <Text style={styles.collectionTitle}>
                {this.state.collectionName}
              </Text>
              <Text style={styles.collectionCurator}>Curated by {this.state.curator} </Text>
              <Text style={styles.collectionDetailsLine}>
                {this.state.tagLine}
              </Text>
            </View>
            <Image source={{uri: this.state.imageLink}}
                   style={styles.image} />
        </View>
      </TouchableHighlight>

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
            )
  }
})

module.exports = CollectionCell;
