import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './sass/Homescreen.scss';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useFonts } from 'expo-font';

const Homescreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Image source={require('./assets/bg.png')} style={styles.image} />
      </View>
      <View style={styles.overlay}>
        <View />
        <Image
          source={require('./assets/nexa.png')}
          style={styles.logoContainer}
        />
        <View>
          <TouchableOpacity style={styles.landingBtnsContainer}>
            <Text style={styles.bttnText}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.landingBtnsContainer}>
            <Text style={styles.bttnText}>Business Owner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export { Homescreen };
