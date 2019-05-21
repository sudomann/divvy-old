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

  render() {
    return (
      <View style={styles.innerContainer}>
        <Text>This is History Tab View</Text>
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
