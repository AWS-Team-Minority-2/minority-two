import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { adminActions } from '@min-two/business-web';

import styles from '../sass/Admin.scss';

const EditBusiness = ({ route, navigation }) => {
  const { name, address, city, state, zipCode, renderType, verified, id } =
    route.params;
  const [showSuspendedModal, setShowSuspendedModal] = useState(false);

  const { suspend } = adminActions();

  const getHashedId = (id) => {
    const hiddenPart = id.slice(0, -4).replace(/./g, '*');
    const visiblePart = id.slice(-4);
    return hiddenPart.replace(/-/g, '-') + '-' + visiblePart;
  };

  function suspendModal() {
    // List of Locations

    return (
      // Pop up screen for User to select location
      <Modal
        visible={showSuspendedModal}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setShowSuspendedModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to unverify {name}
            </Text>
            <View style={styles.modalTextSecondaryContainer}>
              <Text style={styles.modalTextSecondary}>
                This will temporarily remove the business from the app.
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBttn}
                onPress={() => setShowSuspendedModal(false)}
              >
                <Text style={styles.cancelBttnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.suspendConfirmBttn}
                onPress={() => suspend()}
              >
                <Text style={styles.suspendConfirmBttnText}>Suspend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.editLayout}>
      <View style={styles.editAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            // changeScreen(dispatch, 'Profile');
            navigation.navigate('AdminPortal');
          }}
        >
          <Feather name='chevron-left' size={33} color='black' />
        </TouchableOpacity>

        <View style={styles.accInfoTextBox}>
          <Text style={styles.accInfoHeader}>{name} Settings</Text>
          <Text style={styles.accInfoText}>
            Edit business profile down below
          </Text>

          <View style={styles.accInfoBoxes}>
            <View style={styles.border}>
              <View style={styles.border}>
                <View
                  style={styles.editBox}
                  onPress={() => {
                    changeScreen(dispatch, 'AccountInfoPhoneNumber');
                    navigation.navigate('AccountInfoPhoneNumber');
                  }}
                >
                  <View style={styles.accBoxWords}>
                    <Text style={styles.accBoxTitle}>Store ID</Text>
                    <Text style={styles.accInfo}>{getHashedId(id)}</Text>
                  </View>
                </View>

                <View style={styles.divider}></View>
              </View>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, 'AccountInfoName');
                  navigation.navigate('AccountInfoName');
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Business Name</Text>
                  <Text style={styles.accInfo}>{name}</Text>
                </View>
                <Feather
                  name='edit-2'
                  size={20}
                  color='black'
                  style={styles.accEditIcon}
                />
              </TouchableOpacity>
              <View style={styles.divider}></View>
            </View>

            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, 'AccountInfoPhoneNumber');
                  navigation.navigate('AccountInfoPhoneNumber');
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Street Address</Text>
                  <Text style={styles.accInfo}>{address}</Text>
                  {city && (
                    <>
                      <Text style={styles.accInfo}>{city}</Text>
                      <Text style={styles.accInfo}>{state}</Text>
                      <Text style={styles.accInfo}>{zipCode}</Text>
                    </>
                  )}
                </View>
                <Feather
                  name='edit-2'
                  size={20}
                  color='black'
                  style={styles.accEditIcon}
                />
              </TouchableOpacity>

              <View style={styles.divider}></View>
            </View>

            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, 'AccountInfoPhoneNumber');
                  navigation.navigate('AccountInfoPhoneNumber');
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Home Screen Render</Text>
                  <Text style={styles.accInfo}>{renderType}</Text>
                </View>
                <Feather
                  name='edit-2'
                  size={20}
                  color='black'
                  style={styles.accEditIcon}
                />
              </TouchableOpacity>

              <View style={styles.divider}></View>
            </View>
          </View>
        </View>
        {verified ? (
          <TouchableOpacity
            style={styles.disapproveButton}
            onPress={() => {
              setShowSuspendedModal(true);
            }}
          >
            <Text style={styles.bttnTxt}>Suspened Business</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.approveButton}
            // onPress={() => login()}
          >
            <Text style={styles.bttnTxt}>Approve Business</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteBusinessBttn}
          //   onPress={() => login()}
        >
          <Text style={styles.deleteBusinessText}>Delete Business</Text>
        </TouchableOpacity>
      </View>
      {suspendModal()}
    </SafeAreaView>
  );
};

export { EditBusiness };
