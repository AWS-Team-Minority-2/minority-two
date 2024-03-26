import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useRestaurantState,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
} from "@min-two/business-web";
import Currency from "react-currency-formatter";
import { Feather } from "@expo/vector-icons";

import styles from "../Checkout/sass/BasketScreen.scss";

const BasketScreen = () => {
  const noCarts =
    "https://cdn.dribbble.com/users/295908/screenshots/2834564/media/805c806c3abfd012b6833e2cb290f47c.png?resize=800x600&vertical=center";
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

  console.log(restaurant.name);
  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      {restaurant != null ? (
        <View style={styles.safeAreaViewContainer}>
          <View>
            <Text style={styles.finalLookText}>Final Look </Text>
            <Text style={styles.resturantName}>{restaurant.name}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} style={styles.backBttn}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
    </SafeAreaView>
  );
};

export { BasketScreen };
