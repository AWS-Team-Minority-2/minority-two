import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import {
  BusinessLoginScreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
  ForgotPassword,
  Homescreen,
  UserHomeScreen,
  UserProfile,
} from "./screens";
import { AuthProvider } from "@min-two/user-iso";
// import UserProfile from './screens/Customer/UserProfilePage/UserProfile';
import { NavBar } from "./screens/Customer/NavBar";
import { ScreenProvider, useScreenState } from "@min-two/screen-iso";
import { UserMap } from "./screens/Customer/UserHomePage/UserMap";

const Stack = createNativeStackNavigator();
const userPages = [UserHomeScreen, UserProfile];
const client = new ApolloClient({
  uri: "http://localhost:6002/graphql",
  cache: new InMemoryCache(),
});

function NavigationController() {
  const { current: screen } = useScreenState();
  const noNavScreens = ["Landing", "Register", "Login"];
  const showNavBar = !noNavScreens.includes(screen);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="CustomerRegister"
          component={CustomerRegisterScreen}
        />
        <Stack.Screen name="BusinessLogin" component={BusinessLoginScreen} /> */}
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserMap" component={UserMap} />
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
