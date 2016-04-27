import React, { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login page </Text>
        <Button onPress={Actions.tabbar}>Go to TabBar page </Button>
      </View>
    );
  }
}

module.exports = Login;
