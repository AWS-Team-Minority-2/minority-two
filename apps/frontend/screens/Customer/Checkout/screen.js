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

import Currency from 'react-currency-formatter';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  removeCurrent,
  useBasketDispatch,
  useBasketState,
  selectBasketItems,
  selectBasketTotal,
  removeFromBasket,
} from '@min-two/business-web';
// removeCurrent(basketDisptach);

import styles from '../Checkout/sass/BasketScreen.scss';
import { changeScreen, useScreenDispatch } from '@min-two/screen-iso';

const BasketScreen = ({ route }) => {
  const props = route.params;

  const noCarts =
    'https://cdn.dribbble.com/users/295908/screenshots/2834564/media/805c806c3abfd012b6833e2cb290f47c.png?resize=800x600&vertical=center';
  const navigation = useNavigation();
  const state = useBasketState();
  const dispatch = useBasketDispatch();
  const screenDispatch = useScreenDispatch();

  // const basketState = useBasketState();
  const total = selectBasketTotal(state);
  const items = selectBasketItems(state);
  const store = state.business;

  // console.log(total);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
    return () => {
      // removeCurrent(dispatch);
    };
  }, [items]);

  useEffect(() => {
    if (total == 0) {
      navigation.navigate('UserHome', {
        business: props.restaurantMetadata,
        items: props.items,
      });
    }
  }, [items]);

  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      <>
        <View style={styles.safeAreaViewContainer}>
          <View>
            <Text style={styles.finalLookText}>Final Look </Text>
            <Text style={styles.resturantName}>{store.name}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} style={styles.backBttn}>
            <Feather name='x' size={24} color='black' />
          </TouchableOpacity>
        </View>

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
              <TouchableOpacity
                onPress={() => {
                  removeFromBasket(state, dispatch, items[0]?.id);
                }}
              >
                <Feather name='x' size={15} color='black' />
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
              onPress={() => {
                changeScreen(screenDispatch, 'Landing');
                navigation.navigate('Complete', {
                  total: total + total * 0.2,
                  business: props.restaurantMetadata,
                  items: props.items,
                });
              }}
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
