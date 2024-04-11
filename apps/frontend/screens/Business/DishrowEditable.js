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
import { Entypo } from '@expo/vector-icons';

import styles from './sass/Dishrow.scss';
import { EditDishRowPopup } from './EditDishRowPopup';
// import { RestaurantSelectedItem } from './RestaurantSelected';

const DishrowEditable = ({ dish, type }) => {
  const [isPressed, setIsPressed] = useState(false);
  const basketState = useBasketState();

  const [showItemPopup, setShowItemPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseModal = () => {
    setShowItemPopup(false);
  };

  return (
    <>
      {type == 'view' ? (
        <View
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
        </View>
      ) : (
        <>
          <View
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
          </View>
          <View style={styles.editableOptions}>
            <TouchableOpacity style={styles.editableOption}>
              <Entypo
                name='edit'
                size={15}
                color='black'
                onPress={() => {
                  setShowEditModal(true);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editableOption}
              onPress={() => {
                console.log('deleted');
              }}
            >
              <Entypo name='trash' size={15} color='black' />
            </TouchableOpacity>
          </View>
        </>
      )}

      <EditDishRowPopup
        isVisible={showEditModal}
        item={dish}
        onClose={() => {
          setShowEditModal(false);
        }}
      />
    </>
  );
};

export { DishrowEditable };
