import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, Image, BackHandler } from 'react-native';
import {
  Text, Icon, Button, Input, TextArea, Picker, DatePicker,
  FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem,
  Notification, NotificationBarManager, FloatingButton, Form, CardList,
  ListView, NavBarLeft, NavBar, NavBarBody, NavBarRight,
  NavBarButton, TabItem, TabBar, PillView
} from "@99xt/first-born";
import { HomeTabView } from '../views/HomeTabView';
import { HistoryTabView } from '../views/HistoryTabView';
import { AccountTabView } from '../views/AccountTabView';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { NavigationActions, StackActions } from 'react-navigation';

const backend = axios.create({
  //baseURL: 'https://thedivvy.app/api/',
  baseURL: '192.168.1.144:8000/api/',
  timeout: 1000
});


export class SignedInScreen extends Component {

  constructor(props) {
    super(props);

  }
  static navigationOptions = {
    headerLeft: null,
  };
  componentDidMount() {
    NotificationBarManager.registerMessageBar(this.refs.alert);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true
    })
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

    //doesnt work
    //this.props.navigation.dispatch(SwitchActions.jumpTo('Auth'));
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      key: null, // <-- is required, or it'll keep looking in currently active navigator
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    }))
  }

  actions = [
    {
      text: 'Post Journey',
      icon: 'pin',
      name: 'bt_post',
      position: 1,
      onPress: () => Alert.alert('Post Journey', 'Post a journey as a driver?')
    },
    {
      text: 'Request Transport',
      icon: 'pin',
      name: 'bt_request',
      position: 2,
      onPress: () => Alert.alert('Request Transport', 'Request a driver for a journey?')
    },
  ];




  pillScenes = [
    { scene: <HomeTabView /> },
    { scene: <HistoryTabView /> },
    { scene: <AccountTabView /> },
  ];

  pillHeaders = [
    { title: 'Journey Board', icon: "map" },
    { title: 'History', icon: "history" },
    { title: 'Account', icon: "alert" },
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
