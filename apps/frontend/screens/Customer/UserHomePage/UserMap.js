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
} from "react-native";
// import TopPlacesCarousel from "./components/TopPlacesCarousel";
import { Entypo, Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useStores } from "./hooks/useStores";

import styles from "./UserMap.scss";
// import { TRUE } from "sass";

const UserMap = () => {
  const { featured, shops, restaurants, services } = useStores();

  const navigation = useNavigation();
  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState("Howard University"); // Current address displayed

  const handleAddressClick = (address) => {
    setPickedAddress(address);
    setLocation(false);
  };

  const [mapLocation, setMapLocation] = useState({
    latitude: 38.923141,
    longitude: -77.021584,
    latitudeDelta: 0.0093,
    longitudeDelta: 0.0074,
  });

  // Handles the ability for the User to swipes the pop up screen down
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setLocation(false); // Close the modal if user swipes down
        }
      },
    })
  ).current;

  const CARD_WIDTH = 293;
  const CARD_HEIGHT = 200;

  function renderModal() {
    // List of Locations
    const pastLocations = {
      "Howard University": "2400 Sixth St NW, Washington DC 20001",
      "Vie Towers": "1615 Belcrest Rd, Hyattsvill MD 20782",
      "256 Highway St": "New York, NY 11245",
      "154 Harvard Avenue": "Boston, MA 02134",
    };

    return (
      // Pop up screen for User to select location
      <Modal visible={location} animationType="slide" transparent={true}>
        <View style={[styles.locationPopUp, { marginTop: 50 }]}>
          <View {...panResponder.panHandlers}>
            <View style={styles.locationBox}>
              <View style={styles.locationContent}>
                <Text style={styles.locationHeader}>Enter Location</Text>

                {/* Search box in pop up screen */}
                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search-outline"
                    size={17}
                    color="black"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Search Nexa"
                  />
                </View>

                <Text style={styles.pastLocations}>Past Locations</Text>

                {/* List of locations in pop up screen */}
                {Object.entries(pastLocations).map(
                  ([address, description], index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAddressClick(address)}
                    >
                      <View style={[styles.pastLocationContainer]}>
                        <View style={styles.sectionLocation}>
                          <Entypo
                            name="location-pin"
                            size={27}
                            color="black"
                            style={[
                              styles.pin,
                              pickedAddress === address && styles.pickedAddress,
                            ]}
                          />
                          <View style={styles.wholeLocation}>
                            <Text
                              style={[
                                styles.pastLocation,
                                pickedAddress === address &&
                                  styles.pickedAddress,
                              ]}
                            >
                              {address}
                            </Text>
                            <Text
                              style={[
                                styles.address,
                                pickedAddress === address &&
                                  styles.pickedAddress,
                              ]}
                            >
                              {description}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.locationDivider} />
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
        <View style={styles.TopBar}>
          <View style={styles.homeHeader}>
            {/* Location button w/ icons */}
            <TouchableOpacity
              style={styles.location}
              onPress={() => setLocation(true)}
            >
              <Entypo name="location-pin" size={21} color="#f2998d" />
              <Text style={styles.address}>{pickedAddress}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color="#f2998d"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.location}
              onPress={() => setLocation(true)}
            >
              <Entypo name='location-pin' size={21} color='black' />
              <Text style={styles.address}>{pickedAddress}</Text>
              <MaterialIcons
                name='keyboard-arrow-down'
                size={22}
                color='black'
              />
            </TouchableOpacity> */}

            {/* Pop Up screen from location */}
            {renderModal()}

            {/* Notification icon */}
            <TouchableOpacity style={styles.notification}>
              <Ionicons name="notifications-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={17}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput style={styles.textInput} placeholder="Search Nexa" />
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => navigation.navigate("UserHome")}>
              <Feather
                name="list"
                size={24}
                color="black"
                style={styles.mapIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <MapView
            style={{ height: 800 }}
            region={mapLocation}
            ref={(map) => (this.map = map)}
            rotateEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor="#F2998D"
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
    </SafeAreaView>
  );
};

export { UserMap };
