// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { registerRootComponent } from 'expo';
// import {
//   UserHomeScreen,
// } from './UserHomePage/UserHomeScreen';
// import { AuthProvider } from '@min-two/user-iso';
// import NavBar from './NavBar';
// // import UserProfile from './screens/Customer/UserProfilePage/UserProfile';

// const Stack = createNativeStackNavigator();

// const client = new ApolloClient({
//   uri: 'http://localhost:6002/graphql',
//   cache: new InMemoryCache(),
// });

// export default function UserPages() {
//     const navigation = useNavigation();
//     const handleButtonPress = (buttonName) => {
//         setSelectedButton(buttonName);
//       };
//       const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar
//   return (
//     <ApolloProvider client={client}>
//       <AuthProvider>
//         <NavigationContainer>
//           <Stack.Navigator
//             screenOptions={{
//               headerShown: false,
//             }}
//           >
//             <Stack.Screen name='UserHome' component={UserHomeScreen} />
//             {/* <Stack.Screen name='UserProfile' component={UserProfile} /> */}
//             <NavBar
//           handleButtonPress={handleButtonPress}
//           selectedButton={selectedButton}
//           navigation={navigation}
//         />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </AuthProvider>
//     </ApolloProvider>
//   );
// }

// registerRootComponent(UserPages);
