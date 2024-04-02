import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import styles from './UserMap.scss';

const MapCard = ({ imageUrl, name }) => {
  return (
    <TouchableOpacity style={styles.mapCardOverlay}>
      <View>
        <Image source={{ uri: imageUrl }} style={styles.mapCardImage} />
      </View>
      <View>
        <Text style={styles.buinessNameMapCard}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { MapCard };
