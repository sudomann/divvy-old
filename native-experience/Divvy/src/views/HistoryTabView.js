import React, { Component } from 'react';
import { StyleSheet, View, Alert, Styles } from 'react-native';
import {
  Text, Icon, Button, Picker, FormDatePicker, FormInput,
  FormTextArea, FormPicker, Card, ListItem, CardList
} from "@99xt/first-born";

export class HistoryTabView extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  historyData = [
    {
      title: "Downtown Baltimore",
      description: "May 20, 2019",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Silver Spring",
      description: "May 15th, 2019",
      image: require("../assets/img/scenery.jpg")
    },
    {
      title: "Federick",
      description: "May 16th, 2019",
      image: require("../assets/img/scenery.jpg")
    },
  ];

  render() {
    return (
      <View style={styles.innerContainer}>
        <CardList data={this.historyData} />
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
