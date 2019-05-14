/**
 * @format
 * @flow
 */
<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';
import deviceStorage from './services/deviceStorage.js';
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabBar from "react-native-tab-bar-interaction";

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }

    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt
    });
  }

  render() {
    return (
        <TabBar>
          <TabBar.Item
              icon={require('./tab1.png')}
              selectedIcon={require('./tab1.png')}
              title="Tab1"
              screenBackgroundColor={{ backgroundColor: '#008080' }}
          >
            <View>
                {/*Page Content*/}
            </View>
          </TabBar.Item>
          <TabBar.Item
              icon={require('./tab2.png')}
              selectedIcon={require('./tab1.png')}
              title="Tab2"
              screenBackgroundColor={{ backgroundColor: '#F08080' }}
          >
              <View>
                  {/*Page Content*/}
              </View>
          </TabBar.Item>
          <TabBar.Item
              icon={require('./tab3.png')}
              selectedIcon={require('./tab1.png')}
              title="Tab3"
              screenBackgroundColor={{ backgroundColor: '#485d72' }}
          >
            <View>
                {/*Page Content*/}
            </View>
          </TabBar.Item>
        </TabBar>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Landing
  }
});

export default createAppContainer(AppNavigator);
