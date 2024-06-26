import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import motto from '../../../assets/motto.png';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

import styles from './sass/BasketScreen.scss';
import {
  useCartsDispatch,
  removeCart,
  useCartsState,
} from '@min-two/business-web';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import LottieView from 'lottie-react-native';

// Hide Navbar Flag

const ProcessedScreen = ({ navigation, route }) => {
  const params = route.params;
  const cartDispatch = useCartsDispatch();
  const carts = useCartsState();
  const dispatch = useScreenDispatch();

  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
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
          onPress={() => {
            removeCart(cartDispatch, {
              business: params.business,
              items: params.items,
            });
            navigation.navigate('UserHome', {
              business: params.business,
              items: params.items,
            });
            changeScreen(dispatch, 'UserHome');
          }}
        >
          <Text style={styles.completeText}>Complete</Text>
        </TouchableOpacity>
      </View>
      <LottieView
        source={require('../../../assets/congrats.json')}
        autoPlay
        loop={false}
        style={styles.congratsEffect}
      />
    </SafeAreaView>
  );
};

export { ProcessedScreen };
