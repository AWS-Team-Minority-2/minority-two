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
import React, { useState, useRef, useEffect } from "react";
import styles from "./sass/ServerProfile";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { features } from "./data/service";
import { FeaturedRow } from "./FeaturedRow";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useNavigation } from "@react-navigation/native";
import { Reviews } from "./data/serverReviews";
import { FeaturedRowService } from "./FeaturedRowService";

const ServerProfile = () => {
  const serverInfo = [
    {
      id: "1",
      name: "Federico",
      address: "2612 Georgia Ave NW",
      image:
        "https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170",
      rating: "5.0(191)",
      about:
        "DC born and a barber for the past 15 years! The Howard community has always been home",
      moreInfo: "No walk-ins of Fridays and Saturdays",
      number: "(272) 345-7854",
      Monday: "Closed",
      Tuesday: "11:00 AM - 5:30 PM",
      Wednesday: "11:00 AM - 5:30 PM",
      Thursday: "11:00 AM - 5:30 PM",
      Friday: "11:00 AM - 3:00 PM",
      Saturday: "11:00 AM - 3:00 PM",
      Sunday: "Closed",
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

  const [selectedOption, setSelectedOption] = useState("Service");

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesome key={i} name="star" size={14} color="#f2998d" />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={14} color="black" />
        );
      }
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.serverProfileLayout}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   style={styles.serviceScroll}
        >
          <ImageBackground
            source={{
              uri: "https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170",
            }}
            style={{ width: "100%", height: 185, ...styles.topView }}
          >
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => {
                changeScreen(dispatch, "ServiceProfile");
                navigation.navigate("ServiceProfile");
              }}
            >
              <Feather name="chevron-left" size={25} color="black" />
            </TouchableOpacity>

            {serverInfo.map((server) => (
              <Text style={styles.rating}>★{server.rating}</Text>
            ))}
          </ImageBackground>

          {serverInfo.map((server) => (
            <View style={styles.serverTopView}>
              <Text style={styles.serverName}>
                Best Cuts BarberShop- {server.name}
              </Text>
              <Text style={styles.serverAddress}>{server.address}</Text>
            </View>
          ))}
          <View style={styles.reviewContent}>
            <ScrollView
              ref={scrollRef}
              horizontal={true} // Set horizontal scroll
              showsHorizontalScrollIndicator={false}
              style={styles.serverScrollView}
            >
              {Reviews.slice(0, 3).map((review, index) => (
                <View
                  key={index}
                  style={[styles.reviewBox, index === 0 && { marginLeft: 10 }]}
                >
                  <View style={styles.reviewUser}>
                    <FontAwesome name="user-circle-o" size={18} color="black" />
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.dateContainer}>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                  <View style={styles.starContainer}>
                    {renderStars(review.rating)}
                  </View>
                  <Text style={styles.reviewComment}>
                    {review.comment.length > 100
                      ? `${review.comment.slice(0, 100)}...`
                      : review.comment}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.allReviews}
                onPress={() => {
                  changeScreen(dispatch, "Review");
                  navigation.navigate("Review");
                }}
              >
                <Text style={styles.allReviewsText}>All Reviews</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => handleToggle("Service")}
            >
              <Text
                style={[
                  styles.topButtonText,
                  selectedOption === "Service" && styles.selectedButtonText,
                ]}
              >
                Services
              </Text>
              {selectedOption === "Service" && (
                <View style={[styles.underline, styles.selectedUnderline]} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => handleToggle("Details")}
            >
              <Text
                style={[
                  styles.topButtonText,
                  selectedOption === "Details" && styles.selectedButtonText,
                ]}
              >
                Details
              </Text>
              {selectedOption === "Details" && (
                <View style={[styles.underline, styles.selectedUnderline]} />
              )}
            </TouchableOpacity>
          </View>

          {selectedOption === "Service" && (
            <View style={styles.businessTabView}>
              {features.map((item, index) => (
                <View
                  style={styles.businessTab}
                  key={index}
                  ref={(ref) => (sectionRefs.current[index] = ref)}
                >
                  <FeaturedRowService featuredName={item} />
                </View>
              ))}
            </View>
          )}
          {selectedOption === "Details" && (
            <View>
              {serverInfo.map((server) => (
                <View style={styles.detailView}>
                  <Text style={styles.detailHeader}>About:</Text>
                  <Text>{server.about}</Text>
                  <View style={styles.detailDivider}></View>

                  <Text style={styles.detailHeader}>More Info:</Text>
                  <Text>{server.moreInfo}</Text>
                  <View style={styles.detailDivider}></View>

                  <Text style={styles.detailHeader}>Number:</Text>
                  <Text>{server.number}</Text>
                  <View style={styles.detailDivider}></View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Monday:</Text>
                    <Text style={styles.detailHours}>{server.Monday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Tuesday:</Text>
                    <Text style={styles.detailHours}>{server.Tuesday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Wednesday:</Text>
                    <Text style={styles.detailHours}>{server.Wednesday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Thursday:</Text>
                    <Text style={styles.detailHours}>{server.Thursday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Friday:</Text>
                    <Text style={styles.detailHours}>{server.Friday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Saturday:</Text>
                    <Text style={styles.detailHours}>{server.Saturday}</Text>
                  </View>

                  <View style={styles.detailHourBox}>
                    <Text style={styles.detailDays}>Sunday:</Text>
                    <Text style={styles.detailHours}>{server.Sunday}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { ServerProfile };

{
  /* <TouchableOpacity style={styles.Favorite} onPress={toggleFavorite}>
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
            )} */
}
