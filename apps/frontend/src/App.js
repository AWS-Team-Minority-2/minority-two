import {
  Homescreen,
  CustomerLoginScreen,
  CustomerRegisterScreen,
} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );
}

registerRootComponent(App);
