import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './UserProfile.scss';
import NavBar from '../NavBar';
import { Feather } from '@expo/vector-icons';

const UserProfile = () => {
    const navigation = useNavigation();
    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
      };
      const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar
  return (
    <SafeAreaView style={styles.profileLayout}>
        <View style={styles.profileAdjustment}>
            <View style={styles.profileHeader}>
                <FontAwesome5 
                name="user-circle" 
                size={65} 
                color="black" 
                style={styles.profileUser}
                />
                <Text style={styles.profileName}>Damid Bison</Text>
            </View>
            <NavBar
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
          navigation={navigation}
        />
        </View>
    </SafeAreaView>

  );
};

export { UserProfile };
