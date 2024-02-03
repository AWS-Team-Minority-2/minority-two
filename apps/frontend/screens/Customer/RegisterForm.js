import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useRegisterForm } from './hooks/RegisterHook';
// import classNames from 'classnames';

import styles from './sass/Customer.scss';

const RegisterForm = () => {
  const {
    handleFormChange,
    returnPasswordValidator,
    passwordError,
    validatorFailed,
    canFormBeSubmitted,
    emailError,
    register,
    submitting,
  } = useRegisterForm();

  return (
    <View>
      {/* Name Input */}
      <View style={styles.loginFieldsContainer}>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>First Name</Text>
          <TextInput
            style={styles.inputContainer}
            onChangeText={(newText) => handleFormChange('firstName', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Last Name</Text>
          <TextInput
            style={styles.inputContainer}
            onChangeText={(newText) => handleFormChange('lastName', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Phone Number</Text>
          <TextInput
            style={styles.inputContainer}
            keyboardType='numeric'
            onChangeText={(newText) => handleFormChange('phoneNumber', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Email Address</Text>
          <TextInput
            style={
              !emailError ? styles.inputContainer : styles.inputContainerError
            }
            placeholder='customer@gmail.com'
            onChangeText={(newText) => handleFormChange('email', newText)}
          />
          {emailError && (
            <Text style={styles.formErrorText}>Vaild email is required</Text>
          )}
        </View>

        {/* password valdation */}
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Password</Text>
          <TextInput
            style={
              !passwordError
                ? styles.inputContainer
                : styles.inputContainerError
            }
            secureTextEntry
            onChangeText={(newText) => handleFormChange('password', newText)}
          />
          {passwordError && (
            <Text style={styles.formErrorText}>{passwordError}</Text>
          )}
        </View>

        {returnPasswordValidator && (
          <View style={styles.fieldParent}>
            <Text style={styles.fieldHeader}>Confirm Password</Text>
            <TextInput
              style={
                !validatorFailed
                  ? styles.inputContainer
                  : styles.inputContainerError
              }
              secureTextEntry
              onChangeText={(newText) =>
                handleFormChange('passwordValidator', newText)
              }
            />
            {validatorFailed && (
              <Text style={styles.formErrorText}>Password must match</Text>
            )}
          </View>
        )}
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Address</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder='1234 Street Address'
            onChangeText={(newText) => handleFormChange('address', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>City</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder='New York'
            onChangeText={(newText) => handleFormChange('city', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>State</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder='NY'
            onChangeText={(newText) => handleFormChange('state', newText)}
          />
        </View>
        <View style={styles.fieldParent}>
          <Text style={styles.fieldHeader}>Zip Code</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder='11239'
            onChangeText={(newText) => handleFormChange('zipCode', newText)}
          />
        </View>
        <TouchableOpacity
          style={
            canFormBeSubmitted
              ? styles.registerBttn
              : styles.registerBttnDisabled
          }
          disabled={!canFormBeSubmitted || submitting}
          onPress={register}
        >
          {!submitting ? (
            <Text style={styles.loginText}>Create Account</Text>
          ) : (
            <ActivityIndicator size='small' color='#fff' />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { RegisterForm };
