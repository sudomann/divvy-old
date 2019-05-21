import React, { Component } from 'react';
import { StyleSheet, View, Alert, Styles } from 'react-native';
import {
  Text, Icon, Button, Picker, FormDatePicker, FormInput,
  FormTextArea, FormPicker, Card, ListItem, Form, ListView
} from "@99xt/first-born";

export class AccountTabView extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
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



  contactList = [
    {
      title: "Aunt Mary",
      description: "202-348-8964",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Eveline",
      description: "240-536-4122",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Alex",
      description: "301-478-9514",
      image: require("../assets/img/scenery.jpg")
    },
  ];

  vehicleList = [
    {
      title: "Chevy Volt",
      description: "License Plate: 56HBL8",
      image: require("../assets/img/scenery.jpg")
    },
  ];



  render() {
    return (
      <View style={styles.innerContainer}>
        <Form formElements={this.formElements} />
        <Text> </Text>
        <Text bold='true' size='h6' align='center' color='#663399'>Emergency Contacts</Text>
        <ListView data={this.contactList} />
        <Text bold='true' size='h6' align='center' color='#663399' >My Vehicles</Text>
        <ListView data={this.vehicleList} />
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
    flexDirection: "column",
  }
});
