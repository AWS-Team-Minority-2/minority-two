import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, PanResponder  } from 'react-native';
import React, {useState, useRef} from 'react';
import styles from './sass/UserHome.scss';
import {SERVICE_PLACES, TOP_PLACES, RESTAURANTS_PLACES, SHOP_PLACES} from './data/info';
import TopPlacesCarousel from './components/TopPlacesCarousel';

import { Entypo, Ionicons, Feather, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';



const UserHomeScreen = () => {

  
  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState('Howard University'); // Current address displayed
  const [selectedButton, setSelectedButton] = useState('Home'); // Current button selected in Navbar


  // Handles changing the current button clicked in the NavBar
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // Handles changing the current address and leading the pop up screen to close
  const handleAddressClick = (address) => {
    setPickedAddress(address);
    setLocation(false);
  };

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

  function renderModal(){

    // List of Locations
    const pastLocations = {
      'Howard University': '2400 Sixth St NW, Washington DC 20001',
      'Vie Towers': '1615 Belcrest Rd, Hyattsvill MD 20782',
      '256 Highway St': 'New York, NY 11245',
      '154 Harvard Avenue' : 'Boston, MA 02134'
    };

    return(
      // Pop up screen for User to select location
      <Modal visible={location} animationType='slide' transparent={true}>
        <View style={[styles.locationPopUp, { marginTop: 50 }]}>
          <View {...panResponder.panHandlers}>
            <View style={styles.locationBox}>
              <View style={styles.locationContent}>
                <Text style={styles.locationHeader}>Enter Location</Text>

                {/* Search box in pop up screen */}
                <View style={styles.searchContainer}>
                  <Ionicons name="search-outline" size={17} color="black" style={styles.searchIcon} />
                  <TextInput style={styles.textInput} placeholder="Search Nexa" />
                </View>
                
                <Text style={styles.pastLocations}>Past Locations</Text>

                {/* List of locations in pop up screen */}
                {Object.entries(pastLocations).map(([address, description], index) => (
                  <TouchableOpacity key={index} onPress={() => handleAddressClick(address)}>
                    <View style={[styles.pastLocationContainer]}>
                      <View style={styles.sectionLocation}>
                        <Entypo name="location-pin" size={27} color="black" style={[styles.pin, pickedAddress === address &&  styles.pickedAddress]}/>
                        <View style={styles.wholeLocation}>
                          <Text style={[styles.pastLocation, pickedAddress === address && styles.pickedAddress]}>{address}</Text>
                          <Text style={[styles.address, pickedAddress === address && styles.pickedAddress]}>{description}</Text>
                        </View>
                      </View>

                      <View style={styles.locationDivider} />           
                    </View>
                </TouchableOpacity>
                ))}

              </View>
            </View>
          </View>
          
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
      <View style={styles.TopBar}>
            <View style={styles.homeHeader}>
              
              {/* Location button w/ icons */}
              <TouchableOpacity style={styles.location} onPress={() => setLocation(true)}>
                <Entypo name="location-pin" size={21} color="black"/>
                <Text style={styles.address}>{pickedAddress}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={22} color="black" />
              </TouchableOpacity>

              {/* Pop Up screen from location */}
              {renderModal()} 

              {/* Notification icon */}
              <TouchableOpacity style={styles.notification}>
                <Ionicons name="notifications-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {/* Search Box */}
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={17} color="black" style={styles.searchIcon} />
              <TextInput style={styles.textInput} placeholder="Search Nexa" />
              <View style={styles.divider} />
              <TouchableOpacity>
                <Feather name="map" size={17} color="black" style={styles.mapIcon}/>
              </TouchableOpacity>
            </View>

        </View>

        {/* All Scroll Sliders */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/* Featured Scroll Sliders */}
          <View style={styles.slider}>
            <TouchableOpacity style={styles.title}>
              <Text style={styles.titleHeader}>Featured</Text>
              <Ionicons name="arrow-forward-sharp" size={19} color="black" />
            </TouchableOpacity>
            <TopPlacesCarousel list={TOP_PLACES}/>
            <View style={styles.divide} />
          </View>

          {/* Services Near You Scroll Sliders */}
          <View style={styles.slider}>
            <TouchableOpacity style={styles.title}>
              <Text style={styles.titleHeader}>Services Near You</Text>
              <Ionicons name="arrow-forward-sharp" size={19} color="black" />
            </TouchableOpacity>
            <TopPlacesCarousel list={SERVICE_PLACES}/>
            <View style={styles.divide} />
          </View>

          {/* Restaurants Near You Scroll Sliders */}
          <View style={styles.slider}>
            <TouchableOpacity style={styles.title}>
              <Text style={styles.titleHeader}>Restaurants Near You</Text>
              <Ionicons name="arrow-forward-sharp" size={19} color="black" />
            </TouchableOpacity>
            <TopPlacesCarousel list={RESTAURANTS_PLACES}/>
            <View style={styles.divide} />
          </View>

          {/* Shops Near You Scroll Sliders */}
          <View style={styles.slider}>
            <TouchableOpacity style={styles.title}>
              <Text style={styles.titleHeader}>Shops Near You</Text>
              <Ionicons name="arrow-forward-sharp" size={19} color="black" />
            </TouchableOpacity>
            <TopPlacesCarousel list={SHOP_PLACES}/>
          </View>
        </>
      </ScrollView>

      {/* Navigation Bar at the bottom (Home, Fav, Browse, Profile) */}
      <View style={styles.navBar}>
    
          {/* Home Button */}
          <TouchableOpacity style={styles.button}
          onPress={() => handleButtonPress('Home')}>
            <AntDesign name="home" size={25} color="black" style={[styles.button, selectedButton === 'Home' && styles.selectedButton]}/>
            <Text style={[styles.buttonword, selectedButton === 'Home' && styles.selectedButton]}>Home</Text>
          </TouchableOpacity>

          {/* Favorites Button */}
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Favorites')}>
            <MaterialIcons name="favorite-outline" size={26} color="black"style={[styles.button, selectedButton === 'Favorites' && styles.selectedButton]}/>
            <Text style={[styles.buttonword, selectedButton === 'Favorites' && styles.selectedButton]}>Favorites</Text>
          </TouchableOpacity>

          {/* Browse Button */}
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Browse')}>
            <MaterialCommunityIcons name="store-search-outline" size={27} color="black" style={[styles.button, selectedButton === 'Browse' && styles.selectedButton]}/>
            <Text style={[styles.buttonword, selectedButton === 'Browse' && styles.selectedButton]}>Browse</Text>
          </TouchableOpacity>

          {/* Profile Button */}
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Profile')}>
            <Feather name="user" size={25} color="black" style={[styles.button, selectedButton === 'Profile' && styles.selectedButton]}/>
            <Text style={[styles.buttonword, selectedButton === 'Profile' && styles.selectedButton]}>Profile</Text>
          </TouchableOpacity>
        </View>

      </View>

    
    </SafeAreaView>
   
  );
};

export { UserHomeScreen };
