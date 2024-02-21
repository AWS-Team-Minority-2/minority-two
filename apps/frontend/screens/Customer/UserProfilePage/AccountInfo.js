import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./AccInfo.scss";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useAuthState } from "@min-two/user-iso";
import { Feather } from "@expo/vector-icons";

const AccountInfo = () => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();

  const dispatch = useScreenDispatch();

  console.log(loggedUser);
  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, "Profile");
            navigation.navigate("UserProfile");
          }}
        >
          <Feather name="chevron-left" size={33} color="black" />
        </TouchableOpacity>

        <View style={styles.accInfoTextBox}>
          <Text style={styles.accInfoHeader}>Account Info</Text>
          <Text style={styles.accInfoText}>
            Edit your profile information down below
          </Text>

          <View style={styles.accInfoBoxes}>
            <View style={styles.border}>
              <TouchableOpacity
                style={styles.editBox}
                onPress={() => {
                  changeScreen(dispatch, "AccountInfoName");
                  navigation.navigate("AccountInfoName");
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Name</Text>
                  <Text style={styles.accInfo}>
                    {loggedUser.userMetadata.firstname}
                    {loggedUser.userMetadata.lastname}
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
                onPress={() => {
                  changeScreen(dispatch, "AccountInfoPhoneNumber");
                  navigation.navigate("AccountInfoPhoneNumber");
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Phone Number</Text>
                  <Text style={styles.accInfo}>
                    {loggedUser.userMetadata.phonenumber}
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
                onPress={() => {
                  changeScreen(dispatch, "AccountInfoEmail");
                  navigation.navigate("AccountInfoEmail");
                }}
              >
                <View style={styles.accBoxWords}>
                  <Text style={styles.accBoxTitle}>Email</Text>
                  <Text style={styles.accInfo}>
                    {loggedUser.userMetadata.email}
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { AccountInfo };
