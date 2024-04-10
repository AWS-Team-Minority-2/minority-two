// import { View, Text } from 'react-native'
// import React from 'react'
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  findNodeHandle,
  StyleSheet,
  ImageBackground,
} from "react-native";
import styles from "./sass/ServiceProfile";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import BusinessProfilePopUp from "./BusinessProfilePopUp";
// import { useAuthState } from "@min-two/user-iso";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { desserts, features } from "./data/menu";

const ServiceProfile = () => {
  const list = [
    {
      id: "1",
      name: "Federico",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170",
      rating: "5.0(191)",
    },
    {
      id: "2",
      name: "Linford",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/region1/us/81674/biz_photo/9110bedbc7fb4058adf2a06e0b2ffa-best-cut-barber-linford-biz-photo-68facca85b9f47e696e250ad28d5a1-booksy.jpeg?size=640x427",
      rating: "4.9(299)",
    },
    {
      id: "3",
      name: "Jay",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/region1/us/433062/inspiration/aae242ec6a42481c89278ae90cbb14-best-cuts-jay-inspiration-2d0f96a6549f4b1fb8628787b411d2-booksy.jpeg?size=1170x1170",
      rating: "5.0(75)",
    },
    {
      id: "4",
      name: "Darnell",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/region1/us/429485/inspiration/1d34346537dc4dae87831f97689c41-best-cuts-barbershop-darnell-inspiration-076f7dd7774c4af8a663b72ab7ee28-booksy.jpeg?size=1170x1170",
      rating: "4.6(10)",
    },
  ];

  const navigation = useNavigation();
  const sectionRefs = useRef([]);
  //   const scrollRef = useRef(null);

  const dispatch = useScreenDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  // const fadeAnim = useRef(new Animated.Value(1)).current;
  const [showBanner, setShowBanner] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const businessName = "Best Cuts Barbershop";
  const businessLocation = {
    latitude: 38.92784,
    longitude: -77.02336,
    latitudeDelta: 0.00013,
    longitudeDelta: 0.00694,
  };
  
  const businessHours = {
    Monday: "11am-9pm",
    Tuesday: "11am-9pm",
    Wednesday: "11am-9pm",
    Thursday: "11am-9pm",
    Friday: "11am-9pm",
    Saturday: "11am-9pm",
    Sunday: "11am-7pm",
  }; // Example business hours, replace with actual hours
  const address = "2928 Georgia Ave NW"; // Example address, replace with actual address
  const area = "Washington, DC 20001";
  const phoneNumber = "+1 (202) 232-1700"; // Example phone number, replace with actual number

  useEffect(() => {
    if (isFavorite) {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 2000); // Hide banner after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isFavorite]);

  return (
    <SafeAreaView style={styles.serviceProfileLayout}>
      <View style={styles.serviceProfileAdjustment}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.serviceScroll}
          //   onScroll={handleScroll}
          //   ref={scrollRef}
        >
          <ImageBackground
            source={{
              uri: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/152418/biz_photo/92100ea4c07a47deb8fe199e30836c-best-cuts-federico-biz-photo-82dec9007384407992560dd708edf0-booksy.jpeg?size=640x427",
            }}
            style={{ width: "100%", height: 185, ...styles.topView }}
          >
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => {
                changeScreen(dispatch, "Home");
                navigation.navigate("UserHome");
              }}
            >
              <Feather name="chevron-left" size={25} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.Favorite} onPress={toggleFavorite}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-outline"}
                size={20}
                color={isFavorite ? "#f2998d" : "black"}
              />
            </TouchableOpacity>
            {showBanner && (
              <View style={styles.banner}>
                <Text style={{ color: "white", marginLeft: 5 }}>
                  Added to favorites
                </Text>
                <MaterialIcons
                  name="favorite-outline"
                  size={20}
                  color="white"
                />
              </View>
            )}
          </ImageBackground>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceLogo}>
              <Image
                source={{
                  uri: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/152418/logo/bebf0dc0ff33466c9070ffaf3090fa-best-cuts-federico-logo-fdbec9e50def4628bf37817e086306-booksy.jpeg",
                }}
                style={styles.image}
              />
            </View>
            <Text style={styles.serviceName}>Best Cuts BarberShop</Text>
            <Text style={styles.businessType}>Service</Text>

            <TouchableOpacity style={styles.serviceInfo} onPress={togglePopUp}>
              <View style={styles.serviceDetails}>
                <Ionicons name="star-sharp" size={15} color="black" />
                <Text> 4.0(52) • </Text>
                <Text style={styles.serviceDistance}>0.2 mi</Text>
                <Feather name="chevron-right" size={16} color="grey" />
              </View>
            </TouchableOpacity>
            <BusinessProfilePopUp
              isVisible={isPopUpVisible}
              onClose={togglePopUp}
              businessName={businessName}
              businessLocation={businessLocation}
              businessHours={businessHours}
              address={address}
              area={area}
              phoneNumber={phoneNumber}
            />
          </View>

          {list.map((card) => (
            <View style={styles.card} key={card.id}>
              <TouchableOpacity
                onPress={() => {
                  changeScreen(dispatch, "ServerProfile");
                  navigation.navigate("ServerProfile");
                }}
              >
                <ImageBackground
                  source={{ uri: card.image }}
                  style={styles.imageBackground}
                >
                  <Text style={styles.rating}>★{card.rating}</Text>
                </ImageBackground>
              </TouchableOpacity>

              <View style={styles.bottomOfCard}>
                <Text style={styles.name}>{card.name}</Text>
                <TouchableOpacity style={styles.viewServices}>
                  <Text style={styles.viewServiceText}>View Services</Text>
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={15}
                    color="#838383"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { ServiceProfile };

// const scrollToFeature = (index) => {
//     if (sectionRefs.current[index]) {
//       sectionRefs.current[index].measureLayout(
//         findNodeHandle(scrollRef.current),
//         (x, y) => {
//           scrollRef.current.scrollTo({ y: y, animated: true });
//         }
//       );
//     }
//   };

//   const [showFeatures, setShowFeatures] = useState(false);

//   const handleScroll = (event) => {
//     const yOffset = event.nativeEvent.contentOffset.y;
//     const headerHeight = 300; // Adjust the height of the serviceHeader section
//     setShowFeatures(yOffset >= headerHeight); // Show features after scrolling past serviceHeader
//   };

// {showFeatures && (
//     <View style={styles.featuresContainer}>
//       {features.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => scrollToFeature(index)}
//         >
//           <View style={styles.featureOval}>
//             <Text style={styles.featureName}>{item}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   )}
