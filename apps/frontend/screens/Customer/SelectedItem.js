import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from './sass/BusinessProfile';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Currency from 'react-currency-formatter';
import {
  addCartStateGlobal,
  useBasketState,
  useBasketDispatch,
  useCartsDispatch,
  setCart,
  useCartsState,
} from '@min-two/business-web';
import Toast from 'react-native-toast-message';

const SelectedItem = ({
  isVisible,
  item,
  onClose,
  setShowItemPopup,
  store,
}) => {
  const [groupedItems, setGroupedItems] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const cartDisptach = useCartsDispatch();
  const items = useCartsState();
  const existingCartIndex = items.findIndex(
    (cart) => cart.restaurant.id === store.id
  );
  const [unReducedItems, setunreducedItems] = useState([]);

  useEffect(() => {
    if (existingCartIndex !== -1) {
      // If the restaurant already exists in the cart list, update state variables accordingly
      const cart = items[existingCartIndex].items;
      // console.log(cart, 'jjjj');
      setGroupedItems(cart);
    } else {
      // If the restaurant doesn't exist in the cart list, reset state variables
      setGroupedItems([]);
    }
  }, [existingCartIndex, items]);

  useEffect(() => {
    setunreducedItems(items);
    // Call addCartStateGlobal here to ensure it's using the updated unReducedItems
    addCartStateGlobal({ carts: items });
  }, [items]);

  // console.log(groupedItems, 'hhh');
  // const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  // useEffect(() => {
  //   const groupedItems = items.reduce((results, item) => {
  //     (results[item.id] = results[item.id] || []).push(item);
  //     return results;
  //   }, {});
  //   setGroupedItemsInBasket(groupedItems);
  // }, [items]);

  // console.log(groupedItemsInBasket, 'uiii');

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const basketState = useBasketState();
  const dispatch = useBasketDispatch();

  const goodCartChange = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucessfully Added',
      text2: 'Your cart has been updated',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {item && (
          <View style={styles.popUpContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
            <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>
                <Currency quantity={item.price} currency='USD' />
              </Text>
            </View>
            <TouchableOpacity
              style={styles.itemFavorite}
              onPress={toggleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-outline'}
                size={15}
                color='#f2998d'
              />
              <Text style={styles.itemFavoriteWords}>Favorite (22) </Text>
            </TouchableOpacity>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={async () => {
                setCart(cartDisptach, {
                  restaurant: store,
                  items: [...groupedItems, item],
                });

                // await addCartStateGlobal({ carts: unReducedItems });
                setShowItemPopup(false);
                goodCartChange();
              }}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SelectedItem;
