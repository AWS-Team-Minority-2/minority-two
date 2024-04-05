import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from './sass/BusinessProfile';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const SelectedItem = ({ isVisible, item, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {item && (
          <View style={styles.popUpContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
            {/* Change image for no images based on service, business, and stores */}
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.itemFavorite}
              onPress={toggleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-outline'}
                size={15}
                color='#f2998d'
              />
              <Text style={styles.itemFavoriteWords}>Favorite(22)</Text>
            </TouchableOpacity>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SelectedItem;
