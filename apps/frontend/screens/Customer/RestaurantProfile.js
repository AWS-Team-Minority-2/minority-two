import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder,
  findNodeHandle,
} from 'react-native';
import styles from './sass/BusinessProfile.scss';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import BusinessProfilePopUp from './BusinessProfilePopUp';
// import { useAuthState } from "@min-two/user-iso";
import { Feather, Ionicons } from '@expo/vector-icons';
import { desserts, features } from './data/menu';
import { FeaturedCard } from './FeaturedCard';
import { FeaturedRow } from './FeaturedRow';
import { Dishrow } from './Dishrow';
import {
  useBasketState,
  useBasketDispatch,
  setResturant,
  getItemsByStoreId,
  useCartsState,
  setBasketFromCart,
} from '@min-two/business-web';

const RestaurantProfile = ({ route }) => {
  const navigation = useNavigation();
  const sectionRefs = useRef([]);
  const scrollRef = useRef(null);

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen
  const basketDisptach = useBasketDispatch();

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const {
    name,
    coverImage,
    rating,
    ratingCount,
    distance,
    profileImage,
    sections,
    id,
    address,
    city,
    state,
    zip,
    hasCartsActive,
  } = route.params;

  // No need to defualt here cant get to featured row without sections

  const [hasActiveCart, setHasActiveCart] = useState(hasCartsActive);

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

  //  if store is the same then do nothing ?
  useEffect(() => {
    setResturant(basketDisptach, store);
  }, []);

  const sectionsObj = sections.sections;
  const cartState = useCartsState();
  const [ungroupedItems, setUngroupeItems] = useState([]);

  const scrollToFeature = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].measureLayout(
        findNodeHandle(scrollRef.current),
        (x, y) => {
          scrollRef.current.scrollTo({ y: y, animated: true });
        }
      );
    }
  };

  useEffect(() => {
    if (hasActiveCart == true) {
      setUngroupeItems(getItemsByStoreId(cartState, id));
    }
  }, [hasActiveCart, cartState]);

  //  get cart info here

  return (
    <SafeAreaView style={styles.businessProfileLayout}>
      <View style={styles.businessProfileAdjustment}>
        <View style={styles.businessTopView}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name='chevron-left' size={33} color='black' />
          </TouchableOpacity>

          <ScrollView
            ref={scrollRef}
            horizontal={true} // Set horizontal scroll
            showsHorizontalScrollIndicator={false}
            style={styles.featureScrollView}
          >
            {sectionsObj.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToFeature(index)}
              >
                <View style={styles.featureOval}>
                  <Text style={styles.featureName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.businessScroll}
          ref={scrollRef}
        >
          <Image
            source={{ url: coverImage }}
            style={{ width: '100%', height: 165 }}
          />
          <View style={styles.businessHeader}>
            <View style={styles.businessLogo}>
              <Image
                source={{
                  uri: profileImage,
                }}
                style={styles.image}
              />
            </View>
            <Text style={styles.businessName}>{name}</Text>

            <TouchableOpacity style={styles.businessInfo} onPress={togglePopUp}>
              <View style={styles.businessDetails}>
                <Ionicons name='star-sharp' size={15} color='black' />
                <Text>
                  {rating}({ratingCount})
                </Text>
                {distance && (
                  <>
                    <Text> • </Text>
                    <Text style={styles.businessDistance}>{distance} mi</Text>
                  </>
                )}

                <Feather name='chevron-right' size={16} color='grey' />
              </View>
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

          <View style={styles.businessTabView}>
            {sectionsObj.map((item, sectionIndex) => (
              <View
                style={styles.businessTab}
                key={sectionIndex}
                ref={(ref) => (sectionRefs.current[sectionIndex] = ref)}
              >
                <Text style={styles.featuredName}>{item.name}</Text>
                {item.dishes.map((dish, dishIndex) => (
                  <Dishrow
                    key={dishIndex}
                    dish={dish}
                    store={store}
                    activeOverride={setHasActiveCart}
                  />
                ))}
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

export { RestaurantProfile };
