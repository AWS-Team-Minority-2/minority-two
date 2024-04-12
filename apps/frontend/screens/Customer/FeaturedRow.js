import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FeaturedCard } from "./FeaturedCard";
import { FeaturedCardStore } from "./FeaturedCardStore";
import { items } from "./data/menu";
import { service } from "./data/service";
import { shop } from "./data/store";
import styles from "./sass/BusinessProfile";

//Handles each feature tab of all the rows
const FeaturedRow = ({ featuredName }) => {
  return (
    <View>
      <Text style={styles.tabName}>{featuredName}</Text>

      {items
        .filter((filteredItem) => filteredItem.feature === featuredName)
        .map((filteredItem, index) => (
          <FeaturedCard item={filteredItem} />
        ))}
    </View>
  );
};

export { FeaturedRow };
