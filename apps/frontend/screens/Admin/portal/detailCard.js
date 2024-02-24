import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import styles from '../sass/Admin.scss';

const DetailCard = ({ len, label, iconName }) => {
  return (
    <View style={styles.detailedCardSingle}>
      <View style={styles.iconDeatil}>
        {label != 'Pending' ? (
          <Ionicons name={iconName} size={21} color='black' />
        ) : (
          <MaterialIcons name={iconName} size={21} color='#f2998d' />
        )}
      </View>
      <Text style={styles.cardNumber}>{len}</Text>
      <View style={styles.cardName}>
        <Text
          style={label != 'Pending' ? styles.cardTitle : styles.cardPending}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default DetailCard;
