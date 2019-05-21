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
      value: "1",
      label: "1"
    },
    {
      value: "2",
      label: "2"
    },
    {
      value: "3",
      label: "3"
    }
  ];

  formElements = [
    {
      label: "Full Name",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ text: value }),
      placeholder: "John Doe"
    },
    {
      label: "Email",
      type: "text",
      onChangeText: (value) => this.handleInputChange({ text: value }),
      placeholder: "john.doe@gmail.com",
      isValid: (value) => this.checkInputValidity(value)
    },
    {
      label: "Type",
      type: "picker",
      onValueChange: (value) => this.handleInputChange({ someStateVar: value }),
      pickerData: this.pickerData
    },
    {
      label: "Address",
      type: "textarea",
      onChangeText: (value) => this.handleInputChange({ text: value })
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



  render() {
    return (
      <View style={styles.innerContainer}>
        <Text>This is Acount Tab View</Text>
        <Form formElements={this.formElements} />
        <ListView data={this.contactList} />
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
