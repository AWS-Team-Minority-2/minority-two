import { View, Text } from "react-native";
import React from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../UserMap.scss";

const BusinessMarkers = ({ business, isSelected }) => {
  return (
    <Marker
      coordinate={{
        latitude: business.lat,
        longitude: business.long,
      }}
    >
      {business.type === "service" ? (
        <View style={[isSelected ? styles.selectedRing : styles.ring]}>
          <MaterialIcons
            name="room-service"
            size={isSelected ? 22 : 19}
            color={isSelected ? "white" : "#adadad"}
          />
        </View>
      ) : business.type === "shop" ? (
        <View style={[isSelected ? styles.selectedRing : styles.ring]}>
          <MaterialIcons
            name="local-grocery-store"
            size={isSelected ? 22 : 19}
            color={isSelected ? "white" : "#adadad"}
          />
        </View>
      ) : business.type === "restaurant" ? (
        <View style={[isSelected ? styles.selectedRing : styles.ring]}>
          <MaterialIcons
            name="local-restaurant"
            size={isSelected ? 22 : 19}
            color={isSelected ? "white" : "#adadad"}
          />
        </View>
      ) : null}
    </Marker>
  );
};

export { BusinessMarkers };
