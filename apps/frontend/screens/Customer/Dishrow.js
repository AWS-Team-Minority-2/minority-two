import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import {
  useRestaurantState,
  addToBasket,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
  removeFromBasket,
  useBasketDispatch,
} from '@min-two/business-web';

import styles from './sass/Dishrow.scss';
import SelectedItem from './SelectedItem';

const Dishrow = ({ dish, store, activeOverride }) => {
  const [isPressed, setIsPressed] = useState(false);
  const basketState = useBasketState();

  const [showItemPopup, setShowItemPopup] = useState(false);

  const handleCloseModal = () => {
    setShowItemPopup(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.touchableOpacityParent}
        onPress={() => {
          setShowItemPopup(true);
        }}
      >
        <View style={styles.dishRowParent}>
          <View style={styles.nameContainer}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.price}>{dish.description}</Text>
            <Text style={styles.price}>
              <Currency quantity={dish.price} currency='USD' />
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri: dish.image_url,
              }}
              style={styles.dishImage}
            />
          </View>
        </View>
      </TouchableOpacity>
      <SelectedItem
        isVisible={showItemPopup}
        item={dish}
        onClose={handleCloseModal}
        setShowItemPopup={setShowItemPopup}
        store={store}
        activeOverride={activeOverride}
      />
    </>
  );
};

export { Dishrow };
