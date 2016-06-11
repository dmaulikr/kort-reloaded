import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import I18n from 'react-native-i18n';

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
            <Text style={styles.textTitle}>{I18n.t('about_version_title')}</Text>
            <Text style={styles.textSubTitle}>version</Text>
            <Text style={styles.textTitle}>{I18n.t('about_information_title')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_information_homepage')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_information_feedback')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_information_bugs')}</Text>
            <Text style={styles.textTitle}>{I18n.t('about_developers_title')}</Text>
            <Text style={styles.textSubTitle}>Dominic Mülhaupt</Text>
            <Text style={styles.textSubTitle}>Marino Melchiori</Text>
            <Text style={styles.textSubTitle}>Jürg Hunziker</Text>
            <Text style={styles.textSubTitle}>Stefan Oderbolz</Text>
            <Text style={styles.textTitle}>{I18n.t('about_project_title')}</Text>
            <Text style={styles.textSubTitle}>Bachelorarbeit FS2016</Text>
            <Text style={styles.textSubTitle}>HSR Hochschule für Technik Rapperswil</Text>
            <Text style={styles.textSubTitle}>
              {I18n.t('about_project_advisor')} Prof. Stefan Keller
            </Text>
            <Image style={styles.hsrlogo} source={require('../../assets/img/hsr_logo.png')} />
            <Text style={styles.textTitle}>{I18n.t('about_credits_title')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_credits_partner')} Liip AG</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_credits_tiledata')}: ...</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_credits_markers')}: ...</Text>
            <Text style={styles.textTitle}>{I18n.t('about_legal_title')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_legal_message')}</Text>
          </View>
        </View>
      </ScrollView>
    );
  },
});

module.exports = AboutTab;
