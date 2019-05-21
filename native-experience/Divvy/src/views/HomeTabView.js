import React, { Component } from 'react';
import { StyleSheet, View, Alert, Styles } from 'react-native';
import {
  Text, Icon, Button, Picker, FormDatePicker, FormInput,
  FormTextArea, FormPicker, Card, ListItem, ListView
} from "@99xt/first-born";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';

export class HomeTabView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      value: ""
    }
  }

  /*  handleTextChange = (text) => {
       this.setState({ text: text })
   }
*/
  checkInputValidity = (text) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(text);
  }


  journeyList = [
    {
      title: "Silver Spring",
      description: "May 2, 2019",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Bowie",
      description: "June 6, 2019",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Baltimore",
      description: "June 7, 2019",
      image: require("../assets/img/scenery.jpg")
    },
  ];


  render() {
    return (
      <View >
        <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            </MapView>
          </View>
        <View style={styles.innerContainer}>
          
          <ScrollView>
            <View >
              <ListView data={this.journeyList} />
            </View>
          </ScrollView>
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
    padding: 5,

    flexDirection: "column",
  },
  mapContainer: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
