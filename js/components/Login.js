import React from 'react';
import { View,
  Text,
  StyleSheet,
  ScrollView,
  Image } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin,
  GoogleSigninButton } from 'react-native-google-signin';
import UserActions from '../actions/UserActions';
import LoginActions from '../actions/LoginActions';
import loginStore from '../stores/LoginStore';
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
    this.onUserLoggedIn = this.onUserLoggedIn.bind(this);
  }

  componentDidMount() {
    loginStore.addChangeListener(this.onUserLoggedIn);

    this.configureGoogleSignIn();
  }

  componentWillUnmount() {
    loginStore.removeChangeListener(this.onUserLoggedIn);
  }

  onUserLoggedIn() {
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
    let _scrollView = ScrollView;
    return (
      <ScrollView
        ref = { (scrollView) => { _scrollView = scrollView; } }
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
