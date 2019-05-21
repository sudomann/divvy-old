<script src="http://localhost:8097"></script>
import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, ActivityIndicator, BackHandler  } from 'react-native';
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
  //baseURL: 'https://thedivvy.app/api/auth/',
  baseURL: 'http://192.168.0.144:8000/api/',
  timeout: 1000
});

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      working: false,
      nonFieldErrors: [],
      fieldErrors: []
    }
    this.signInAsync = this.signInAsync.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome. Please Sign In',
    headerLeft: null,
  };


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true
    })
  }
  onLoginFail(message) {
    this.setState({
      errorBrief: message,
      working: false
    });
  }


  async signInAsync () {
    this.setState({working: true})
    message = ''
    formData = { email: this.state.email, password: this.state.password }
    backend.post('auth/jwt/create/', formData)
      .then((response) => {
        // handle success
        AsyncStorage.setItem('access_token', response.data.access);
        AsyncStorage.setItem('refresh_token', response.data.refresh);
        this.setState({working: false})
        this.props.navigation.navigate('App');
      })
      .catch((error) => {
        //handle error
        message = '';
        // clear old errors if any
        this.setState({ nonFieldErrors: [] });
        this.setState({ fieldErrors: [] });
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if ("non_field_errors" in error.response.data) {
            this.setState({
              nonFieldErrors: [...this.state.nonFieldErrors,
              error.response.data.non_field_errors.join("\n")
              ]
            })
          }
          if ("email" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
              'Email: '.concat(error.response.data.email.join("\n"))
              ]
            })
          }
          if ("password" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
              'Password: '.concat(error.response.data.password.join("\n"))
              ]
            })
          }
          message = this.state.nonFieldErrors.join("\n").concat(this.state.fieldErrors.join("\n"));
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          message = 'Sorry for the inconvenience.\nDivvy service is unavailable.'
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          message = 'An unknown error occured :('
          console.log('Error', error.message);
        }
        console.log(error.config);
        // render error messages
        this.onLoginFail(message)
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
    const { errorBrief } = this.state;
    return (
      <ScrollView >
        <View style={styles.innerContainer}>
          <Form formElements={this.formElements} />
          <Text color='red' align='center' >{errorBrief}</Text>
          {this.state.working ?
            <ActivityIndicator size="large" color="#663399" />
            :
            <Button onPress={this.signInAsync} rounded block>
              <Text>Sign In</Text>
            </Button>
          }
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
