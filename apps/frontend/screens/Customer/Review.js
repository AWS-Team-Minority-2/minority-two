import React from "react";
import styles from "./sass/Review.scss";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useScreenDispatch, changeScreen } from "@min-two/screen-iso";
import { useNavigation } from "@react-navigation/native";
import { Reviews } from "./data/serverReviews";
import { FontAwesome } from "@expo/vector-icons";
import { RatingBars } from "./RatingBar";

const Review = () => {
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();
  const ratings = [0, 0, 1, 8, 183]; // Example ratings

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesome key={i} name="star" size={20} color="#f2998d" />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={14} color="black" />
        );
      }
    }
    return stars;
  };

  const commentStars = (rating) => {
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

  const reviewInfo = [
    {
      rating: 5.0,
      totalReviews: 191,
      fiveStars: 173,
      fourStars: 15,
      threeStars: 3,
      twoStars: 0,
      oneStars: 0,
    },
  ];

  return (
    <SafeAreaView style={styles.reviewLayout}>
      <ScrollView
        style={styles.reviewAdjustment}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            changeScreen(dispatch, "ServerProfile");
            navigation.navigate("ServerProfile");
          }}
        >
          <Feather name="chevron-left" size={33} color="black" />
        </TouchableOpacity>
        {reviewInfo.map((review) => (
          <View>
            <Text style={styles.accInfoHeader}>Customer Reviews</Text>
            <View style={styles.topReviewSection}>
              <View style={styles.topReviewLeft}>
                <Text style={styles.overallRating}>{review.rating}/5</Text>
                <View style={styles.starContainer}>{renderStars(5.0)}</View>
                <Text>{review.totalReviews} reviews</Text>
              </View>
              <View style={styles.topReviewRight}>
                <RatingBars ratings={ratings} />
              </View>
            </View>

            <View style={styles.commentSectionMover}>
              {Reviews.map((comments, index) => (
                <View key={index} style={styles.commentSection}>
                  <View style={styles.commentTop}>
                    <FontAwesome name="user-circle-o" size={23} color="black" />
                    <View style={styles.commentUserRating}>
                      <Text>{comments.name}</Text>
                      <View style={styles.starContainer}>
                        {commentStars(comments.rating)}
                      </View>
                    </View>
                    <Text style={styles.commentDate}>{comments.date}</Text>
                  </View>

                  <Text style={styles.commentText}>{comments.comment}</Text>
                  <View style={styles.commentDivider}></View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export { Review };
