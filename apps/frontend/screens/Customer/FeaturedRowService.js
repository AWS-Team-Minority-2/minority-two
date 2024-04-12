import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FeaturedCard } from "./FeaturedCard";
import { FeaturedCardStore } from "./FeaturedCardStore";
import { service } from "./data/service";
import styles from "./sass/ServerProfile";
import { FeaturedCardService } from "./FeaturedCardService";

//Handles each feature tab of all the rows
const FeaturedRowService = ({ featuredName }) => {
  return (
    <View>
      <Text style={styles.tabName}>{featuredName}</Text>

      {service
        .filter((filteredItem) => filteredItem.feature === featuredName)
        .map((filteredItem, index) => (
          <FeaturedCardService item={filteredItem} />
        ))}
    </View>
  );
};

export { FeaturedRowService };
