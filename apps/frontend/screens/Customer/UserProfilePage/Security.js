import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './AccInfo.scss';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useAuthState } from '@min-two/user-iso';
import { Feather } from '@expo/vector-icons';

const Security = () => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();

  const dispatch = useScreenDispatch();

  // console.log(loggedUser);
  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, 'Profile');
            navigation.navigate('UserProfile');
          }}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>

        <View style={styles.accInfoTextBox}>
          <Text style={styles.accInfoHeader}>Security</Text>
          <Text style={styles.accInfoText}>
            Change your password down below
          </Text>

          <View style={styles.securityBox}>
            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, 'ChangePassword');
                  navigation.navigate('ChangePassword');
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Current Password</Text>
                  <Text style={styles.accInfo}>
                    {/* {loggedUser.password} */}
                    **********
                  </Text>
                </View>
                <Feather
                  name='edit-2'
                  size={20}
                  color='black'
                  style={styles.accEditIcon}
                />
              </TouchableOpacity>
              <View style={styles.divider}></View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { Security };
