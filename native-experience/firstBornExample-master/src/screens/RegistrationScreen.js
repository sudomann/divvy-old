import React from 'react';
import { View, StyleSheet, ScrollView, CheckBox, TextInput } from 'react-native';
import {
  Text, Icon, Button, Input, TextArea, Picker, DatePicker,
  FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem,
  Notification, NotificationBarManager, FloatingButton, Form, CardList,
  ListView, NavBarLeft, NavBar, NavBarBody, NavBarRight,
  NavBarButton, TabItem, TabBar, PillView
} from "@99xt/first-born";
import AsyncStorage from '@react-native-community/async-storage';

export class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, { isMinor: true }); // append variable to state
  }

  static navigationOptions = {
    title: 'Create Account',
  };




  componentDidMount() {
    NotificationBarManager.registerMessageBar(this.refs.alert);
  }

  handleDisplayAlert = (btnName) => {
    Alert.alert("Hello", btnName);
  }

  registerRequest = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
  //  this.props.navigation.navigate('SignIn');
  };

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
      //onChangeText: (value) => this.handleInputChange({firstName: value}),
      placeholder: "Jane"
    },
    {
      label: "Last Name",
      type: "text",
     // onChangeText: (value) => this.handleInputChange({ lastName: value }),
      placeholder: "Doe"
    },
    {
      label: "Phone",
      type: "text",
    //  onChangeText: (value) => this.handleInputChange({ phone: value }),
      placeholder: "2024386648",
      keyboardType: "phone-pad"
    },
    {
      label: "Gender",
      type: "picker",
   //   onValueChange: (value) => this.handleInputChange({ gender: value }),
      pickerData: this.pickerData
    },
    {
      label: "Email",
      type: "text",
     // onChangeText: (value) => this.handleInputChange({ email: value }),
      placeholder: "jdoe0@frostburg.edu",
      keyboardType: "email-address"
    },
    {
      label: "Password",
      type: "text",
      //onChangeText: (value) => this.handleInputChange({ password: value }),
      secureTextEntry: true
    },
  ];




  render() {
    return (
      <ScrollView>
        <View style={styles.innerContainer}>
          <Form formElements={this.formElements} />
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={false}
              //onValueChange={() => this.handleInputChange({ isMinor: !this.state.isMinor })}
            />
            <Text style={{ marginTop: 5 }}>I am at least 18 years old</Text>
          </View>

          <Button onPress={this.registerRequest} rounded block>
            <Text>Register</Text>
          </Button>
        </View>
        <Button onPress={this.goToSignIn} outline transparent>
          <Text>{"Already have an account? Sign in"}</Text>
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
