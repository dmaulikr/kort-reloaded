import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import AuthenticationActions from '../actions/AuthenticationActions';
import Config from '../constants/Config';

const google = Config.GOOGLE;
const googleWebClientId = Config.GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = Config.IOS_GOOGLE_CLIENT_ID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  containerLogin: {
    flex: 1,
    alignItems: 'stretch',
  },
  containerLogo: {
    alignItems: 'flex-start',
  },
  containerLoginText: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerLoginDescription: {
    borderRadius: 10,
    backgroundColor: '#1e90ff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  containerLoginButtons: {
    justifyContent: 'flex-end',
    marginBottom: 45,
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 7,
    height: 64,
    width: 64,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
    color: '#fffaf0',
  },
  textIntroduction: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 18,
    marginTop: 7,
    color: '#fffaf0',
  },
  textSubTitle: {
    marginTop: 5,
    alignSelf: 'center',
    color: '#fffaf0',
  },
});

const Login = React.createClass({
  componentDidMount() {
    this.configureGoogleSignIn();
  },
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
      iosClientId: googleIosClientId,
    });
  },

  signInGoogle() {
    GoogleSignin.signIn()
    .then((user) => AuthenticationActions.verifyUser(google, user.idToken))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
    Actions.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets = { false }
          scrollEventThrottle = { 200 }
          style = { styles.scrollView }
        >
          <View style={styles.containerLogin}>
            <View style={styles.containerLogo}>
              <Image style={styles.kortlogo}
                source={require('../assets/img/kort-logo.png')}
              />
            </View>
            <View style={styles.containerLoginText}>
              <View style={styles.containerLoginDescription}>
                <Text style={styles.textIntroduction}> • Complete Missions</Text>
                <Text style={styles.textIntroduction}> • Collect Koins</Text>
                <Text style={styles.textIntroduction}> • Improve OpenStreetMap</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.containerLoginButtons}>
          <Text style={styles.textTitle}>
            Login now to begin your mission!
          </Text>
          <Text style={styles.textSubTitle}>
            Other providers will be added.
          </Text>
          <GoogleSigninButton
            style={{ alignSelf: 'center', width: 120, height: 44, marginTop: 7 }}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => { this.signInGoogle(); }}
          />
        </View>
      </View>
    );
  },
});

export default Login;
