import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, Icon, Button, Picker, FormDatePicker, FormInput, FormTextArea, FormPicker, Card, ListItem } from "@99xt/first-born";

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
                <ListItem title="Heading" description="Description" image={require("../assets/img/scenery.png")} />
                <ListItem title="Heading" description="Description" image={require("../assets/img/scenery.png")} >
                    <ListItem title="Heading" description="And Description" />
                </ListItem>
                <Card title="Heading Only" />
                <Card title="Heading" description="And Description" />
                <Card title="Heading" description="Description" image={require("../assets/img/scenery.png")} />
                <FormDatePicker label="Date" />
                {/*<FormInput label="Email" placeholder="john.doe@gmail.com" onChangeText={this.handleTextChange} isValid={this.checkInputValidity} />
                <FormTextArea label="Description" onChangeText={this.handleTextChange} />*/}
                <FormPicker label="Number">
                    <Picker.Item value="1" label="1" />
                    <Picker.Item value="2" label="2" />
                    <Picker.Item value="3" label="3" />
                </FormPicker>
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
