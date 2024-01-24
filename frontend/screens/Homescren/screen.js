import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import styles from './sass/Homescreen.scss';

const Homescreen = () => {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
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
            {fontsLoaded ? (
              <Text style={styles.bttnText}>Customer</Text>
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.landingBtnsContainer}>
            {fontsLoaded ? (
              <Text style={styles.bttnText}>Business Owner</Text>
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export { Homescreen };
