import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useRestaurantState,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
} from '@min-two/business-web';
import Currency from 'react-currency-formatter';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../Checkout/sass/BasketScreen.scss';

const BasketScreen = () => {
  const noCarts =
    'https://cdn.dribbble.com/users/295908/screenshots/2834564/media/805c806c3abfd012b6833e2cb290f47c.png?resize=800x600&vertical=center';
  const navigation = useNavigation();
  const restaurant = useRestaurantState().restaurant;

  const basketState = useBasketState();
  const total = selectBasketTotal(basketState);
  const items = selectBasketItems(basketState);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      <>
        <View style={styles.safeAreaViewContainer}>
          <View>
            <Text style={styles.finalLookText}>Final Look </Text>
            <Text style={styles.resturantName}>{restaurant.name}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} style={styles.backBttn}>
            <Feather name='x' size={24} color='black' />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.userImageParent}>
            <Image
              source={{
                uri: 'https://ucarecdn.com/abb0ca9f-fc36-4aac-940a-37d9110595f8/-/resize/601x326/',
              }}
              style={styles.userImage}
            />
            <Text style={styles.deliveryHeader}>Delivey in 20-25 mins</Text>
            <TouchableOpacity>
              <Text style={styles.changeBttn}>Change</Text>
            </TouchableOpacity>
          </View> */}

        <ScrollView style={styles.scrollViewParent}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={styles.itemsContainer}>
              <Text style={styles.changeBttn}>{items.length} x </Text>
              <Image
                source={{ uri: items[0]?.imageUrl }}
                style={styles.itemPhoto}
              />
              <Text style={styles.itemName}>{items[0]?.name}</Text>

              <Text style={styles.priceText}>
                <Currency quantity={items[0]?.price} currency='USD' />
              </Text>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name='cart-remove'
                  size={14}
                  color='#757575'
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.priceContainer}>
          <View style={styles.priceContainerChild}>
            <Text style={styles.priceColor}>Subtotal</Text>
            <Text style={styles.priceColor}>
              <Currency quantity={total} currency='USD' />
            </Text>
          </View>

          <View style={styles.priceContainerChild}>
            <Text style={styles.priceColor}>Taxes</Text>
            <Text style={styles.priceColor}>
              <Currency quantity={total * 0.2} currency='USD' />
            </Text>
          </View>

          <View style={styles.priceContainerChild}>
            <Text>Order Total</Text>
            <Text style={styles.finalPriceText}>
              <Currency quantity={total + total * 0.2} currency='USD' />
            </Text>
          </View>
          <View style={styles.placeOrderParent}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('PreparingOrderScreen')}
              style={styles.placeOrderBttn}
            >
              <Text style={styles.placeOrderBttn}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
};

export { BasketScreen };
