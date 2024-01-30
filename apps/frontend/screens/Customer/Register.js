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
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './sass/Customer.scss';

const CustomerRegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenLayout}>
      <ScrollView contentContainerStyle={styles.screenAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.navigate('CustomerLogin')}
        >
          <Feather name='chevron-left' size={40} color='black' />
        </TouchableOpacity>

        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subCreateText}>
            Get to shopping and enter your credentials to proceed
          </Text>
        </View>

        {/* Name Input */}
        <View style={styles.loginFieldsContainer}>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>First Name</Text>
            <TextInput style={styles.inputContainer} />
          </View>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Last Name</Text>
            <TextInput style={styles.inputContainer} />
          </View>

          {/* Phone Number Input */}
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Phone Number</Text>
            <TextInput style={styles.inputContainer} />
          </View>

          {/* Email Input */}
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Email Address</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder='customer@gmail.com'
            />
          </View>

          {/*  Password Input */}
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Password</Text>
            <TextInput style={styles.inputContainer} secureTextEntry />
          </View>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Confirm Password</Text>
            <TextInput style={styles.inputContainer} secureTextEntry />
          </View>

          {/*  Address/State/City/Zip Code Input */}
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Address</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder='123 StreetName Rd'
            />
          </View>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>City</Text>
            <TextInput style={styles.inputContainer} />
          </View>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>State</Text>
            <TextInput style={styles.inputContainer} />
          </View>
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Zip Code</Text>
            <TextInput style={styles.inputContainer} />
          </View>

          {/*  Sign up button */}
          <TouchableOpacity style={styles.registerBttn}>
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>
          <View style={styles.RegistersubOptions}>
            <Text style={styles.RegistersubOptionsText}>Or Register With</Text>
          </View>
          <TouchableOpacity style={styles.RegisterotherProviderContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/amazon.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.otherProviderText}>Register with Amazon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RegisterotherProviderContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/google.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.otherProviderText}>Register with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.RegisterbusinessAccountContainer}>
          <View style={styles.subOneText}>
            <Text>Have an account?</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.subTwoText}
              onPress={() => navigation.navigate('CustomerLogin')}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { CustomerRegisterScreen };
