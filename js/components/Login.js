import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import LoginActions from '../actions/LoginActions';
import loginStore from '../stores/LoginStore';
import Config from '../constants/Config';

const google = Config.GOOGLE;
const googleWebClientId = Config.GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = Config.IOS_GOOGLE_CLIENT_ID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Login extends React.Component {
  componentDidMount() {
    this.goToTabView();

    loginStore.addChangeListener(this.onUserVerified);

    this.configureGoogleSignIn();
  }

  componentWillUnmount() {
  }

  onUserVerified() {
    this.goToTabView();
  }

  goToTabView() {
    if (loginStore.isLoggedIn()) Actions.tabbar();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
      iosClientId: googleIosClientId,
    });
  }

  signInGoogle() {
    GoogleSignin.signIn()
    .then((user) => LoginActions.verifyUser(google, user.idToken))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton style={ { width: 120, height: 44 } }
          color={GoogleSigninButton.Color.Light}
          size={GoogleSigninButton.Size.Icon}
          onPress={() => { this.signInGoogle(); }}
        />
      </View>
    );
  }
}
