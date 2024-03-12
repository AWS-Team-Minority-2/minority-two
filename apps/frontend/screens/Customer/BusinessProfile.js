import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder,
  findNodeHandle,
} from "react-native";
import styles from "./sass/BusinessProfile";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import BusinessProfilePopUp from "./BusinessProfilePopUp";
// import { useAuthState } from "@min-two/user-iso";
import { Feather, Ionicons } from "@expo/vector-icons";
import { desserts, features } from "./data/menu";
import { FeaturedCard } from "./FeaturedCard";
import FeaturedRow from "./FeaturedRow";

const BusinessProfile = () => {
  const navigation = useNavigation();
  const sectionRefs = useRef([]);
  const scrollRef = useRef(null);

  const dispatch = useScreenDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // State to manage the visibility of the pop-up screen

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

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
              changeScreen(dispatch, "Home");
              navigation.navigate("UserHome");
            }}
          >
            <Feather name="chevron-left" size={33} color="black" />
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
            source={{
              uri: "https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp",
            }}
            style={{ width: "100%", height: 155 }}
          />
          <View style={styles.businessHeader}>
            <View style={styles.businessLogo}>
              <Image
                source={{
                  uri: "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/mk14instqbi8fwbokgm0",
                }}
                style={styles.image}
              />
            </View>
            <Text style={styles.businessName}>NuVegan Cafe</Text>

            <TouchableOpacity style={styles.businessInfo} onPress={togglePopUp}>
              <View style={styles.businessDetails}>
                <Ionicons name="star-sharp" size={15} color="black" />
                <Text> 4.3(15) • </Text>
                <Text style={styles.businessDistance}>0.6 mi</Text>
                <Feather name="chevron-right" size={16} color="grey" />
              </View>
            </TouchableOpacity>
            <BusinessProfilePopUp
              isVisible={isPopUpVisible}
              onClose={togglePopUp}
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