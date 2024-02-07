import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Path,
  svg,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './sass/Business.scss'

const BusinessLoginScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.screenLayout}>
          <View style={styles.screenAdjustment}>
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => navigation.navigate('Home')}
            >
              <Feather name='chevron-left' size={40} color='black' />
            </TouchableOpacity>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Text style={styles.subWelcomeText}>
                Hello there, sign in to continue!
              </Text>
            </View>
            <View style={styles.loginFieldsContainer}>
              <View style={styles.fieldParent}>
                <Text style={styles.fieldHeader}>Email Address</Text>
                <TextInput
                  style={styles.inputContainer}
                  placeholder='Business@gmail.com'
                />
              </View>
    
              <View style={styles.fieldParent}>
                <Text style={styles.fieldHeader}>Password</Text>
                <TextInput style={styles.inputContainer} secureTextEntry />
              </View>
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text styles={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBttn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.subOptions}>
              <Text style={styles.subOptionsText}>Or Login With</Text>
            </View>
            <TouchableOpacity style={styles.otherProviderContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('./assets/amazon.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.otherProviderText}>Continue with Amazon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherProviderContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('./assets/google.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.otherProviderText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.businessAccountContainer}>
            <View style={styles.subOneText}>
              <Text>Want to set up a business?</Text>
            </View>
            <TouchableOpacity>
              <Text
                style={styles.subTwoText}
                onPress={() => navigation.navigate('BusinessRegister')}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    };
    
    export { BusinessLoginScreen };
    