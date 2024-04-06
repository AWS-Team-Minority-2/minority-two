import React, { useState, useRef, Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
// import TopPlacesCarousel from "./components/TopPlacesCarousel";
import { Entypo, Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, {
  Callout,
  MapMarker,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import styles from "./UserMap.scss";
import { useStores } from "@min-two/business-web";
import { MapCard } from "./MapCard";
import { HomescreenHeader } from "./HomescreenHeader";
import { BusinessMarkers } from "./components/BusinessMarkers";
// import { TRUE } from "sass";

const UserMap = ({ route }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState("Howard University"); // Current address displayed

  const props = route.params;
  const zipCode = props.zipCode;

  const { allBusiness } = useStores(zipCode);

  const [mapLocation, setMapLocation] = useState({
    latitude: 38.93,
    longitude: -77.021584,
    latitudeDelta: 0.0100093,
    longitudeDelta: 0.0145645074,
  });

  const CARD_WIDTH = 293;
  const CARD_HEIGHT = 200;

  const [showScrollView, setShowScrollView] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (0 > gestureState.dy) {
          // Swipe down
          setShowScrollView(true);
        } else {
          // Swipe up
          setShowScrollView(false);
        }
      },
      onPanResponderRelease: () => {
        // Reset
        setShowScrollView(false);
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
        <View style={styles.TopBar}>
          <View style={styles.homeHeader}></View>

          <HomescreenHeader currentZip={zipCode} parent={"map"} />
        </View>

        <View>
          <MapView
            style={{ height: 800 }}
            region={mapLocation}
            ref={(map) => (this.map = map)}
            rotateEnabled={true}
            zoomEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor="#F2998D"
            showsUserLocation={true}
            // initialRegion={{ latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          >
            {allBusiness
              .filter((business) => !business.is_online)
              .map((business, index) => (
                <BusinessMarkers key={index} business={business} />
              ))}
          </MapView>
        </View>

        
      </View>

      {!showScrollView ? (
        <View style={styles.mapSwipe} {...panResponder.panHandlers}>
          <View style={styles.mapSwipeBar}></View>
          <Text style={styles.mapResults}>33 Results</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.mapOverViewParent}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {allBusiness
            .filter((b) => !b.is_online)
            .map((b, index) => (
              <MapCard
                key={index}
                imageUrl={b.cover_image}
                name={b.name}
                rating={b.rating}
                ratingCount={b.rating_count}
                distance={b.distance}
                onPress={() =>
                  setMapLocation({
                    latitude: b.latitude,
                    longitude: b.longitude,
                    latitudeDelta: 0.0100093,
                    longitudeDelta: 0.0145645074,
                  })
                }
              />
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export { UserMap };
