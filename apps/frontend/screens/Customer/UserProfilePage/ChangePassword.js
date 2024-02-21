import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import styles from "./AccInfo.scss";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useAuthState } from "@min-two/user-iso";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { user: loggedUser } = useAuthState();

  const dispatch = useScreenDispatch();

  //   const [inputValue, setInputValue] = useState(
  //     loggedUser.userMetadata.firstname
  //   );
  //   const clearInput = () => {
  //     setInputValue(""); // Clear the input value
  //   };

  return (
    <SafeAreaView style={styles.profileLayout}>
      <View style={styles.profileAdjustment}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, "Security");
            navigation.navigate("Security");
          }}
        >
          <Feather name="chevron-left" size={33} color="black" />
        </TouchableOpacity>
        <Text style={styles.accInfoHeader}>Change Password</Text>
        <Text style={styles.accInfoText}>
          Password must be at least 8 characters long, and contain at least one
          digit and one non-digit character
        </Text>

        <View style={styles.inputs}>
          <Text style={styles.inputHeader}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputContainer}
              defaultValue={loggedUser.userMetadata.password}
              id="inputField"
              //   onChangeText={(newText) => setInputValue(newText)} // Update input value
              // onChangeText={(newText) => handleFormChange('firstName', newText)}
            />
            <TouchableOpacity>
              <MaterialIcons
                name="remove-red-eye"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHeader}>Confirm new Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputContainer}
              //   defaultValue={loggedUser.userMetadata.lastname}
              // onChangeText={(newText) => handleFormChange('firstName', newText)}
            />
            <TouchableOpacity>
              <MaterialIcons
                name="remove-red-eye"
                size={20}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.updateBttn}>
          <Text style={styles.updateBttnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { ChangePassword };
