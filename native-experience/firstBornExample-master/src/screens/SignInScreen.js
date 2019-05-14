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
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
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
