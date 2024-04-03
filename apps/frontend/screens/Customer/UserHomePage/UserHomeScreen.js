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
import { addCartStateGlobal, useStores } from '@min-two/business-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCartsState } from '@min-two/business-web';
import styles from './UserHome.scss';
import { HomescreenHeader } from './HomescreenHeader';

const UserHomeScreen = ({ route }) => {
  const { user: loggedUser } = useAuthState();

  const navigation = useNavigation();
  const carts = useCartsState();
  const [initalRender, setInitalRender] = useState(false);

  const params = route.params;

  const activeCarts = carts.length;

  useEffect(() => {
    if (params) {
      addCartStateGlobal({ carts: carts });
    }
  }, [activeCarts, params]);

  useEffect(() => {
    if (!loggedUser) {
      navigation.navigate('Home');
    }
  }, [loggedUser]);

  const [location, setLocation] = useState(false); // For the pop screen to show up or not
  const [pickedAddress, setPickedAddress] = useState('Howard University'); // Current address displayed
  const [currentZip, setCurrentZip] = useState('');

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

  const { featured, shops, restaurants, services } = useStores(currentZip);

  return (
    <SafeAreaView style={styles.homeScreenLayout}>
      <View style={styles.homeAdjustment}>
        <HomescreenHeader currentZip={currentZip} parent={'home'} />
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
