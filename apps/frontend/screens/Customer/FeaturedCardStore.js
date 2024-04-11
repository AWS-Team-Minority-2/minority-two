import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import SelectedItem from './SelectedItem';
import styles from './sass/StoreProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { RestaurantSelectedItem } from './RestaurantSelected';
import {
  addCartStateGlobal,
  useBasketState,
  useBasketDispatch,
  useCartsDispatch,
  setCart,
  useCartsState,
} from '@min-two/business-web';

const FeaturedCardStore = ({ item, store, activeOverride, itemCount }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemCountState, setItemCount] = useState(0);

  useEffect(() => {
    if (itemCount != 0) {
      setItemCount(itemCount);
    } else {
      setItemCount(0);
    }
  }, [itemCount]);

  const handleItemSelection = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const cartDisptach = useCartsDispatch();
  const items = useCartsState();

  const existingCartIndex = items.findIndex(
    (cart) => cart.business.id === store.id
  );

  // use for state management only
  const [ungroupedCartItems, setUngroupedCartItems] = useState([]);
  useEffect(() => {
    if (existingCartIndex !== -1) {
      const cart = items[existingCartIndex].items;
      setUngroupedCartItems(cart);
    } else {
      setUngroupedCartItems([]);
    }
  }, [existingCartIndex, items]);

  useEffect(() => {
    // setunreducedItems(items);
    addCartStateGlobal({ carts: items });
  }, [items]);

  const basketState = useBasketState();
  const dispatch = useBasketDispatch();

  // TODO: Set basket from cart, and handle basket actions here

  return (
    <>
      <View style={styles.scrollViewContainer}>
        <TouchableOpacity onPress={() => handleItemSelection(item)}>
          <View style={styles.itemContainer}>
            <View style={styles.imageAdjust}>
              <ImageBackground
                source={{ uri: item.image_url }}
                style={styles.itemImage}
              >
                {itemCountState >= 1 ? (
                  <View style={styles.addedButton}>
                    {itemCountState > 1 ? (
                      <TouchableOpacity>
                        <MaterialIcons
                          name='remove'
                          size={20}
                          color='white'
                          onPress={() => {
                            setItemCount(itemCountState - 1);
                          }}
                          style={styles.minusButton}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity>
                        <MaterialIcons
                          name='delete'
                          size={20}
                          color='white'
                          onPress={() => {
                            setItemCount(0);
                          }}
                          style={styles.garbageIcon}
                        />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.numberAdded}>{itemCountState}</Text>
                    <TouchableOpacity>
                      <MaterialIcons
                        name='add'
                        size={23}
                        color='white'
                        onPress={async () => {
                          setCart(cartDisptach, {
                            business: store,
                            items: [...ungroupedCartItems, item],
                          });
                          setItemCount(itemCountState + 1);
                        }}
                        style={styles.plusButton}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      setItemCount(itemCountState + 1);
                    }}
                  >
                    <MaterialIcons name='add' size={20} color='white' />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </View>

            <View style={styles.belowImage}>
              <View style={styles.itemTopContent}>
                <Text style={styles.itemPrices}>${item.price}</Text>
                <Text style={styles.itemMeasurement}> • {item.size}</Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <RestaurantSelectedItem
        isVisible={isModalVisible}
        item={item}
        onClose={handleCloseModal}
        setShowItemPopup={setModalVisible}
        store={store}
        activeOverride={activeOverride}
      />
    </>
  );
};

export { FeaturedCardStore };
