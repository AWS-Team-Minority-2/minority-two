import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  findNodeHandle,
  ImageBackground,
} from "react-native";
import styles from "./sass/BusinessProfile";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import BusinessProfilePopUp from "./BusinessProfilePopUp";
// import { useAuthState } from "@min-two/user-iso";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { desserts, features } from "./data/menu";
import { FeaturedCard } from "./FeaturedCard";
import { FeaturedRow } from "./FeaturedRow";

const BusinessProfile = ({ route }) => {
  const navigation = useNavigation();
  const sectionRefs = useRef([]);
  const scrollRef = useRef(null);

  const dispatch = useScreenDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  // Define business details
  const businessName = route.params.name;
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

  const [isFavorite, setIsFavorite] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { name, coverImage, rating, ratingCount, distance, profileImage } =
    route.params;

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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isFavorite) {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 2000); // Hide banner after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isFavorite]);

  const [showFeatureScroll, setShowFeatureScroll] = useState(false);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Adjust the threshold value as needed
    if (offsetY > 10) {
      setShowFeatureScroll(true);
      console.log("true");
    } else {
      setShowFeatureScroll(false);
      console.log("false");
    }
  };

  return (
    <SafeAreaView style={styles.businessProfileLayout}>
      <View style={styles.businessProfileAdjustment}>
        <View style={styles.businessTopView}>
          {showFeatureScroll && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
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
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.businessScroll}
          ref={scrollRef}
        >
          <ImageBackground
            source={{
              url: coverImage,
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
                <Ionicons name="star-sharp" size={15} color="black" />
                <Text>
                  {rating}({ratingCount})
                </Text>
                {distance && (
                  <>
                    <Text> • </Text>
                    <Text style={styles.businessDistance}>{distance} mi</Text>
                  </>
                )}

                <Feather name="chevron-right" size={16} color="grey" />
              </View>
            </TouchableOpacity>
            <BusinessProfilePopUp
              isVisible={isPopUpVisible}
              onClose={togglePopUp}
              businessName={businessName}
              businessLocation = {businessLocation}
              businessHours={businessHours}
              address={address}
              area={area}
              phoneNumber={phoneNumber}
            />
          </View>

          <View style={styles.businessTabView}>
            {features.map((item, index) => (
              <View
                style={styles.businessTab}
                key={index}
                ref={(ref) => (sectionRefs.current[index] = ref)}
              >
                <FeaturedRow featuredName={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { BusinessProfile };
