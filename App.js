/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      iosClientId: '409090686088-ph8ed6943t8l9e34o0p8hvm9u7e7fuqh.apps.googleusercontent.com',
    })
  }

  signIn = () => {   
      GoogleSignin.signIn().then((user)=>{
        alert("User Logged in")
      }).catch((error)=>{
          console.log(error)
      })
  };

fbAuth = () => {
  // LoginManager.setLoginBehavior(Platform.OS === 'ios' ? 'native' : 'NATIVE_ONLY');
  LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      result => {
          if (result.isCancelled) {
              console.log("Login cancelled");
          } else {
              AccessToken.getCurrentAccessToken().then(
                  (data) => {
                      console.log(data.accessToken)
                      fetch(`https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,email,name,picture.type(large)`).then((response) => {
                          console.log(response.json())
                          alert("Success LOgin read")
                      })
                  });
          }
      },
      function (error) {
          console.log("Login fail with error: " + error);
      }
  );
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableHighlight
          style={{ backgroundColor: '#203B70', width: 300, }}
          onPress={this.fbAuth}
          underlayColor='#fff'>
          <Text style={{color: '#FFFF'}}>COUNTINUE WITH FACEBOOK</Text>
      </TouchableHighlight>

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.signIn}
        disabled={this.state.isSigninInProgress} 
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
