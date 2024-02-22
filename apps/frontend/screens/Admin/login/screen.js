import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
// import { LoginForm } from './LoginForm';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';

import styles from '../sass/Admin.scss';
import { useAdmin } from '../hooks/useAdmin';

const AdminScreen = () => {
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();
  const { handleFormChange, loginFailed, login } = useAdmin();

  return (
    <SafeAreaView style={styles.screenLayout}>
      <View style={styles.screenAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, 'Landing');
            navigation.navigate('Home');
          }}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>

        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Hello Admin!</Text>
          <Text style={styles.subWelcomeText}>
            Please enter your 5 dight code to continue
          </Text>
        </View>

        <View style={styles.loginFieldsContainer}>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Admin Code</Text>
            <TextInput
              style={
                !loginFailed
                  ? styles.inputContainer
                  : styles.inputContainerError
              }
              secureTextEntry
              onChangeText={(newText) => handleFormChange(newText)}
            />
          </View>
          {loginFailed && (
            <Text style={styles.errorLoginText}>
              Please check your login details and try again
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.loginBttn} onPress={() => login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { AdminScreen };
