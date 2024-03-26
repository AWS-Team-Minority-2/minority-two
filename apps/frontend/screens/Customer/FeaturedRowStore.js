import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FeaturedCardStore } from "./FeaturedCardStore";
import { shop } from "./data/store";
import styles from "./sass/StoreProfile";

//Handles each feature tab of all the rows
const FeaturedRowStore = ({ featuredName, featuredAmount }) => {
  return (
    <View>
      <View style={styles.featureSection}>
        <Text style={styles.featureName}>{featuredName}</Text>
        <Text style={styles.featureAmount}>See all {featuredAmount}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storeScroll}
      >
        {shop
          .filter((filteredItem) => filteredItem.feature === featuredName)
          .map((filteredItem, index) => (
            <FeaturedCardStore item={filteredItem} />
          ))}
      </ScrollView>
    </View>
  );
};

export { FeaturedRowStore };
