import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import SelectedItem from "./SelectedItem";
import styles from "./sass/StoreProfile";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

const FeaturedCardStore = ({ item }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemSelection = () => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleAdd = () => {
    setAdded(true);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const revertToAdd = () => {
    setAdded(false);
    setQuantity(1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const scrollRef = useRef(null);

  return (
    <>
      <View style={styles.scrollViewContainer}>
        <TouchableOpacity onPress={() => handleItemSelection(item)}>
          <View style={styles.itemContainer}>
            <View style={styles.imageAdjust}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.itemImage}
              >
                {added ? (
                  <TouchableOpacity style={styles.addedButton}>
                    {quantity > 1 ? (
                      <MaterialIcons
                        name="remove"
                        size={20}
                        color="white"
                        onPress={decreaseQuantity}
                        style={styles.minusButton}
                      />
                    ) : (
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color="white"
                        onPress={revertToAdd}
                        style={styles.garbageIcon}
                      />
                    )}
                    <Text style={styles.numberAdded}>{quantity}</Text>
                    <MaterialIcons
                      name="add"
                      size={23}
                      color="white"
                      onPress={increaseQuantity}
                      style={styles.plusButton}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={toggleAdd}
                  >
                    <MaterialIcons name="add" size={20} color="white" />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </View>

            <View style={styles.belowImage}>
              <View style={styles.itemTopContent}>
                <Text style={styles.itemPrices}>${item.price}</Text>
                <Text style={styles.itemMeasurement}>• {item.measurement}</Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <SelectedItem
        isVisible={isModalVisible}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </>
  );
};

export { FeaturedCardStore };
