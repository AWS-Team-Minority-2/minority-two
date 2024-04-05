import { View, Text } from "react-native";
import React from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../UserMap.scss";

const BusinessMarkers = ({ business }) => {
  return (
    <Marker
      coordinate={{
        latitude: business.lat,
        longitude: business.long,
      }}
    >
      {business.type === "service" ? (
        <View style={styles.ring}>
          <MaterialIcons name="room-service" size={19} color="#adadad" />
        </View>
      ) : business.type === "shop" ? (
        <View style={styles.ring}>
          <MaterialIcons name="local-grocery-store" size={19} color="#adadad" />
        </View>
      ) : business.type === "restaurant" ? (
        <View style={styles.ring}>
          <MaterialIcons name="local-restaurant" size={19} color="#adadad" />
        </View>
      ) : null}
    </Marker>
  );
};

export { BusinessMarkers };
