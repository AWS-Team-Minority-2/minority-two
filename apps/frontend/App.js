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
  UserHomeScreen
} from './screens';
import { NavBar } from './screens/Customer/NavBar';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:6002/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name='Home' component={Homescreen} />
          <Stack.Screen name='CustomerLogin' component={CustomerLoginScreen} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen
            name='CustomerRegister'
            component={CustomerRegisterScreen}
          /> */}
          {/* Add BusinessLoginScreen to the stack */}
          {/* <Stack.Screen
            name='BusinessLogin'
            component={BusinessLoginScreen}
          /> */}
          {/* update when user home page is created */}
          <Stack.Screen name='UserHome' component={UserHomeScreen} />
        </Stack.Navigator>
        <NavBar/>
      </NavigationContainer>
    </ApolloProvider>
  );
}

registerRootComponent(App);
