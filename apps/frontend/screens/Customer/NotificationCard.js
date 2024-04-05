import { View, Text, Image } from 'react-native';
import React from 'react';

import styles from './sass/Notifications.scss';

const NotificationCard = () => {
  return (
    <View style={styles.notiCardParent}>
      <Image
        source={{
          uri: 'https://suganspicedmv.com/wp-content/uploads/2022/01/restaurant-suga-1024x530.jpg',
        }}
        style={styles.photoContainer}
      />

      <View style={styles.textContainer}>
        <Text style={styles.storeNameText}>Suga & Spice Order</Text>
        <Text style={styles.subTextNoti}>
          Your order has been received. Please check your email for status
          updates{' '}
        </Text>
        <Text style={styles.hourText}>3 hrs Ago</Text>
      </View>
    </View>
  );
};

export { NotificationCard };
