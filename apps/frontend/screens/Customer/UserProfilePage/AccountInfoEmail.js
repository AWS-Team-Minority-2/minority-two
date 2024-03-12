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
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useAuthState } from '@min-two/user-iso';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import styles from './AccInfo.scss';
import { useCustomerActions } from '@min-two/actions-web';

const AccountInfoEmail = ({ route }) => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();
  const { id } = route.params;
  const [emailFailed, setEmailFailed] = useState(false);
  const { emailData, handleEmailChange, isEmailVaild, changeEmail } =
    useCustomerActions({
      id,
    });

  const [showModal, setShowModal] = useState(false);

  function updateEmailModal() {
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
              Are you sure you want to change your email?
            </Text>
            <View style={styles.modalTextSecondaryContainer}>
              <Text style={styles.modalTextSecondary}>
                Your new email will be {emailData}
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
                  changeEmail();
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
        <Text style={styles.accInfoHeader}>Email</Text>
        <Text style={styles.accInfoText}>Edit your email address</Text>

        <View style={styles.inputs}>
          <View
            style={
              !1 + 1 != 2 ? styles.inputWrapper : styles.inputWrapperFailed
            }
          >
            <TextInput
              style={styles.inputContainer}
              placeholder={loggedUser.userMetadata.email}
              id='inputField'
              onChangeText={(newText) => {
                setEmailFailed(false);
                handleEmailChange(newText);
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
          {emailFailed && (
            <Text style={styles.errorLoginText} errorLoginText>
              Please use the following format: user@account.com and try agian.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={
            emailData != '' ? styles.updateBttn : styles.updateBttnDisabled
          }
          disabled={emailData != '' ? false : true}
          onPress={() => {
            if (!isEmailVaild()) {
              setEmailFailed(true);
            } else {
              setShowModal(true);
            }
          }}
        >
          <Text style={styles.updateBttnText}>Update</Text>
        </TouchableOpacity>
      </View>
      {updateEmailModal()}
    </SafeAreaView>
  );
};

export { AccountInfoEmail };
