import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RegisterForm } from './RegisterForm';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';

import styles from './sass/Customer.scss';

const CustomerRegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();

  return (
    <SafeAreaView style={styles.screenLayout}>
      <ScrollView contentContainerStyle={styles.screenAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, 'Landing');
            navigation.navigate('CustomerLogin');
          }}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>

        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subCreateText}>
            Get to shopping and enter your credentials to proceed
          </Text>
        </View>
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export { CustomerRegisterScreen };
