import React, { useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import {
  BusinessLoginScreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
  ForgotPassword,
  Homescreen,
  UserHomeScreen,
  UserProfile,
  AdminPortalScreen,
  AdminScreen,
} from './screens';
import { AuthProvider, useAuthState } from '@min-two/user-iso';
// import UserProfile from './screens/Customer/UserProfilePage/UserProfile';
import { NavBar } from './screens/Customer/NavBar';
import {
  ScreenProvider,
  useScreenState,
  useScreenDispatch,
  changeScreen,
} from '@min-two/screen-iso';
import { UserMap } from './screens/Customer/UserHomePage/UserMap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDispatch, doLogin } from '@min-two/user-iso';
import { AccountInfo } from './screens/Customer/UserProfilePage/AccountInfo';
import { AccountInfoName } from './screens/Customer/UserProfilePage/AccountInfoName';
import { AccountInfoPhoneNumber } from './screens/Customer/UserProfilePage/AccountInfoPhoneNumber';
import { AccountInfoEmail } from './screens/Customer/UserProfilePage/AccountInfoEmail';
import { Security } from './screens/Customer/UserProfilePage/Security';
import { ChangePassword } from './screens/Customer/UserProfilePage/ChangePassword';

const Stack = createNativeStackNavigator();
const userPages = [UserHomeScreen, UserProfile];
const client = new ApolloClient({
  uri: 'http://localhost:6002/graphql',
  cache: new InMemoryCache(),
});

function NavigationController() {
  const navigation = useNavigation();
  const { current: screen } = useScreenState();
  const dispatch = useAuthDispatch();

  const noNavScreens = ['Landing', 'Register', 'Login'];
  const showNavBar = !noNavScreens.includes(screen);
  const screenDispatch = useScreenDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          // Item is present, navigate to user home or profile, adjust this according to your logic
          doLogin(dispatch, JSON.parse(value));
          changeScreen(screenDispatch, 'UserHome');
          navigation.navigate('UserHome');
        }
      } catch (error) {
        console.log('Error checking item: ', error);
      }
    };

    checkUser();
  }, []);

  return (
    <>
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
        <Stack.Screen name='UserMap' component={UserMap} />
        <Stack.Screen name='Admin' component={AdminScreen} />
        <Stack.Screen name='AdminPortal' component={AdminPortalScreen} />
        <Stack.Screen name='UserHome' component={UserHomeScreen} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='Security' component={Security} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='AccountInfo' component={AccountInfo} />
        <Stack.Screen name='AccountInfoName' component={AccountInfoName} />
        <Stack.Screen
          name='AccountInfoPhoneNumber'
          component={AccountInfoPhoneNumber}
        />
        <Stack.Screen name='AccountInfoEmail' component={AccountInfoEmail} />
      </Stack.Navigator>
      {showNavBar && <NavBar />}
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ScreenProvider>
          <NavigationContainer>
            <NavigationController />
          </NavigationContainer>
        </ScreenProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
