import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  PanResponder,
} from 'react-native';
import TopPlacesCarousel from './components/TopPlacesCarousel';
import { Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthState, useAuthDispatch, doLogin } from '@min-two/user-iso';
import { useStores } from '@min-two/business-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCartsState } from '@min-two/business-web';
import styles from './UserHome.scss';

const UserHomeScreen = () => {
  const { user: loggedUser } = useAuthState();

  const navigation = useNavigation();
  const activeCarts = useCartsState().length;

  useEffect(() => {
    if (!loggedUser) {
      navigation.navigate('Home');
    }
  }, [loggedUser]);

  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState('Howard University'); // Current address displayed
  const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar
  const [currentZip, setCurrentZip] = useState('');

  // Handles changing the current button clicked in the NavBar
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // Handles changing the current address and leading the pop up screen to close
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

  useEffect(() => {
    if (pickedAddress && pastLocations[pickedAddress]) {
      const address = pastLocations[pickedAddress];
      const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
      const match = address.match(zipRegex);
      if (match) {
        setCurrentZip(match[0]);
      } else {
        console.error('Could not find zip code for the picked address.');
      }
    }
  }, [pickedAddress]);

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

  const { featured, shops, restaurants, services } = useStores(currentZip);

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
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
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
                  <Ionicons
                    name='notifications-outline'
                    size={20}
                    color='black'
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.notification}
                  onPress={() => {
                    navigation.navigate('Carts');
                  }}
                >
                  <Ionicons name='cart-outline' size={20} color='black' />
                  <View style={styles.cartLengthBttn}>
                    <Text style={styles.cartLengthText}>{activeCarts}</Text>
                  </View>
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
              <TouchableOpacity onPress={() => navigation.navigate('UserMap')}>
                <Feather
                  name='map'
                  size={17}
                  color='black'
                  style={styles.mapIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* All Scroll Sliders */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scroll}>
            {/* Featured Scroll Sliders */}
            <View style={styles.slider}>
              <TouchableOpacity style={styles.title}>
                <Text style={styles.titleHeader}>Featured</Text>
                <Ionicons name='arrow-forward-sharp' size={19} color='black' />
              </TouchableOpacity>
              <TopPlacesCarousel list={featured} />
              <View style={styles.divide} />
            </View>

            {/* Services Near You Scroll Sliders */}
            <View style={styles.slider}>
              <TouchableOpacity style={styles.title}>
                <Text style={styles.titleHeader}>Services Near You</Text>
                <Ionicons name='arrow-forward-sharp' size={19} color='black' />
              </TouchableOpacity>
              <TopPlacesCarousel list={services} />
              <View style={styles.divide} />
            </View>

            {/* Restaurants Near You Scroll Sliders */}
            <View style={styles.slider}>
              <TouchableOpacity style={styles.title}>
                <Text style={styles.titleHeader}>Restaurants Near You</Text>
                <Ionicons name='arrow-forward-sharp' size={19} color='black' />
              </TouchableOpacity>
              <TopPlacesCarousel list={restaurants} />
              <View style={styles.divide} />
            </View>

            {/* Shops Near You Scroll Sliders */}
            <View style={styles.slider}>
              <TouchableOpacity style={styles.title}>
                <Text style={styles.titleHeader}>Shops Near You</Text>
                <Ionicons name='arrow-forward-sharp' size={19} color='black' />
              </TouchableOpacity>
              <TopPlacesCarousel list={shops} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { UserHomeScreen };
