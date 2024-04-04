import React, { useState, useRef, Component } from 'react';
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
} from 'react-native';
// import TopPlacesCarousel from "./components/TopPlacesCarousel";
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Callout, Marker } from 'react-native-maps';

import styles from './UserMap.scss';
import { useStores } from '@min-two/business-web';
import { MapCard } from './MapCard';
import { HomescreenHeader } from './HomescreenHeader';
// import { TRUE } from "sass";

const UserMap = ({ route }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState('Howard University'); // Current address displayed

  const props = route.params;
  const zipCode = props.zipCode;

  const { allBusiness } = useStores(zipCode);

  const [mapLocation, setMapLocation] = useState({
    latitude: 38.9300,
    longitude: -77.021584,
    latitudeDelta: 0.0100093,
    longitudeDelta: 0.0145645074,
  });

  const CARD_WIDTH = 293;
  const CARD_HEIGHT = 200;

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
        <View style={styles.TopBar}>
          <View style={styles.homeHeader}>
            
          </View>

          <HomescreenHeader currentZip={zipCode} parent={'map'} />
        </View>
        <View>
          <MapView
            style={{ height: 800 }}
            region={mapLocation}
            ref={(map) => (this.map = map)}
            rotateEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor='#F2998D'
            // mapType="hybridFlyover" //Change Map type
          >
            <Marker
              coordinate={{
                latitude: mapLocation.latitude,
                longitude: mapLocation.longitude,
              }}
            ></Marker>
          </MapView>
        </View>
      </View>
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
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export { UserMap };
