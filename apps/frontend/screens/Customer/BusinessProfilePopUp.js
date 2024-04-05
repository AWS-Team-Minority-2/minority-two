// PopUpScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Linking,
  PanResponder,
  ScrollView,
} from 'react-native';
import styles from './sass/BusinessProfile.scss';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';

const BusinessProfilePopUp = ({
  isVisible,
  onClose,
  hours,
  name,
  subCat,
  number,
  city,
  state,
  zip,
  address,
}) => {
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();

  //Handles dropdown to show business hours
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const businessHours = {
    'Monday-Saturday': '11am-9pm',
    Sunday: '11am-7pm',
  };

  //handles dropdown for user to rate business
  const [rate, setRate] = useState(false);
  const toggleRating = () => {
    setRate(!rate);
  };

  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.businessPopUp}>
        <View style={styles.businessPopupLayout}>
          <MapView
            style={styles.businessMap}
            region={businessLocation}
            rotateEnabled={false}
            scrollEnabled={false}
          />
          <TouchableOpacity
            style={styles.businessPopUpBack}
            onPress={() => {
              onClose();
            }}
          >
            <MaterialCommunityIcons name='close' size={27} color='black' />
          </TouchableOpacity>
          <ScrollView style={styles.businessMapInfo}>
            <Text style={styles.businessMapName}>{name}</Text>
            <Text style={styles.businessMapSubInfo}>{subCat}</Text>

            <View style={styles.businessMapBox}>
              <TouchableOpacity
                // onPress={copyAddress}
                style={styles.businessMapContent}
              >
                <Entypo name='location-pin' size={26} color='black' />
                <View style={styles.businessMapText}>
                  <Text>{address}</Text>
                  <Text>
                    {city}, {state} {zip}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name='content-copy'
                  size={18}
                  color='black'
                  style={styles.businessMapSubBttt}
                />
              </TouchableOpacity>
              <View style={styles.businessMapDivider}></View>
            </View>

            <View style={styles.businessMapBox}>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.businessMapContent}
              >
                <MaterialCommunityIcons name='clock' size={22} color='black' />
                <Text style={styles.businessMapText}>Open till 10:00pm</Text>
                {isDropdownOpen ? (
                  <Entypo
                    name='minus'
                    size={20}
                    color='black'
                    style={styles.businessMapSubBttt}
                  />
                ) : (
                  <Entypo
                    name='plus'
                    size={20}
                    color='black'
                    style={styles.businessMapSubBttt}
                  />
                )}
              </TouchableOpacity>
              {isDropdownOpen && (
                <View style={styles.dropdownContent}>
                  {Object.entries(businessHours).map(([days, hours], index) => (
                    <View style={styles.dropdownHours}>
                      <Text style={styles.dropdownDays}>{days}</Text>
                      <Text style={styles.dropdownTimes}>{hours}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={styles.businessMapDivider}></View>
            </View>

            <View style={styles.businessMapBox}>
              <TouchableOpacity
                onPress={toggleRating}
                style={styles.businessMapContent}
              >
                <Ionicons name='star-sharp' size={22} color='black' />
                <Text style={styles.businessMapText}>Rate {name}</Text>
                {rate ? (
                  <Entypo
                    name='minus'
                    size={20}
                    color='black'
                    style={styles.businessMapSubBttt}
                  />
                ) : (
                  <Entypo
                    name='plus'
                    size={20}
                    color='black'
                    style={styles.businessMapSubBttt}
                  />
                )}
              </TouchableOpacity>
              {rate && <View style={styles.dropdownContent}></View>}
              <View style={styles.businessMapDivider}></View>
            </View>

            <View style={styles.businessMapBox}>
              <TouchableOpacity style={styles.businessMapContent}>
                <MaterialIcons name='message' size={22} color='black' />
                <Text style={styles.businessMapText}>Contact {name}</Text>
              </TouchableOpacity>
              <View style={styles.businessMapDivider}></View>
            </View>

            <View
              style={[
                styles.businessMapBox,
                isDropdownOpen && styles.businessMapBoxWithDropdown,
              ]}
            >
              <TouchableOpacity
                // onPress={promptCall}
                style={styles.businessMapContent}
              >
                <MaterialIcons name='phone' size={22} color='black' />
                <Text style={styles.businessMapText}>+1 (202) 232-1700</Text>
              </TouchableOpacity>
              <View style={styles.businessMapDivider}></View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
    // style={styles.businessDetails}
  );
};

export default BusinessProfilePopUp;

// Handles the ability for the User to swipes the pop up screen down
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.dy > 50) {
//           onClose(); // Close the modal if user swipes down
//         }
//       },
//     })
//   ).current;

//   const promptCall = () => {
//     // Prompt the user to call
//     const phoneNumber = "+12022321700";
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   const copyAddress = () => {
//     const address = "2928 Georgia Ave NW, Washington, DC 20001"; // Or get the address dynamically
//     Clipboard.setString(address);
//     // Optionally, provide feedback to the user (e.g., toast message) that the address has been copied
//   };
