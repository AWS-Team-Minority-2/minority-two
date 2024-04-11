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
import { Dropdown } from 'react-native-element-dropdown';

import Toast from 'react-native-toast-message';

const AddNewSectionPopup = ({
  isVisible,
  onClose,
  sectionNames,
  openNewItemMenu,
}) => {
  const [sectionLabelsData, setSectionLabelsData] = useState([]);
  useEffect(() => {
    // Assuming you want to update the state variable whenever dataArray changes
    const updatedDataArray = sectionNames.map((item, index) => ({
      label: item,
      value: item,
    }));
    setSectionLabelsData(updatedDataArray);
  }, [sectionNames]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.itemNameEdit, isFocus && { color: '#f2998d' }]}>
          Feature
        </Text>
      );
    }
    return null;
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popUpContent}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>

          <View style={styles.imageUrlEdit}>
            <View style={styles.itemImage} />
            <View style={styles.itemUrlPhoto}>
              <Text style={styles.itemNameEdit}>Item Image Display</Text>
              <TextInput placeholder='Paste Image URL Here' />
            </View>
          </View>

          <View style={styles.itemNameandPrice}>
            {renderLabel()}
            <Dropdown
              style={[isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={sectionLabelsData}
              search
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder={!isFocus ? 'Select Section' : ''}
              searchPlaceholder='Search...'
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.itemNameandPrice}>
            <Text style={styles.itemNameEdit}>Name</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder={'Enter Name Here'}
            />
          </View>
          <View style={styles.itemNameandPrice}>
            <Text style={styles.itemNameEdit}>Item Description</Text>
            <TextInput
              // style={styles.inputContainer}
              placeholder='Add Item Description Here'
            />
          </View>

          <View style={styles.itemNameandPrice}>
            <Text style={styles.itemPriceEdit}>Item Price</Text>
            <TextInput
              style={styles.inputContainerPrice}
              placeholder='Ex: 13.99 or 13'
            />
          </View>

          <TouchableOpacity
            style={styles.addButtonSection}
            onPress={() => {
              openNewItemMenu(true);
            }}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { AddNewSectionPopup };
