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
  Modal,
  Button,
} from 'react-native';
import styles from './UserProfile.scss';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useAuthState } from '@min-two/user-iso';
import { useAuthDispatch, doLogout } from '@min-two/user-iso';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavBar from '../NavBar';
// import { Feather } from '@expo/vector-icons';

const UserProfile = () => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();

  const dispatch = useScreenDispatch();
  const authDispatch = useAuthDispatch();

  const [showModal, setShowModal] = useState(false);

  const removeUser = async () => {
    try {
      // Removing the item from AsyncStorage
      await AsyncStorage.removeItem('user');
      // Setting the state to indicate that item is removed
    } catch (error) {
      console.log('Error removing user: ', error);
    }
  };

  const handleLogout = async () => {
    navigation.navigate('Home');
    changeScreen(dispatch, 'Landing');
    doLogout(authDispatch);
    removeUser();
  };

  function renderModal() {
    // List of Locations

    return (
      // Pop up screen for User to select location
      <Modal
        visible={showModal}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBttn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelBttnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutConfirmBttn}
                onPress={handleLogout}
              >
                <Text style={styles.logoutConfirmBttnText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

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
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => {
              changeScreen(dispatch, 'AccountInfo');
              navigation.navigate('AccountInfo');
            }}
          >
            <MaterialCommunityIcons
              name='account-edit-outline'
              size={26}
              color='black'
            />
            <Text style={styles.profileText}>Account Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => {
              changeScreen(dispatch, 'Security');
              navigation.navigate('Security');
            }}
          >
            <MaterialCommunityIcons
              name='lock-open-outline'
              size={25}
              color='black'
            />
            <Text style={styles.profileText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons name='logout' size={24} color='black' />
            <Text style={styles.profileText}>Log Out</Text>
          </TouchableOpacity>
          {renderModal()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export { UserProfile };
