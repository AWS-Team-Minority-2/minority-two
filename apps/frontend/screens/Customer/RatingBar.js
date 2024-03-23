import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RatingBar = ({ starNum, rating, totalRatings }) => {
  const fillPercentage = (rating / totalRatings) * 100;

  return (
    <View style={styles.ratingBar}>
      {/* <Text style={styles.ratingLabel}>{rating}</Text> */}

      <Text style={styles.starText}>{starNum} Stars</Text>

      <View style={styles.barContainer}>
        <View style={[styles.fillBar, { width: `${fillPercentage}%` }]} />
      </View>
    </View>
  );
};

export const RatingBars = ({ ratings }) => {
  const totalRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const reversedRatings = [...ratings].reverse(); // Reverse the ratings array

  return (
    <View style={styles.ratingBarsContainer}>
      {reversedRatings.map((rating, index) => (
        <RatingBar
          starNum={ratings.length - index} // Adjust starNum calculation
          key={index}
          rating={rating}
          totalRatings={totalRatings}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBarsContainer: {
    width: "100%",
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starText: {
    marginRight: 8,
  },
  barContainer: {
    width: 80, // Adjust width as needed
    height: 15, // Adjust height as needed
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10, // To make it oval-shaped
    overflow: "hidden", // To clip the contents to the rounded shape
  },
  fillBar: {
    height: "100%",
    backgroundColor: "#F2998D",
    borderRadius: 10, // To make it oval-shaped
  },
});
