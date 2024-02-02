import {
  Homescreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
          <Stack.Screen name='Home' component={Homescreen} />
          <Stack.Screen name='CustomerLogin' component={CustomerLoginScreen} />
          <Stack.Screen
            name='CustomerRegister'
            component={CustomerRegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

registerRootComponent(App);
