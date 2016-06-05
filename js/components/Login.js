import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import AuthenticationActions from '../actions/AuthenticationActions';
import authenticationStore from '../stores/AuthenticationStore';
import Config from '../constants/Config';

const google = Config.GOOGLE;
const googleWebClientId = Config.GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = Config.IOS_GOOGLE_CLIENT_ID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 7,
    height: 64,
    width: 64,
  },
  containerLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
  },
  textIntroduction: {
    textAlign: 'left',
    fontSize: 18,
    marginTop: 7,
  },
  textSubTitle: {
    marginTop: 5,
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onAuthenticationUpdate = this.onAuthenticationUpdate.bind(this);
  }

  componentDidMount() {
    authenticationStore.addChangeListener(this.onAuthenticationUpdate);

    this.configureGoogleSignIn();
  }

  componentWillUnmount() {
    authenticationStore.removeChangeListener(this.onAuthenticationUpdate);
  }

  onAuthenticationUpdate() {
    if (authenticationStore.isLoggedIn()) Actions.pop();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
      iosClientId: googleIosClientId,
    });
  }

  signInGoogle() {
    GoogleSignin.signIn()
    .then((user) => AuthenticationActions.verifyUser(google, user.idToken))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle = { 200 }
        style = { styles.scrollView }
      >
        <View style = { styles.container }>
          <Image style = { styles.kortlogo }
            source = { require('../assets/img/kort-logo.png') }
          />
          <View style = { styles.containerLogin }>
            <Text style = { styles.textIntroduction }>Complete Missions</Text>
            <Text style = { styles.textIntroduction }>Collect Koins</Text>
            <Text style = { styles.textIntroduction }>Improve OpenStreetMap</Text>
            <Text style = { styles.textSubTitle }>
              Kort helps to improve the data in OpenStreetMap.
            </Text>
            <Text style = { styles.textSubTitle }>
              Hence you'll see your missions on a map.
              By completing missions you get Koins and earn badges.
            </Text>
            <Text style = { styles.textSubTitle }>
              Each solved mission is later checked by other players
              for its correctness. As soon as enough positive ratings
              are entered for a suggested solution, it is ready
              to be sent back to OpenStreetMap
            </Text>
            <Text style = { styles.textTitle }>
              Login now to begin your mission!
            </Text>
            <GoogleSigninButton style = { { alignSelf: 'center', width: 120, height: 44 } }
              color = { GoogleSigninButton.Color.Light }
              size = { GoogleSigninButton.Size.Icon }
              onPress = { () => { this.signInGoogle(); } }
            />
            <Text style = { styles.textTitle }>
              Other providers will be added!
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
