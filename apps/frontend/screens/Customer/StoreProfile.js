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
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "./sass/StoreProfile";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { features } from "./data/store";
import { FeaturedRowStore } from "./FeaturedRowStore";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useNavigation } from "@react-navigation/native";
import BusinessProfilePopUp from "./BusinessProfilePopUp";

const StoreProfile = () => {
  const storeInfo = [
    {
      id: "1",
      name: "Sonya's Market",
      address: "2833 11th St NW",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170",
      rating: "4.5 (62)",
      about: "",
      moreInfo: "",
      number: "(202) 387-5787",
      Monday: "Closed",
      Tuesday: "9:00 AM - 9:00 PM",
      Wednesday: "9:00 AM - 9:00 PM",
      Thursday: "9:00 AM - 9:00 PM",
      Friday: "9:00 AM - 9:00 PM",
      Saturday: "9:00 AM - 9:00 PM",
      Sunday: "9:00 AM - 9:00 PM",
    },
  ];

  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();
  const [showBanner, setShowBanner] = useState(false);
  const sectionRefs = useRef([]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const scrollRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("Store");

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen
  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  return (
    <SafeAreaView style={styles.storeProfileLayout}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   style={styles.serviceScroll}
        >
          <ImageBackground
            source={{
              uri: "https://lh3.googleusercontent.com/p/AF1QipOjLQ-_V7p5RkSeGTwfrj-nv947lirhnujcucyI=s1360-w1360-h1020",
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

          {storeInfo.map((store) => (
            <View style={styles.storeTopView}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.businessType}>Store</Text>
              <TouchableOpacity style={styles.storeInfo} onPress={togglePopUp}>
                <Ionicons name="star-sharp" size={15} color="black" />
                <Text>{store.rating}• </Text>
                <Text style={styles.businessDistance}>0.6 mi</Text>
                <Feather name="chevron-right" size={16} color="grey" />
              </TouchableOpacity>
              <BusinessProfilePopUp
                isVisible={isPopUpVisible}
                onClose={togglePopUp}
              />
            </View>
          ))}

          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={17}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Search this store"
              />
            </View>
          </View>

          <View style={styles.businessTabView}>
            {features.map((item, index) => (
              <View
                // horizontal
                style={styles.businessTab}
                key={index}
                ref={(ref) => (sectionRefs.current[index] = ref)}
              >
                <FeaturedRowStore
                  featuredName={item.name}
                  featuredAmount={item.amount}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { StoreProfile };
