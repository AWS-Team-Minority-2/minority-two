import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import styles from "./AccInfo.scss";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useAuthState } from "@min-two/user-iso";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Security = ({ route, navigation }) => {
  const dispatch = useScreenDispatch();
  const { id } = route.params;

  const [showModal, setShowModal] = useState(false);
  const handleLogout = async () => {
    navigation.navigate("Home");
    changeScreen(dispatch, "Landing");
    doLogout(authDispatch);
    removeUser();
  };

  function renderModal() {
    // List of Locations

    return (
      // Pop up screen for User to select location
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBttn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelBttnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutConfirmBttn}
                onPress={handleLogout}
              >
                <Text style={styles.logoutConfirmBttnText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // console.log(loggedUser);
  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            navigation.navigate('UserProfile', {
              id,
            });
          }}
        >
          <Feather name="chevron-left" size={33} color="black" />
        </TouchableOpacity>

        <View style={styles.accInfoTextBox}>
          <Text style={styles.accInfoHeader}>Security</Text>
          <Text style={styles.accInfoText}>
            Change your password down below
          </Text>

          <View style={styles.securityBox}>
            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, "ChangePassword");
                  navigation.navigate("ChangePassword");
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Current Password</Text>
                  <Text style={styles.accInfo}>
                    {/* {loggedUser.password} */}
                    **********
                  </Text>
                </View>
                <Feather
                  name="edit-2"
                  size={20}
                  color="black"
                  style={styles.accEditIcon}
                />
              </TouchableOpacity>
              <View style={styles.divider}></View>
            </View>

            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => setShowModal(true)}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Delete Account</Text>
                </View>
                <AntDesign
                  name="delete"
                  size={20}
                  color="black"
                  style={styles.accEditIcon}
                />
                {/* <Feather
                  name="edit-2"
                  size={20}
                  color="black"
                  style={styles.accEditIcon}
                /> */}
              </TouchableOpacity>
              <View style={styles.divider}></View>
            </View>
            {renderModal()}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { Security };
