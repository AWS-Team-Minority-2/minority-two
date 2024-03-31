import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import motto from '../../../assets/motto.png';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

import styles from './sass/BasketScreen.scss';

// Hide Navbar Flag

const ProcessedScreen = ({ navigation, route }) => {
  const params = route.params;

  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      <View style={styles.nexaLogoConatiner}>
        {/* <Image
          style={styles.nexaLogoConatinerImage}
          source={require('../../../assets/motto.png')}
        /> */}
      </View>
      <View style={styles.orderCompleteSection}>
        <FontAwesome name='check-circle' size={45} color='green' />
        <View style={styles.totalSection}>
          <Text style={styles.totalAmountText}>Order Total</Text>
          <Text style={styles.priceCompleteText}>
            <Currency quantity={params.total} currency='USD' />
          </Text>
        </View>

        <Text style={styles.totalAmountText}>Order Placed</Text>

        <Text style={styles.completeSubText}>
          Your order has been successfully placed and accepted. We will send you
          email updates on its status.
        </Text>

        <TouchableOpacity
          style={styles.completeOrderBttn}
          onPress={() => navigation.navigate('UserHome')}
        >
          <Text style={styles.completeText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { ProcessedScreen };
