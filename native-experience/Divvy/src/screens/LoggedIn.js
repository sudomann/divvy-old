import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Loading } from '../components/common/';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: ''
    }
  }

  componentDidMount() {
    const headers = {
      'Authorization': 'JWT ' + this.props.jwt
    };
    axios({
      method: 'GET',
      url: 'http://192.168.0.144:8000/api/auth/users/me/',
      headers: headers,
    }).then((response) => {
      this.setState({
        email: response.data.email,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, email, error } = this.state;

    if (loading) {
      return (
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
      return (
        <View style={container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            </MapView>
          
          <View>
            {email ?
              <Text style={emailText}>
                Your email: {email}
              </Text>
              :
              <Text style={errorText}>
                {error}
              </Text>}
          </View>
          <Button onPress={this.props.deleteJWT}>
            Log Out
            </Button>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};
