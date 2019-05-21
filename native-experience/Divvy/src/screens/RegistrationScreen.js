import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import {
  Text, Icon, Button, Input, TextArea, Picker, DatePicker,
  FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem,
  Notification, NotificationBarManager, FloatingButton, Form, CardList,
  ListView, NavBarLeft, NavBar, NavBarBody, NavBarRight,
  NavBarButton, TabItem, TabBar, PillView
} from "@99xt/first-born";
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const backend = axios.create({
  //baseURL: 'https://thedivvy.app/api/auth/',
  baseURL: 'http://192.168.0.144:8000/api/auth/',
  timeout: 1000
});

export class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    //this.state = Object.assign({}, this.state, { isMinor: true }); // append variable to state
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      isMinor: true,
      gender: 'U', // needs an initial value, since the form does not set this upon initial render
      // although it renders with a default option(label) selected. 'U' is the value of that label. 
      email: '',
      password: '',
      working: false,
      nonFieldErrors: [],
      fieldErrors: []
    }
    this.registerAsync = this.registerAsync.bind(this);
  }

  static navigationOptions = {
    title: 'Create Account',
  };


  async registerAsync() {
    this.setState({ working: true })
    message = ''
    formData = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone: this.state.phone,
      is_minor: this.state.isMinor,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password
    }
    backend.post('users/', formData)
      .then((response) => {
        if (response.status == 201) {
          this.setState({ working: false })
          // inform user to go activate
          Alert.alert(
            'Success',
            'Your account has been created and needs to be activated before you can sign in.\nCheck your email for an activation link.',
            [
              { text: 'OK', onPress: () => this.props.navigation.navigate('SignIn') },
            ],
            { cancelable: false },
          );

        }
        else {
          this.props.navigation.navigate('SignIn');
        }

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
          if ("first_name" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
              'First Name: '.concat(error.response.data.first_name.join("\n"))
              ]
            })
          }
          if ("last_name" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
              'Last Name: '.concat(error.response.data.last_name.join("\n"))
              ]
            })
          }
          if ("phone" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
              'Phone: '.concat(error.response.data.phone.join("\n"))
              ]
            })
          }
          /* skipped "gender" field because upon load, it already has a default value,
              and only valiod choices are available, so it shouldn't cause field errors*/
          if ("is_minor" in error.response.data) {
            this.setState({
              fieldErrors: [...this.state.fieldErrors,
                "You must be at least 18 years old to use this service"
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
          message = 'An unknown error occured'
          console.log('Error', error.message);
        }
        console.log(error.config);
        // render error messages
        this.onRegisterFail(message);
      });

  };

  onRegisterFail(message) {
    this.setState({
      collectedErrors: message,
      working: false
    });
  }

  componentDidMount() {
    NotificationBarManager.registerMessageBar(this.refs.alert);
  }

  handleDisplayAlert = (btnName) => {
    Alert.alert("Hello", btnName);
  }

  goToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  handleInputChange = (newState) => {
    this.setState(newState);
  }

  pickerData = [
    {
      value: "U",
      label: "Choose not to disclose"
    },
    {
      value: "F",
      label: "Female"
    },
    {
      value: "M",
      label: "Male"
    },
  ];

  formElements = [
    {
      label: "First Name",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ firstName: value }),
      placeholder: "Jane"
    },
    {
      label: "Last Name",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ lastName: value }),
      placeholder: "Doe"
    },
    {
      label: "Phone",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ phone: value }),
      placeholder: "2024386648",
      keyboardType: "phone-pad"
    },
    {
      label: "Gender",
      type: "picker",
      onValueChange: (value) => this.handleInputChange({ gender: value }),
      pickerData: this.pickerData
    },
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

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <Form formElements={this.formElements} />
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                title='I am at least 18 years old'
                checked={!this.state.isMinor}
                onPress={() => this.handleInputChange({ isMinor: !this.state.isMinor })}
                checkedColor='#663399'
              />
            </View>
            
          </View>
        </ScrollView>
        <View style={styles.alwaysVisibleButtons}>
        <Text color='red' align='center' >{this.state.collectedErrors}</Text>
        {this.state.working ?
          <ActivityIndicator size="large" color="#663399" />
          :
          <Button style={styles.button} onPress={this.registerAsync} rounded block>
            <Text>Register</Text>
          </Button>
        }

        <Button onPress={this.goToSignIn} outline transparent>
          <Text>{"Already have an account? Sign in"}</Text>
        </Button>
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
  },
  alwaysVisibleButtons: {
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '90%'
  }
});
