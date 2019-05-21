import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { Text } from "@99xt/first-born";
import AsyncStorage from '@react-native-community/async-storage';

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const access_token = await AsyncStorage.getItem('access_token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    setTimeout(() => {
      this.props.navigation.navigate(access_token ? 'App' : 'Auth');
      //this.props.navigation.navigate('App');
    }, 2000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        {/* <Text size='h5' align='center' color='#663399'>The Divvy App</Text> */}
        <View style={styles.innerContainer}>

          <StatusBar backgroundColor="purple" barStyle="light-content" />




          <Image
            style={{
              alignSelf: 'center',
              //height: 597,
              width: 150,
              borderWidth: 0,
              //borderRadius: 100
            }}
            resizeMode="contain"
            source={require('../assets/img/logo.png')}
          ></Image>

        </View>
        <ActivityIndicator size='large' />
        <Text size='h6' align='center' color='#663399'>Launching Awesomeness</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#F5FCFF',
    flexDirection: "column",
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: "column"
  }
});
