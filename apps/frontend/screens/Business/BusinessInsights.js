import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Reviews } from "./data/Reviews";

import styles from "./sass/BusinessInsight.scss";

const BusinessInsights = () => {
  const scrollRef = useRef(null);
  const Business = {
    Tuesday: "11am-9pm",
    Wednesday: "11am-9pm",
    Thursday: "11am-9pm",
    Friday: "11am-9pm",
    Saturday: "11am-9pm",
    Sunday: "11am-7pm",
  };

  const [selectedInterval, setSelectedInterval] = useState("today");

  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
    // You can add logic here to handle the selected interval change
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
    <SafeAreaView style={styles.businessInsightsLayout}>
      <ScrollView
        style={styles.BusinessInsightsAdjustment}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.businessHeader}>
          <View style={styles.businessInsightsLogo}>
            <Image
              source={{
                uri: "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/mk14instqbi8fwbokgm0",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.businessInsightsInfo}>
            <Text style={styles.businessInsightsName}>Nuvegan Cafe</Text>
            <View style={styles.businessInsightsSubInfo}>
              <Text style={styles.businessInsightUnderName}>
                Vegan | 2928 Georgia Ave NW
              </Text>
            </View>

            <View style={styles.businessInsightsSubInfo}>
              <Text>(815) sales </Text>
              <View style={styles.starContainer}>{renderStars(4.0)}</View>
            </View>
          </View>
        </View>

        {/* First Stat Box */}
        <View style={styles.businessInsightsStats}>
          <Text style={styles.businessInsightsHeader}>
            Nuvegan Cafe Business Stats:
          </Text>

          {/* <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedInterval}
              onValueChange={(itemValue) => handleIntervalChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Last Week" value="lastWeek" />
              <Picker.Item label="Last Month" value="lastMonth" />
              <Picker.Item label="Last Year" value="lastYear" />
            </Picker>
          </View> */}
          
          <View style={styles.businessInsightsStatsBox}>
            <View style={styles.businessInsightsSection}>
              <View style={styles.businessInsightsTitleBox}>
                <Text style={styles.businessInsightsTitle}>Orders</Text>
                <Feather name="arrow-right" size={14} color="black" />
              </View>

              <Text style={styles.businessInsightsStat}>15</Text>
              <View style={styles.divider}></View>
            </View>

            <View style={styles.businessInsightsSection}>
              <View style={styles.businessInsightsTitleBox}>
                <Text style={styles.businessInsightsTitle}>Items in Cart</Text>
                <Feather name="arrow-right" size={14} color="black" />
              </View>

              <Text style={styles.businessInsightsStat}>8</Text>
              <View style={styles.divider}></View>
            </View>

            <View style={styles.businessInsightsSection}>
              <View style={styles.businessInsightsTitleBox}>
                <Text style={styles.businessInsightsTitle}>Revenue</Text>
                <Feather name="arrow-right" size={14} color="black" />
              </View>

              <Text style={styles.businessInsightsStat}>$258</Text>
              <View style={styles.divider}></View>
            </View>
          </View>
        </View>

        {/* Second Stat Box */}
        <View style={styles.businessInsightsStats}>
          <Text style={styles.businessInsightsHeaderUR}>User Reviews:</Text>
          <Text style={styles.businessInsightsSubHeaderUR}>
            Feedback from buyers based on product, service, and your overall
            business
          </Text>
          <ScrollView
            ref={scrollRef}
            horizontal={true} // Set horizontal scroll
            showsHorizontalScrollIndicator={false}
            style={styles.serverScrollView}
          >
            {Reviews.slice(0, 3).map((review, index) => (
              <View
                key={index}
                style={[styles.reviewBox, index === 0 && { marginLeft: 25 }]}
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
          </ScrollView>
        </View>

        {/* Third Stat Box */}
        <View style={styles.businessInsightsStats}>
          <Text style={styles.businessInsightsHeader}>Top Products:</Text>
          <View style={styles.businessInsightsStatsBoxTP}>
            {/* First product */}
            <View style={styles.businessInsightsTPsectionRow}>
              <View style={styles.businessInsightsTPsection}>
                <View style={styles.imageTPBox}>
                  <Image
                    source={{
                      uri: "https://i0.wp.com/www.deliciouslykind.com/wp-content/uploads/2018/10/NuVegan-RS.jpg?fit=1306%2C900&ssl=1",
                    }}
                    style={styles.imageTP}
                  />
                </View>
                <View style={styles.businessInsightsTPrightSection}>
                  <Text style={styles.titleTP}>Chicken Drum Combo</Text>
                  <View style={styles.starTP}>{renderStars(5.0)}</View>
                  <Text style={styles.salesTP}>(134) Sales</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
            </View>

            {/* Second product */}
            <View style={styles.businessInsightsTPsectionRow}>
              <View style={styles.businessInsightsTPsection}>
                <View style={styles.imageTPBox}>
                  <Image
                    source={{
                      uri: "https://images.happycow.net/venues/1024/17/90/hcmp1790_381754.jpeg",
                    }}
                    style={styles.imageTP}
                  />
                </View>
                <View style={styles.businessInsightsTPrightSection}>
                  <Text style={styles.titleTP}>Lasagna Combo</Text>
                  <View style={styles.starTP}>{renderStars(5.0)}</View>
                  <Text style={styles.salesTP}>(91) Sales</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
            </View>

            {/* Third product */}
            <View style={styles.businessInsightsTPsectionRow}>
              <View style={styles.businessInsightsTPsection}>
                <View style={styles.imageTPBox}>
                  <Image
                    source={{
                      uri: "https://imagedelivery.net/olI9wp0b6luWFB9nPfnqjQ/res/abillionveg/image/upload/pioxk2apwe1boagms0hz/1572376816.jpg/w=480",
                    }}
                    style={styles.imageTP}
                  />
                </View>
                <View style={styles.businessInsightsTPrightSection}>
                  <Text style={styles.titleTP}>Fried Fish Sandwich</Text>
                  <View style={styles.starTP}>{renderStars(4.0)}</View>
                  <Text style={styles.salesTP}>(57) Sales</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { BusinessInsights };

// onPress={() => {
//     changeScreen(dispatch, "Review");
//     navigation.navigate("Review");
//   }}
