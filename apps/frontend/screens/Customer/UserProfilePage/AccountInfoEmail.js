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

const AccountInfoEmail = () => {
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
            changeScreen(dispatch, "AccountInfo");
            navigation.navigate("AccountInfo");
          }}
        >
          <Feather name="chevron-left" size={33} color="black" />
        </TouchableOpacity>
        <Text style={styles.accInfoHeader}>Email</Text>
        <Text style={styles.accInfoText}>
          Edit your email address
        </Text>

        <View style={styles.inputs}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputContainer}
              defaultValue={loggedUser.userMetadata.email}
              id="inputField"
            />
            <TouchableOpacity>
              <MaterialIcons
                name="clear"
                size={18}
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

export { AccountInfoEmail };
