import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import {
  BusinessLoginScreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
  ForgotPassword,
  Homescreen,
  UserHomeScreen,
} from './screens';
import { AuthProvider } from '@min-two/user-iso';
import { NavBar } from './screens/Customer/NavBar';
import { ScreenProvider, useScreenState } from '@min-two/screen-iso';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:6002/graphql',
  cache: new InMemoryCache(),
});

function NavigationController() {
  const { current: screen } = useScreenState();
  const noNavScreens = ['Landing', 'Register', 'Login'];
  const showNavBar = !noNavScreens.includes(screen);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Homescreen} />
        <Stack.Screen name='CustomerLogin' component={CustomerLoginScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen
          name='CustomerRegister'
          component={CustomerRegisterScreen}
        />
        <Stack.Screen name='BusinessLogin' component={BusinessLoginScreen} />
        <Stack.Screen name='UserHome' component={UserHomeScreen} />
      </Stack.Navigator>
      {showNavBar && <NavBar />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ScreenProvider>
          <NavigationController />
        </ScreenProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
