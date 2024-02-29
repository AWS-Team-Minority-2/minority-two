import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import styles from './AccInfo.scss';
import { useAuthState } from '@min-two/user-iso';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useCustomerActions } from '@min-two/actions-web';

const AccountInfoName = ({ route, navigation }) => {
  const { user: loggedUser } = useAuthState();
  const { id } = route.params;

  const { handleName, changeName, canUpdate } = useCustomerActions({ id });

  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            navigation.navigate('AccountInfo');
          }}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>
        <Text style={styles.accInfoHeader}>Name</Text>
        <Text style={styles.accInfoText}>
          This is the name people will see throughout Nexa when referring to you
        </Text>

        <View style={styles.inputs}>
          <Text style={styles.inputHeader}>First Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputContainer}
              placeholder={loggedUser.userMetadata.firstname}
              id='inputField'
              onChangeText={(newText) => handleName('first', newText)}
            />
            <TouchableOpacity>
              <MaterialIcons
                name='clear'
                size={18}
                color='black'
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHeader}>Last Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputContainer}
              placeholder={loggedUser.userMetadata.lastname}
              onChangeText={(newText) => handleName('last', newText)}
            />
            <TouchableOpacity>
              <MaterialIcons
                name='clear'
                size={18}
                color='black'
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={canUpdate ? styles.updateBttn : styles.updateBttnDisabled}
          onPress={changeName}
          disabled={!canUpdate}
        >
          <Text style={styles.updateBttnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { AccountInfoName };
