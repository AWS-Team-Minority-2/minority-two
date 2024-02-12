import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import styles from './UserHomePage/UserHome.scss';

const NavBar = ({ handleButtonPress, selectedButton, navigation }) => {
  return (
    <View style={styles.navBar}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => [handleButtonPress('Home'), navigation.navigate('UserHome')]}
      >
        <AntDesign
          name='home'
          size={25}
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
        onPress={() => handleButtonPress('Favorites')}
      >
        <MaterialIcons
          name='favorite-outline'
          size={26}
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
        onPress={() => handleButtonPress('Browse')}
      >
        <MaterialCommunityIcons
          name='store-search-outline'
          size={27}
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
        onPress={() => [handleButtonPress('Profile'), navigation.navigate('UserProfile')]}
      >
        <Feather
          name='user'
          size={25}
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
  );
};

export default NavBar;
