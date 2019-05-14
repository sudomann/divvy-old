import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
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
    this.props.navigation.navigate(access_token ? 'App' : 'Auth');
    //this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Launching The Divvy App</Text>
        <ActivityIndicator />
        
        <Image
          style={{
            alignSelf: 'center',
            height: 597,
            width: 301,
            borderWidth: 1,
            borderRadius: 75
          }}
          resizeMode="contain"
          source={require('../assets/img/logo.png')}
        ></Image>
        <StatusBar barStyle="default" />
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
