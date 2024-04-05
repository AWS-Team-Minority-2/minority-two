import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import styles from "./UserMap.scss";

const MapCard = ({ imageUrl, name, rating, ratingCount, distance }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <TouchableOpacity style={styles.mapCardOverlay}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.mapCardImage}
        resizeMode="cover" // Make sure the image covers the entire space
      >
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </ImageBackground>

      <View style={styles.mapBottomCard}>
        <View style={styles.mapInfo}>
          <Text style={styles.mapName}>{name}</Text>
          <View style={styles.mapCardInfo}>
            <FontAwesome name="map-marker" size={15} color="#555" />
            <Text style={styles.mapBottomText}>{distance} mi</Text>
            {/* <Text style={styles.mapBottomText}>
              {rating} ({ratingCount})
            </Text> */}
          </View>
        </View>
        <TouchableOpacity style={styles.mapFav} onPress={handleFavorite}>
          <MaterialIcons
            name={isFavorited ? "favorite" : "favorite-outline"}
            size={21}
            color={isFavorited ? "#f2998d" : "#f2998d"} // Change color when favorited
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export { MapCard };
