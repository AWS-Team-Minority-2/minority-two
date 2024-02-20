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

const AdminScreen = () => {
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();

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
              placeholder='00000'
              onChangeText={(newText) => handleFormChange('email', newText)}
              style={styles.inputContainer}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.loginBttn}
          onPress={() => navigation.navigate('AdminPortal')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { AdminScreen };
