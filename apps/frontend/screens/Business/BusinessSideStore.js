import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder,
  findNodeHandle,
} from 'react-native';

import styles from './sass/BusinessHome.scss';

import { Feather, Ionicons, Octicons, Entypo } from '@expo/vector-icons';

import { BusinessEditable } from '@min-two/business-web';
import { DishrowEditable } from './DishrowEditable';
import { AddNewSectionPopup } from './AddNewSectionPopup';

const BusinessSideStore = ({ route }) => {
  const navigation = useNavigation();
  const storeId = 'Nexa-3';
  const { store } = BusinessEditable(storeId);
  const [sectionsObj, setSectionsObj] = useState([]);

  const storeObj = store.store;
  const [featureNames, setFeatureNames] = useState([]);

  useEffect(() => {
    if (storeObj) {
      setSectionsObj(storeObj.section.sections);
      // dont use state to map
    }
  }, [storeObj]);

  useEffect(() => {
    sectionsObj.map((s) => {
      // Check if the name already exists in featureNames array
      if (!featureNames.includes(s.name)) {
        // If it doesn't exist, add it to the updatedFeatureNames array
        setFeatureNames((prevFeatureNames) => [...prevFeatureNames, s.name]);
      }
    });
  }, [sectionsObj]);

  const [businessEditStauts, setBusinessEditStauts] = useState('view');
  const [isSectionModalVisble, setIsSectionModalVisble] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.businessProfileLayout}>
        <View style={styles.businessProfileAdjustment}>
          <View style={styles.businessTopView}>
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Feather name='chevron-left' size={33} color='black' />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.businessScroll}
          >
            <Image
              source={{
                uri: storeObj ? storeObj.cover_image : '',
              }}
              style={{ width: '100%', height: 165 }}
            />
            <View style={styles.businessHeader}>
              <View style={styles.businessLogo}>
                <Image
                  source={{
                    uri: 'https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/mk14instqbi8fwbokgm0',
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.businessNameParent}>
                <Text style={styles.businessName}>NuVegan</Text>
                {businessEditStauts == 'view' && (
                  <TouchableOpacity style={styles.editTab}>
                    <Entypo
                      name='edit'
                      size={20}
                      color='black'
                      onPress={() => {
                        setBusinessEditStauts('edit');
                      }}
                    />
                  </TouchableOpacity>
                )}

                {businessEditStauts == 'edit' && (
                  <TouchableOpacity style={styles.editTab}>
                    <Entypo
                      name='save'
                      size={20}
                      color='black'
                      onPress={() => {
                        setBusinessEditStauts('view');
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity style={styles.businessInfo}>
                <View style={styles.businessDetails}>
                  {businessEditStauts == 'view' && (
                    <>
                      <Octicons name='dot-fill' size={24} color='green' />
                      <Text style={styles.activeText}>Active</Text>
                    </>
                  )}

                  {businessEditStauts == 'edit' && (
                    <>
                      <Octicons name='dot-fill' size={24} color='#FFBF00' />
                      <Text style={styles.editModeText}>EDIT MODE</Text>
                      <Text></Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.businessTabView}>
              {sectionsObj.map((item, sectionIndex) => (
                <View style={styles.businessTab} key={sectionIndex}>
                  <View style={styles.businessEditSectionName}>
                    <Text style={styles.featuredName}>{item.name}</Text>
                  </View>
                  {item.dishes.map((dish, dishIndex) => (
                    <DishrowEditable
                      key={dishIndex}
                      dish={dish}
                      store={storeObj}
                      type={businessEditStauts}
                    />
                  ))}
                </View>
              ))}
              {businessEditStauts == 'edit' && (
                <TouchableOpacity
                  style={styles.addSectionBttn}
                  onPress={() => {
                    setIsSectionModalVisble(true);
                  }}
                >
                  <Text>Add New Item</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <AddNewSectionPopup
        isVisible={isSectionModalVisble}
        onClose={() => {
          setIsSectionModalVisble(false);
        }}
        sectionNames={featureNames}
      />
    </>
  );
};

export { BusinessSideStore };
