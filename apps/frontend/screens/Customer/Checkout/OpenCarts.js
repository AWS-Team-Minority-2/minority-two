import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import styles from './sass/BasketScreen.scss';
import { useNavigation } from '@react-navigation/native';
import { CartRow } from './CartRow';
import {
  useCartsState,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
  addCartStateGlobal,
} from '@min-two/business-web';

const OpenCarts = () => {
  const navigation = useNavigation();
  const noCarts =
    'https://cdn.dribbble.com/users/295908/screenshots/2834564/media/805c806c3abfd012b6833e2cb290f47c.png?resize=800x600&vertical=center';
  const carts = useCartsState() || [];
  const [initialRender, setInitialRender] = useState(false);

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(!initialRender);
    } else {
      addCartStateGlobal({ carts: carts });
    }
  }, [carts]);

  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      <View style={styles.screenContainer}>
        {carts.length != 0 ? (
          <>
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
                {carts.map((c, index) => (
                  <CartRow
                    name={c.business.name}
                    imageUrl={
                      c.business.type == 'store'
                        ? c.business.profileImage
                        : c.business.coverImage
                    }
                    items={c.items}
                    restaurantMetadata={c.business}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Image source={{ uri: noCarts }} style={styles.noCartImage} />

            <TouchableOpacity
              style={styles.shopNexaBttn}
              onPress={navigation.goBack}
            >
              <Text style={styles.shopNexaText}>Shop Nexa</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export { OpenCarts };
