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
import Config from '../constants/Config';

const webClientId = Config.GOOGLE_WEB_CLIENT_ID;

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

class Login extends React.Component {

  // set user initial state from AsyncStorage
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId,
    });

    GoogleSignin.currentUserAsync().then((user) => {
      console.log('USER', user);
      this.setState({ user });
    }).done();
  }

  componentWillUnmount() {
  }

  createUser() {
    // UserActions.setUser(this.user.id_token, this.provider);
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({ user: user });
      if (user !== null) {
        Actions.tabbar();
      }
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({ user: null });
    })
    .done();
  }

  render() {
    let _scrollView = ScrollView;
    if (!this.state.user) {
      return (
        <ScrollView
          ref = { (scrollView) => { _scrollView = scrollView; } }
          automaticallyAdjustContentInsets={false}
          onScroll = { () => { console.log('onScroll!'); } }
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
              <GoogleSigninButton style={ { alignSelf: 'center', width: 120, height: 44 } }
                color={GoogleSigninButton.Color.Light}
                size={GoogleSigninButton.Size.Icon}
                onPress={() => { this._signIn(); }}
              />
              <Text style = { styles.textTitle }>
                Other providers will be added!
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView
        ref = { (scrollView) => { _scrollView = scrollView; } }
        automaticallyAdjustContentInsets={false}
        onScroll = { () => { console.log('onScroll!'); } }
        scrollEventThrottle = { 200 }
        style = { styles.scrollView }
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text style={{ marginBottom: 20 }}>Your email is: {this.state.user.email}</Text>

          <Button onPress={() => {this._signOut(); }}>Log out</Button>

          <Text style={{ marginTop: 20 }}>Login page </Text>
          <Button onPress={Actions.tabbar}>Go to TabBar page </Button>
        </View>
      </ScrollView>
    );
  }
}

module.exports = Login;
