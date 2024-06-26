import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import {
  AdminPortalScreen,
  AdminScreen,
  BusinessLoginScreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
  ForgotPassword,
  Homescreen,
  UserHomeScreen,
  UserProfile,
  BasketScreen,
  OpenCarts,
  ProcessedScreen,
  RestaurantProfile,
} from './screens';
import { AuthProvider, useAuthState } from '@min-two/user-iso';
// The diffrence between a basket and a cart is that the basket are items from one store.
// A Cart is a collection of baskets from diffrent stores.
import {
  BasketProvider,
  CartsProvider,
  useCartsDispatch,
} from '@min-two/business-web';

// import UserProfile from './screens/Customer/UserProfilePage/UserProfile';
import { NavBar } from './screens/Customer/NavBar';
import { ServiceProfile } from './screens/Customer/ServiceProfile';
import { ServerProfile } from './screens/Customer/ServerProfile';
import { Review } from './screens/Customer/Review';

import { StoreProfile } from './screens/Customer/StoreProfile';
import {
  ScreenProvider,
  changeScreen,
  useScreenDispatch,
  useScreenState,
} from '@min-two/screen-iso';
import { doLogin, useAuthDispatch } from '@min-two/user-iso';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Browse } from './screens/Customer/Browse';
import { Favorites } from './screens/Customer/Favorites';
import { UserMap } from './screens/Customer/UserHomePage/UserMap';
import { AccountInfo } from './screens/Customer/UserProfilePage/AccountInfo';
import { AccountInfoEmail } from './screens/Customer/UserProfilePage/AccountInfoEmail';
import { AccountInfoName } from './screens/Customer/UserProfilePage/AccountInfoName';
import { AccountInfoPhoneNumber } from './screens/Customer/UserProfilePage/AccountInfoPhoneNumber';
import { ChangePassword } from './screens/Customer/UserProfilePage/ChangePassword';
import { Security } from './screens/Customer/UserProfilePage/Security';
import { ServicesBrowse } from './screens/Customer/ServicesBrowse';
import { RestaurantsBrowse } from './screens/Customer/RestaurantsBrowse';
import { ShopsBrowse } from './screens/Customer/ShopsBrowse';

import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { EditBusiness } from './screens/Admin/updates/editBusiness';
import { setCartOnMount } from '@min-two/business-web';
import { BusinessInsights } from './screens';
import { BusinessSideStore } from './screens/Business';

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
  const [user, setUser] = useState({});
  const cartDispatch = useCartsDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          try {
            doLogin(dispatch, JSON.parse(value));
            setUser(JSON.parse(value));
            changeScreen(screenDispatch, 'UserHome');
            navigation.navigate('UserHome');
          } catch (e) {
            navigation.navigate('AdminPortal');
          }
        }
      } catch (error) {
        console.log('Error checking item: ', error);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const checkCarts = async () => {
      try {
        const value = await AsyncStorage.getItem('carts');
        if (value !== null) {
          // setCartOnMount(cartDispatch, JSON.parse(value));
        }
      } catch (error) {
        console.log('Error checking item: ', error);
      }
    };

    checkCarts();
  }, []);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Homescreen} />
        <Stack.Screen name='Checkout' component={BasketScreen} />
        <Stack.Screen name='Carts' component={OpenCarts} />
        <Stack.Screen name='Complete' component={ProcessedScreen} />
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
        <Stack.Screen name='UserFavorites' component={Favorites} />
        <Stack.Screen name='UserBrowse' component={Browse} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='Security' component={Security} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='AccountInfo' component={AccountInfo} />
        <Stack.Screen name='AccountInfoName' component={AccountInfoName} />
        <Stack.Screen name='RestaurantProfile' component={RestaurantProfile} />
        <Stack.Screen
          name='AccountInfoPhoneNumber'
          component={AccountInfoPhoneNumber}
        />
        <Stack.Screen name='Review' component={Review} />
        <Stack.Screen name='AccountInfoEmail' component={AccountInfoEmail} />

        <Stack.Screen name='AdminBusinessEdit' component={EditBusiness} />
        <Stack.Screen name='ServicesBrowse' component={ServicesBrowse} />
        <Stack.Screen name='RestaurantsBrowse' component={RestaurantsBrowse} />
        <Stack.Screen name='ShopsBrowse' component={ShopsBrowse} />

        <Stack.Screen name='ServiceProfile' component={ServiceProfile} />
        <Stack.Screen name='ServerProfile' component={ServerProfile} />
        <Stack.Screen name='StoreProfile' component={StoreProfile} />
        <Stack.Screen name='BusinessInsights' component={BusinessInsights} />
        <Stack.Screen name='BusinessSideStore' component={BusinessSideStore} />
      </Stack.Navigator>
      {/* Pass in User Id to navbar to handle customer actions */}
      {showNavBar && <NavBar id={user.id} />}
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ScreenProvider>
            <CartsProvider>
              <BasketProvider>
                <NavigationContainer>
                  <NavigationController />
                </NavigationContainer>
              </BasketProvider>
            </CartsProvider>
          </ScreenProvider>
        </AuthProvider>
      </ApolloProvider>
      <Toast />
    </>
  );
}

registerRootComponent(App);
