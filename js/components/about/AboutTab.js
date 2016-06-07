import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 46,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerAbout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
  },
  textSubTitle: {
    marginTop: 5,
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 7,
    height: 64,
    width: 64,
  },
  hsrlogo: {
    marginTop: 5,
    height: 23,
    width: 87,
  },
});


const AboutTab = React.createClass({
  getInitialState() {
    return {
      title: '',
    };
  },

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <View style={styles.containerAbout}>
            <Image style={styles.kortlogo} source={require('../../assets/img/kort-logo.png')} />
            <Text style={styles.textTitle}>Version</Text>
            <Text style={styles.textSubTitle}>version</Text>
            <Text style={styles.textTitle}>More information</Text>
            <Text style={styles.textSubTitle}>Webseite</Text>
            <Text style={styles.textSubTitle}>Feedback / FAQ</Text>
            <Text style={styles.textSubTitle}>Report a bug</Text>
            <Text style={styles.textTitle}>Developer</Text>
            <Text style={styles.textSubTitle}>Dominic Mülhaupt</Text>
            <Text style={styles.textSubTitle}>Marino Melchiori</Text>
            <Text style={styles.textSubTitle}>Jürg Hunziker</Text>
            <Text style={styles.textSubTitle}>Stefan Oderbolz</Text>
            <Text style={styles.textTitle}>Projects</Text>
            <Text style={styles.textSubTitle}>Bachelorarbeit FS2016</Text>
            <Text style={styles.textSubTitle}>HSR Hochschule für Technik Rapperswil</Text>
            <Text style={styles.textSubTitle}>Lead: Prof. Stefan Keller</Text>
            <Image style={styles.hsrlogo} source={require('../../assets/img/hsr_logo.png')} />
            <Text style={styles.textTitle}>Credits</Text>
            <Text style={styles.textSubTitle}>Partner: Liip AG</Text>
            <Text style={styles.textSubTitle}>Tiles: ...</Text>
            <Text style={styles.textSubTitle}>Marker icons: ...</Text>
            <Text style={styles.textTitle}>Legal note</Text>
            <Text style={styles.textSubTitle}>
              Please follow the guidelines of OpenStreetMap
              and don't use copyright protected sources without permissions.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  },
});

AboutTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = AboutTab;