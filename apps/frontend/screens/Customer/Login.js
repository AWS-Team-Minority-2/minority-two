import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LoginForm } from './LoginForm';

import styles from './sass/Customer.scss';

const CustomerLoginScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenLayout}>
      <View style={styles.screenAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subWelcomeText}>
            Hello there, sign in to continue!
          </Text>
        </View>

        <LoginForm />

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
          <Text>Don’t have an account?</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={styles.subTwoText}
            onPress={() => navigation.navigate('CustomerRegister')}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { CustomerLoginScreen };
