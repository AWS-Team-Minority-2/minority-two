import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

// import TopPlacesCarousel from "./components/TopPlacesCarousel";
import {
  Entypo,
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useStores } from '@min-two/business-web';
import { markers, mapStandardStyle } from '../data/mapData';
// import { TRUE } from "sass";

import styles from './UserMap.scss';
import { MapCard } from './MapCard';
import { HomescreenHeader } from './HomescreenHeader';
import { BusinessMarkers } from './components/BusinessMarkers';

const UserMap = ({ route }) => {
  const navigation = useNavigation();

  const props = route.params;
  const zipCode = props.zipCode;

  const { allBusiness } = useStores(zipCode);
  const initialMapState = {
    markers,
    region: {
      latitude: 38.923141,
      longitude: -77.021584,
      latitudeDelta: 0.0093,
      longitudeDelta: 0.0074,
    },
  };

  const [state, setState] = useState(initialMapState);
  const _map = useRef(null);
  const scroll = useRef(null);

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

  const [mapLocation, setMapLocation] = useState({
    latitude: 38.93,
    longitude: -77.021584,
    latitudeDelta: 0.0100093,
    longitudeDelta: 0.0145645074,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const scrollViewRef = useRef(null);

  const handleMarkerPress = (latitude, longitude, index) => {
    // Update map location to the clicked marker's coordinates
    setMapLocation({
      latitude,
      longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
    // Show the scroll view
    setShowScrollView(true);

    if (scrollViewRef.current) {
      const cardWidth = 300; // Width of each card
      const screenWidth = Dimensions.get('window').width;
      const scrollToX = index * cardWidth - (screenWidth - cardWidth) / 2;
      scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
    }

    // Toggle the selection state of the clicked marker
    setSelectedMarker((prevSelectedMarker) => {
      if (prevSelectedMarker === `${latitude}-${longitude}`) {
        // If the clicked marker is already selected, deselect it
        return null;
      } else {
        // If another marker is selected or no marker is selected, select the clicked marker
        return `${latitude}-${longitude}`;
      }
    });
  };

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
        <View style={styles.TopBar}>
          <View style={styles.homeHeader}></View>

          <HomescreenHeader currentZip={zipCode} parent={'map'} />
        </View>

        <View>
          <MapView
            style={{ height: 800 }}
            region={mapLocation}
            rotateEnabled={true}
            zoomEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor='#F2998D'
            showsUserLocation={true}
          >
            {allBusiness
              .filter((business) => !business.is_online)
              .map((business, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleMarkerPress(business.lat, business.long, index)
                  }
                >
                  <BusinessMarkers
                    key={index}
                    business={business}
                    isSelected={
                      selectedMarker === `${business.lat}-${business.long}`
                    }
                  />
                </TouchableOpacity>
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
        <>
          <ScrollView
            style={styles.mapOverViewParent}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {allBusiness
              .filter((b) => !b.is_online)
              .map((b, index) => (
                <TouchableOpacity
                  onPress={() => handleMarkerPress(b.lat, b.long, index)}
                >
                  <MapCard
                    key={index}
                    imageUrl={b.cover_image}
                    name={b.name}
                    rating={b.rating}
                    ratingCount={b.rating_count}
                    distance={b.distance}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export { UserMap };
