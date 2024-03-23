import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './sass/BasketScreen.scss';

const CartRow = ({ imageUrl }) => {
  const items = ['Vegan Chickn Drummies', 'Vegan Barbecue Roast w. Rice'];

  return (
    <View style={styles.touchableOpacityParent}>
      <View style={styles.cartRowParent}>
        <Image
          source={{
            uri:
              imageUrl ||
              'https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp',
          }}
          style={styles.cartImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.storeName}>NuVegan</Text>
          <View style={styles.itemParent}>
            <View style={styles.itemsListed}>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Text style={styles.groupedItems}>{item}</Text>
                  {index !== items.length - 1 && (
                    <Text style={styles.dot}> • </Text>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name='trash' size={15} color='black' />
        </TouchableOpacity>
      </View>

      <View style={styles.itemsImagesContainer}>
        <Image
          source={{
            uri:
              imageUrl ||
              'https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp',
          }}
          style={styles.itemImageXs}
        />
        <Image
          source={{
            uri:
              imageUrl ||
              'https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp',
          }}
          style={styles.itemImageXs}
        />
        <Image
          source={{
            uri:
              imageUrl ||
              'https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp',
          }}
          style={styles.itemImageXs}
        />
      </View>
    </View>
  );
};

export { CartRow };
