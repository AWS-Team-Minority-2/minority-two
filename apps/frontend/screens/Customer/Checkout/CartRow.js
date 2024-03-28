import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './sass/BasketScreen.scss';
import { useNavigation } from '@react-navigation/native';
import {
  setBasketFromCart,
  useBasketDispatch,
  useCartsState,
} from '@min-two/business-web';

const CartRow = ({ imageUrl, name, items, restaurantMetadata }) => {
  const navigation = useNavigation();
  const disptach = useBasketDispatch();

  return (
    <View style={styles.touchableOpacityParent}>
      <View style={styles.cartRowParent}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.cartImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.storeName}>{name}</Text>
          <View style={styles.itemParent}>
            <View style={styles.itemsListed}>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {index < 2 ? (
                    <>
                      <Text style={styles.groupedItems}>{item.name}</Text>
                    </>
                  ) : null}
                </React.Fragment>
              ))}
              {items.length > 2 && (
                <Text style={styles.groupedItems}>
                  {items.length === 2
                    ? '+1 other'
                    : `and ${items.length - 1} others`}
                </Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name='trash' size={15} color='black' />
        </TouchableOpacity>
      </View>

      <View style={styles.itemsImagesContainer}></View>
      <TouchableOpacity
        style={styles.cartBttn}
        onPress={() => {
          setBasketFromCart(disptach, items, restaurantMetadata);
          navigation.navigate('Checkout');
        }}
      >
        <Text style={styles.bttnText}>Open Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.storeBttn}
        onPress={() => {
          navigation.navigate('BusinessProfile', {
            name: restaurantMetadata.name,
            coverImage: restaurantMetadata.coverImage,
            rating: restaurantMetadata.rating,
            ratingCount: restaurantMetadata.ratingCount,
            distance: restaurantMetadata.distance,
            profileImage: restaurantMetadata.profileImage,
            sections: restaurantMetadata.sections,
            id: restaurantMetadata.id,
          });
        }}
      >
        <Text style={styles.bttnText}>View Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export { CartRow };
