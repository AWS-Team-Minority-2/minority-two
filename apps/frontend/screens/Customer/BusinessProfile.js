import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
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
import { useBasketState, useBasketDispatch } from '@min-two/business-web';

const BusinessProfile = ({ route }) => {
  const navigation = useNavigation();
  const sectionRefs = useRef([]);
  const scrollRef = useRef(null);

  const dispatch = useScreenDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen

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
  } = route.params;

  // No need to defualt here cant get to featured row without sections

  const sectionsObj = sections.sections;
  console.log(id, 'store-id');

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

  return (
    <SafeAreaView style={styles.businessProfileLayout}>
      <View style={styles.businessProfileAdjustment}>
        <View style={styles.businessTopView}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => {
              changeScreen(dispatch, 'Home');
              navigation.navigate('UserHome');
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
            {features.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToFeature(index)}
              >
                <View style={styles.featureOval}>
                  <Text style={styles.featureName}>{item}</Text>
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
                  <Dishrow key={dishIndex} dish={dish} />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { BusinessProfile };
