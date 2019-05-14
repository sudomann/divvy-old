import React, { Component } from 'react';
import { StyleSheet, View, Alert,Styles } from 'react-native';
import { Text, Icon, Button, Picker, FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem } from "@99xt/first-born";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export class HomeScreen extends Component {

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

    render() {
        return (
            <View style={styles.innerContainer}>
            <View style={styles.mapContainer}>
            <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView></View>
            {/*
                <Button rounded>
                    <Icon name="heart" />
                    <Text>Rounded</Text>
                </Button>
                <Button rounded block>
                    <Icon name="heart" />
                    <Text>{"Rounded & Block"}</Text>
                </Button>
                <Button outline transparent>
                    <Icon name="heart" />
                    <Text>{"Outline & Transparent"}</Text>
                </Button>
                <ListItem title="Heading Only" />
                <ListItem title="Heading" description="And Description" />
                <ListItem title="Heading" description="Description" image={require("../assets/img/scenery.jpg")} />
                <ListItem title="Heading" description="Description" image={require("../assets/img/scenery.jpg")} >
                    <ListItem title="Heading" description="And Description" />
                </ListItem>
                <Card title="Heading Only" />
                <Card title="Heading" description="And Description" />*/}
                <Card title="Journey to Federick" description="Departure on 5/16/2019" image={require("../assets/img/scenery.jpg")} />
                {/*<FormDatePicker label="Date" />
                <FormInput label="Email" placeholder="john.doe@gmail.com" onChangeText={this.handleTextChange} isValid={this.checkInputValidity} />
                <FormTextArea label="Description" onChangeText={this.handleTextChange} />
                <FormPicker label="Number">
                    <Picker.Item value="1" label="1" />
                    <Picker.Item value="2" label="2" />
                    <Picker.Item value="3" label="3" />
                </FormPicker>*/}
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
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});
