import React from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import {
  Text, Icon, Button, Input, TextArea, Picker, DatePicker,
  FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem,
  Notification, NotificationBarManager, FloatingButton, Form, CardList,
  ListView, NavBarLeft, NavBar, NavBarBody, NavBarRight,
  NavBarButton, TabItem, TabBar, PillView
} from "@99xt/first-born";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const backend = axios.create({
  //baseURL: 'https://thedivvy.app/api/',
  baseURL: '192.168.1.144:8000/api/',
  timeout: 1000
});

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Welcome. Please Sign In',
  };

  signInAsync = async () => {
    formData = {email: this.state.email, password: this.state.password}
    backend.post('auth/jwt/create/', formData)
    .then(function (response) {
      // handle success
      AsyncStorage.setItem('access_token', response.data.access);
      AsyncStorage.setItem('refresh_token', response.data.refresh);
      this.props.navigation.navigate('App');
    })
      .catch(function (error) {
        //handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        // render error messages
      });
    
  };


  goToRegister = () => {
    this.props.navigation.navigate('Register');
  }

  handleInputChange = (newState) => {
    this.setState(newState)
  }



  formElements = [
    {
      label: "Email",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ email: value }),
      placeholder: "jdoe0@frostburg.edu",
      keyboardType: "email-address"
    },
    {
      label: "Password",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ password: value }),
      secureTextEntry: true
    },
  ];



  render() {
    return (
      <ScrollView >
        <View style={styles.innerContainer}>
          <Form formElements={this.formElements} />
          <Button onPress={this.signInAsync} rounded block>
            <Text>Sign In</Text>
          </Button>
        </View>
        <Button onPress={this.goToRegister} outline transparent>
          <Text>{"Need an account? Register"}</Text>
        </Button>
      </ScrollView>
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
