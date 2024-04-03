import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import styles from "./UserMap.scss";

const MapCard = ({ imageUrl, name, rating, ratingCount, distance }) => {
  return (
    <TouchableOpacity style={styles.mapCardOverlay}>
      <Image source={{ uri: imageUrl }} style={styles.mapCardImage} />
      <View>
        <Text >{name}</Text>
        <Text >{rating}</Text>
        <Text >{ratingCount}</Text>
        <Text >{distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { MapCard };
