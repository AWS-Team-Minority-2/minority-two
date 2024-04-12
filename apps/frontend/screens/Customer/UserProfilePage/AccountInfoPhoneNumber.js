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
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useAuthState } from '@min-two/user-iso';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useCustomerActions } from '@min-two/actions-web';

const AccountInfoPhoneNumber = ({ route }) => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();
  const { id } = route.params;
  const [numberFormatFailed, setNumberFormatFailed] = useState(false);

  const {
    handlePhoneNumberChange,
    changePhoneNumber,
    numberData,
    isNumberValid,
  } = useCustomerActions({
    id,
  });
  const [showModal, setShowModal] = useState(false);

  function updateNumberModal() {
    return (
      <Modal
        visible={showModal}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to change your number?
            </Text>
            <View style={styles.modalTextSecondaryContainer}>
              <Text style={styles.modalTextSecondary}>
                Your new number will be {numberData}
              </Text>
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
                  changePhoneNumber();
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
        <Text style={styles.accInfoHeader}>Phone Number</Text>
        <Text style={styles.accInfoText}>Edit your phone number</Text>

        <View style={styles.inputs}>
          <View
            style={
              !numberFormatFailed
                ? styles.inputWrapper
                : styles.inputWrapperFailed
            }
          >
            <TextInput
              style={styles.inputContainer}
              placeholder={loggedUser.userMetadata.phonenumber}
              id='inputField'
              onChangeText={(newText) => {
                setNumberFormatFailed(false);
                handlePhoneNumberChange(newText);
              }}
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
          {numberFormatFailed && (
            <Text style={styles.errorLoginText} errorLoginText>
              Please enter your number like this: 123-123-1234 and try again
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={
            numberData != '' ? styles.updateBttn : styles.updateBttnDisabled
          }
          onPress={() => {
            if (!isNumberValid()) {
              setNumberFormatFailed(true);
            } else {
              setShowModal(true);
            }
          }}
          disabled={numberData != '' ? false : true}
        >
          <Text style={styles.updateBttnText}>Update</Text>
        </TouchableOpacity>
      </View>
      {updateNumberModal()}
    </SafeAreaView>
  );
};

export { AccountInfoPhoneNumber };
