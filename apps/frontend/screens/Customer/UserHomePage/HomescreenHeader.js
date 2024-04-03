import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  PanResponder,
  TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

import styles from './UserHome.scss';
import { useCartsState } from '@min-two/business-web';
import { useNavigation } from '@react-navigation/native';

const HomescreenHeader = ({ currentZip, parent }) => {
  const carts = useCartsState();
  const activeCarts = carts.length;
  const navigation = useNavigation();

  const [pickedAddress, setPickedAddress] = useState('Howard University'); // Current address displayed
  const handleAddressClick = (address) => {
    setPickedAddress(address);
    setLocation(false);
  };

  const pastLocations = {
    'Howard University': '2400 Sixth St NW, Washington DC 20001',
    'Vie Towers': '1615 Belcrest Rd, Hyattsvill MD 20782',
    '256 Highway St': 'New York, NY 11245',
    '154 Harvard Avenue': 'Boston, MA 02134',
  };

  const [location, setLocation] = useState(false); // For the pop screen to show up or not

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

  function renderModal() {
    // List of Locations

    return (
      // Pop up screen for User to select location
      <Modal visible={location} animationType='slide' transparent={true}>
        <View style={[styles.locationPopUp, { marginTop: 50 }]}>
          <View {...panResponder.panHandlers}>
            <View style={styles.locationBox}>
              <View style={styles.locationContent}>
                <Text style={styles.locationHeader}>Enter Location</Text>

                {/* Search box in pop up screen */}
                <View style={styles.searchContainer}>
                  <Ionicons
                    name='search-outline'
                    size={17}
                    color='black'
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder='Search Nexa'
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
                            name='location-pin'
                            size={27}
                            color='black'
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
    <View style={styles.TopBarBorder}>
      <View style={styles.TopBar}>
        <View style={styles.homeHeader}>
          {/* Location button w/ icons */}
          <TouchableOpacity
            style={styles.location}
            onPress={() => setLocation(true)}
          >
            <Entypo name='location-pin' size={21} color='#f2998d' />
            <Text style={styles.showedAddress}>{pickedAddress}</Text>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={22}
              color='#f2998d'
            />
          </TouchableOpacity>

          {/* Pop Up screen from location */}
          {renderModal()}

          {/* Notification icon */}
          <View style={styles.iconBttns}>
            <TouchableOpacity style={styles.notification}>
              <Ionicons name='notifications-outline' size={20} color='black' />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notification}
              onPress={() => {
                navigation.navigate('Carts');
              }}
            >
              <Ionicons name='cart-outline' size={20} color='black' />
              {activeCarts >= 1 && (
                <View style={styles.cartLengthBttn}>
                  <Text style={styles.cartLengthText}>{activeCarts}</Text>

                  {/* <Text style={styles.cartLengthText}>{activeCarts}</Text> */}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <Ionicons
            name='search-outline'
            size={17}
            color='black'
            style={styles.searchIcon}
          />
          <TextInput style={styles.textInput} placeholder='Search Nexa' />
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              if (parent != 'map') {
                navigation.navigate('UserMap', {
                  zipCode: currentZip,
                });
              } else {
                navigation.goBack();
              }
            }}
          >
            {parent == 'home' && (
              <Feather
                name='map'
                size={17}
                color='black'
                style={styles.mapIcon}
              />
            )}

            {parent == 'map' && (
              <Feather
                name='list'
                size={17}
                color='black'
                style={styles.mapIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { HomescreenHeader };
