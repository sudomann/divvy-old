import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, Image } from 'react-native';
import {
  Text, Icon, Button, Input, TextArea, Picker, DatePicker,
  FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem,
  Notification, NotificationBarManager, FloatingButton, Form, CardList,
  ListView, NavBarLeft, NavBar, NavBarBody, NavBarRight,
  NavBarButton, TabItem, TabBar, PillView
} from "@99xt/first-born";
import { HomeScreen } from './HomeScreen';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const backend = axios.create({
  //baseURL: 'https://thedivvy.app/api/',
  baseURL: '192.168.1.144:8000/api/',
  timeout: 1000
});


export class SignedInScreen extends Component {

  constructor(props) {
    super(props);
    /* this.state = {
      text: "",
      value: ""
    } */
  }

  componentDidMount() {
    NotificationBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    NotificationBarManager.unregisterMessageBar();
  }

  handleInputChange = (newState) => {
    this.setState(newState)
  }

  handleShowNotification = () => {
    NotificationBarManager.showAlert({
      message: 'This app is still in development!',
      // image: require("../assets/img/accessibility.png")
    });
  }

  handleDisplayAlert = (btnName) => {
    Alert.alert("Hello", btnName);
  }

  checkInputValidity = (text) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(text);
  }

  signOut = () => {
    AsyncStorage.removeItem('access_token')
    AsyncStorage.removeItem('refresh_token')
    this.props.navigation.popToTop();
  }

  actions = [
    {
      text: 'What\'s this?',
      icon: 'help',
      name: 'bt_accessibility',
      position: 2,
      onPress: () => Alert.alert('What\'s this?', 'You can post journeys using the the floating buttons')
    },
    {
      text: 'Post Journey',
      icon: 'pin',
      name: 'bt_room',
      position: 1,
      onPress: () => Alert.alert('Post Journey', 'Options will be added here to post as a driver/passenger')
    }
  ];

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

  historyData = [
    {
      title: "Heading 1",
      description: "Description 1",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Heading 2",
      description: "Description 2",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Heading 3",
      description: "Description 3",
      image: require("../assets/img/scenery.jpg")
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

  pillScenes = [
    { scene: <HomeScreen /> },
    { scene: <CardList data={this.historyData} /> },
    { scene: <ListView data={this.contactList} /> },
    { scene: <View style={styles.innerContainer}><Form formElements={this.formElements} /></View> },
  ];

  pillHeaders = [
    { title: 'Journey Board', icon: "map" },
    { title: 'History', icon: "history" },
    { title: 'Emergency Contacts', icon: "alert" },
    { title: 'Profile', icon: "profile" }
  ];

  render() {
    return (
      <View style={styles.container}>
        <NavBar>
          <NavBarLeft>
            <NavBarButton>
              <Image style={{
                flex: 1,
                alignSelf: 'center'
              }}
                resizeMode="contain"
                source={require('../assets/img/logo-white.png')}
              />
            </NavBarButton>
          </NavBarLeft>
          <NavBarBody>
            <Text>Divvy</Text>
          </NavBarBody>
          <NavBarRight>
            <NavBarButton onPress={this.signOut}>
                <Text>Sign Out</Text>
            </NavBarButton>
          </NavBarRight>
        </NavBar>
        <PillView pillHeaders={this.pillHeaders} pillScenes={this.pillScenes} />
        <Notification ref={"alert"} />
        <FloatingButton actions={this.actions} />
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
