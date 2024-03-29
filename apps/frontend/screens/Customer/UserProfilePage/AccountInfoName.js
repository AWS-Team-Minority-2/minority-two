import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from 'react-native';
import styles from './AccInfo.scss';
import { useAuthState } from '@min-two/user-iso';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useCustomerActions } from '@min-two/actions-web';
import Toast from 'react-native-toast-message';

const AccountInfoName = ({ route, navigation }) => {
  const { id } = route.params;

  const goodNameChange = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Your name has been updated',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  const [showModal, setShowModal] = useState(false);
  const { handleName, changeName, canUpdate, nameChangeType, nameData } =
    useCustomerActions({ id });

  function handleMessage(event) {
    switch (event) {
      case 'first':
        return (
          'You are requesting your first name be changed to ' +
          nameData.firstName
        );
      case 'last':
        return (
          'You are requesting your last name be changed to ' + nameData.lastName
        );
      case 'both':
        return (
          'You are requesting to change both your first and last name to ' +
          nameData.firstName +
          ' ' +
          nameData.lastName
        );
      default:
        return 'Invalid event type.';
    }
  }

  function updateNameModal() {
    const confMessage = handleMessage(nameChangeType);
    return (
      <Modal
        visible={showModal && nameChangeType != null}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to change your name?
            </Text>
            <View style={styles.modalTextSecondaryContainer}>
              <Text style={styles.modalTextSecondary}>{confMessage}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBttn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelBttnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suspendConfirmBttn}
                onPress={() => {
                  setShowModal(false);
                  changeName(nameChangeType);

                  // navigation.navigate('UserHome');
                  // goodNameChange();
                }}
              >
                <Text style={styles.suspendConfirmBttnText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const { user: loggedUser } = useAuthState();

  // takes in id of the current user

  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            navigation.navigate('AccountInfo', {
              id,
            });
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
          onPress={() => setShowModal(true)}
          disabled={!canUpdate}
        >
          <Text style={styles.updateBttnText}>Update</Text>
        </TouchableOpacity>
      </View>
      {updateNameModal()}
    </SafeAreaView>
  );
};

export { AccountInfoName };
