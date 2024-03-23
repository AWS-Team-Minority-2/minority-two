import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import styles from './sass/BasketScreen.scss';
import { useNavigation } from '@react-navigation/native';
import { CartRow } from './CartRow';

const OpenCarts = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaViewParent}>
      <View style={styles.screenContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <ScrollView style={styles.scrollViewParent}>
          <Text style={styles.openCartsTitle}>Current Carts</Text>
          <View style={styles.cartsContainer}>
            <CartRow />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { OpenCarts };
