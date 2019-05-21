<script src="http://localhost:8097"></script>
import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignedInScreen } from './screens/SignedInScreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppStack = createStackNavigator({
  Home: SignedInScreen
},
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    }
  });


const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Register: RegistrationScreen,
});

const AppNavigator = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: AppStack,
},
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

