import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SelectedItem from "./SelectedItem";
import styles from "./sass/ServerProfile";

const FeaturedCardService = ({ item }) => {
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
      <View style={styles.serviceItemBox}>
        <View style={styles.serviceItemContent}>
          <Text style={styles.serviceItem}>{item.name}</Text>
          <Text style={styles.servicePrices}>${item.price}</Text>
          <Text style={styles.serviceDesc}>{item.description}</Text>
        </View>

        <TouchableOpacity onPress={handleItemSelection} style={styles.bookButton}>
          <Text style={styles.bookText}>Book</Text>
        </TouchableOpacity>
      </View>

      <SelectedItem
        isVisible={isModalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
       <View style={styles.serviceDivider}></View>
    </>
  );
};

export { FeaturedCardService };
