import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer, useRoute } from '@react-navigation/native';
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
} from './screens';
import { AuthProvider } from '@min-two/user-iso';
// import UserProfile from './screens/Customer/UserProfilePage/UserProfile';
import { NavBar } from './screens/Customer/NavBar';

const Stack = createNativeStackNavigator();
const userPages = [UserHomeScreen, UserProfile]
const client = new ApolloClient({
  uri: 'http://localhost:6002/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Home' component={Homescreen} />
            <Stack.Screen
              name='CustomerLogin'
              component={CustomerLoginScreen}
            />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen
              name='CustomerRegister'
              component={CustomerRegisterScreen}
            />
            {/* Add BusinessLoginScreen to the stack */}
            <Stack.Screen
              name='BusinessLogin'
              component={BusinessLoginScreen}
            />
            {/* update when user home page is created */}
            <Stack.Screen name='UserHome' component={UserHomeScreen} />
            <Stack.Screen name='UserProfile' component={UserProfile} />
          </Stack.Navigator>
          {/* {useRoute} */}
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
