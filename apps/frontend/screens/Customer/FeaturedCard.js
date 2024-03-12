import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SelectedItem from "./SelectedItem";
import styles from "./sass/BusinessProfile";

const FeaturedCard = ({ item }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemSelection = () => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleItemSelection}>
        <View>
          <Text style={styles.businessItem}>{item.name}</Text>
          <Text style={styles.businessPrices}>${item.price}</Text>
          <Text style={styles.businessDesc}>{item.description}</Text>
          <View style={styles.businessItemDivider}></View>
        </View>
      </TouchableOpacity>
      <SelectedItem
        isVisible={isModalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </>
  );
};

export { FeaturedCard };
