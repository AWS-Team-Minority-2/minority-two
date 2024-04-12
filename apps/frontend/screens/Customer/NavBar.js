import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from './sass/NavBar.scss';
import { useNavigation } from '@react-navigation/native';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';

const NavBar = ({ id }) => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar

  // Handles changing the current button clicked in the NavBar
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // Handles changing the current address and leading the pop up screen to close
  const handleAddressClick = (address) => {
    setPickedAddress(address);
    setLocation(false);
  };
  return (
    <View style={styles.border}>
      <View style={styles.navBar}>
        {/* Home Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => [
            handleButtonPress('Home'),
            navigation.navigate('UserHome'),
          ]}
        >
          <AntDesign
            name='home'
            size={20}
            color='black'
            style={[
              styles.button,
              selectedButton === 'Home' && styles.selectedButton,
            ]}
          />
          <Text
            style={[
              styles.buttonword,
              selectedButton === 'Home' && styles.selectedButton,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Favorites Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => [
            handleButtonPress("Favorites"),
            navigation.navigate("UserFavorites"),
          ]}
          


        >
          <MaterialIcons
            name='favorite-outline'
            size={21}
            color='black'
            style={[
              styles.button,
              selectedButton === 'Favorites' && styles.selectedButton,
            ]}
          />
          <Text
            style={[
              styles.buttonword,
              selectedButton === 'Favorites' && styles.selectedButton,
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>

        {/* Browse Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => [
            handleButtonPress("Browse"),
            navigation.navigate("UserBrowse"),
          ]}

        >
          <MaterialCommunityIcons
            name='store-search-outline'
            size={22}
            color='black'
            style={[
              styles.button,
              selectedButton === 'Browse' && styles.selectedButton,
            ]}
          />
          <Text
            style={[
              styles.buttonword,
              selectedButton === 'Browse' && styles.selectedButton,
            ]}
          >
            Browse
          </Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => [
            handleButtonPress('Profile'),
            navigation.navigate('UserProfile', {
              id,
            }),
          ]}
        >
          <Feather
            name='user'
            size={20}
            color='black'
            style={[
              styles.button,
              selectedButton === 'Profile' && styles.selectedButton,
            ]}
          />
          <Text
            style={[
              styles.buttonword,
              selectedButton === 'Profile' && styles.selectedButton,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { NavBar };
