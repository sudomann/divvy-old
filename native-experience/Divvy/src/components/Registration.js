import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      phone: '',
      gender: '',
      is_minor: '',
      error: '',
      loading: false,
    };

    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const { email,
      password,
      password_confirmation,
      first_name,
      last_name,
      phone,
      gender,
      is_minor
    } = this.state;

    this.setState({ error: '', loading: true });

    // NOTE Post to HTTPS only in production
    axios.post("http://192.168.0.144:8000/api/auth/users/", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      gender: gender,
      is_minor: is_minor
    })
      .then((response) => {
        deviceStorage.saveKey("jwt", response.data.access);
        this.setState({ error: '', loading: false });

        // this.props.newJWT(response.data.access);
      })
      .catch((error) => {
        console.log(error);
        this.onRegistrationFail();
      });
  }

  

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { email,
      password,
      password_confirmation,
      first_name,
      last_name,
      phone,
      gender,
      is_minor, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>

        <View style={form}>
          <View style={section}>
            <Input
              keyboardType={'email-address'}
              placeholder="student@school.edu"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="True/False"
              label="Am a Minor"
              value={is_minor}
              onChangeText={is_minor => this.setState({ is_minor })}
            />
          </View>

          <View style={section}>
            <Input
              label="First Name"
              value={first_name}
              onChangeText={first_name => this.setState({ first_name })}
            />
          </View>

          <View style={section}>
            <Input
              label="Last Name"
              value={last_name}
              onChangeText={last_name => this.setState({ last_name })}
            />
          </View>

          <View style={section}>
            <Input
              keyboardType={'phone-pad'}
              label="Phone Number"
              value={phone}
              onChangeText={phone => this.setState({ phone })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="F/M/U"
              label="Gender"
              value={gender}
              onChangeText={gender => this.setState({ gender })}
            />
          </View>
          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.registerUser}>
              Register
            </Button>
            :
            <Loading size={'large'} />
          }


        </View>
        <TextLink onPress={this.props.authSwitch}>
          Already have an account? Log in!
        </TextLink>

      </Fragment>
    );
  }


}



const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export { Registration };
