import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './UserProfile.scss';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useAuthState } from '@min-two/user-iso';
import NavBar from '../NavBar';
// import { Feather } from '@expo/vector-icons';

const UserProfile = () => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const dispatch = useScreenDispatch();
  const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar
  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <View style={styles.profileHeader}>
          <FontAwesome
            name='user-circle-o'
            size={65}
            color='black'
            style={styles.profileUser}
          />

          <Text style={styles.profileName}>
            {loggedUser.userMetadata.firstname}
            {loggedUser.userMetadata.lastname}
          </Text>
        </View>
        <View style={styles.profileBottom}>
          <Text style={styles.profileBottomHeader}>Nexa Account</Text>
          <TouchableOpacity style={styles.profileBox}>
            <MaterialCommunityIcons
              name='account-edit-outline'
              size={26}
              color='black'
            />
            <Text style={styles.profileText}>Account Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBox}>
            <MaterialCommunityIcons
              name='lock-open-outline'
              size={25}
              color='black'
            />
            <Text style={styles.profileText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => {
              changeScreen(dispatch, 'Landing');
              navigation.navigate('Home');
            }}
          >
            <MaterialCommunityIcons name='logout' size={24} color='black' />
            <Text style={styles.profileText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        {/* <NavBar
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
          navigation={navigation}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export { UserProfile };
