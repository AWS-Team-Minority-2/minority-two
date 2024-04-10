import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
  findNodeHandle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import styles from './sass/StoreProfile.scss';
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { features } from './data/store';
import { FeaturedRowStore } from './FeaturedRowStore';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useNavigation } from '@react-navigation/native';
import BusinessProfilePopUp from './BusinessProfilePopUp';
import {
  useBasketState,
  useBasketDispatch,
  setResturant,
  getItemsByStoreId,
  setBusiness,
  useCartsState,
  setBasketFromCart,
} from '@min-two/business-web';

const StoreProfile = ({ route }) => {
  const {
    name,
    coverImage,
    address,
    rating,
    ratingCount,
    distance,
    profileImage,
    sections,
    id,
    city,
    state,
    zip,
    hasCartsActive,
  } = route.params;

  const store = {
    name,
    coverImage,
    rating,
    ratingCount,
    distance,
    profileImage,
    sections,
    city,
    state,
    zip,
    id,
  };

  const sectionsObj = sections.sections;

  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();
  const [showBanner, setShowBanner] = useState(false);

  const toggleFavorite = ({ route }) => {
    setIsFavorite(!isFavorite);
  };

  const [hasActiveCart, setHasActiveCart] = useState(hasCartsActive);

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen
  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };
  const basketDisptach = useBasketDispatch();

  useEffect(() => {
    setBusiness(basketDisptach, store);
  }, []);

  const cartState = useCartsState();
  const [ungroupedItems, setUngroupeItems] = useState([]);

  useEffect(() => {
    if (hasActiveCart == true) {
      setUngroupeItems(getItemsByStoreId(cartState, id));
    }
  }, [hasActiveCart, cartState]);

  return (
    <SafeAreaView style={styles.storeProfileLayout}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   style={styles.serviceScroll}
        >
          <ImageBackground
            source={{
              uri: coverImage,
            }}
            style={{ width: '100%', height: 185, ...styles.topView }}
          >
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => {
                changeScreen(dispatch, 'Home');
                navigation.navigate('UserHome');
              }}
            >
              <Feather name='chevron-left' size={25} color='black' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.Favorite} onPress={toggleFavorite}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-outline'}
                size={20}
                color={isFavorite ? '#f2998d' : 'black'}
              />
            </TouchableOpacity>
            {showBanner && (
              <View style={styles.banner}>
                <Text style={{ color: 'white', marginLeft: 5 }}>
                  Added to favorites
                </Text>
                <MaterialIcons
                  name='favorite-outline'
                  size={20}
                  color='white'
                />
              </View>
            )}
          </ImageBackground>

          <View style={styles.storeTopView}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.businessType}>Shop</Text>
            <TouchableOpacity style={styles.storeInfo} onPress={togglePopUp}>
              <Ionicons name='star-sharp' size={15} color='black' />
              <Text>
                {store.rating} ({store.ratingCount})
              </Text>
              {distance && (
                <>
                  <Text> • </Text>
                  <Text style={styles.businessDistance}>{distance} mi</Text>
                </>
              )}

              <Feather name='chevron-right' size={16} color='grey' />
            </TouchableOpacity>
            <BusinessProfilePopUp
              isVisible={isPopUpVisible}
              onClose={togglePopUp}
              name={name}
              address={address}
              city={city}
              state={state}
              zip={zip}
            />
          </View>

          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons
                name='search-outline'
                size={17}
                color='black'
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder='Search this store'
              />
            </View>
          </View>

          <View style={styles.businessTabViewSection}>
            {sectionsObj.map((item, sectionIndex) => (
              <View style={styles.businessTabSection} key={sectionIndex}>
                <FeaturedRowStore
                  featuredName={item.name}
                  featuredAmount={item.amount}
                  items={item.items}
                  store={store}
                  activeOverride={setHasActiveCart}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {hasActiveCart && (
        <TouchableOpacity
          style={styles.activeCartBttn}
          onPress={() => {
            // items must not be grouped or reduced when passed to state
            setBasketFromCart(basketDisptach, ungroupedItems, store);
            navigation.navigate('Checkout', {
              restaurantMetadata: store,
              items: ungroupedItems,
            });
          }}
        >
          <Ionicons name='cart-outline' size={20} color='white' />
          <View>
            <Text style={styles.viewCartText}>{name} Cart</Text>
          </View>
          <Text>{''}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export { StoreProfile };
