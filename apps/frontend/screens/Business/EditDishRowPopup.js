import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import styles from './sass/BusinessHome.scss';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useUpdateDishRow } from '@min-two/business-web';

import Toast from 'react-native-toast-message';

const EditDishRowPopup = ({ isVisible, onClose, item }) => {
  const goodCartChange = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucessfully Added',
      text2: 'Your cart has been updated',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainerSections}>
        {item && (
          <View style={styles.popUpContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>

            <View style={styles.imageUrlEdit}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.itemImage}
              />
              <View style={styles.itemUrlPhoto}>
                <Text style={styles.itemNameEdit}>Item Image Display</Text>
                <TextInput placeholder='Paste Image URL Here' />
              </View>
            </View>

            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemNameEdit}>Name</Text>
              <TextInput
                style={styles.inputContainer}
                placeholder={item.name}
              />
            </View>
            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemNameEdit}>Item Description</Text>
              <TextInput
                // style={styles.inputContainer}
                placeholder='Click to edit description'
              />
            </View>

            <View style={styles.itemNameandPrice}>
              <Text style={styles.itemPriceEdit}>Item Price</Text>
              <TextInput
                style={styles.inputContainerPrice}
                placeholder='Update price'
              />
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Save Item</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export { EditDishRowPopup };
