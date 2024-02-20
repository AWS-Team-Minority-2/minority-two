import { View, Text } from 'react-native';
import React from 'react';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';

import styles from '../sass/Admin.scss';

const Card = () => {
  return (
    <View style={styles.topBoxsContainer}>
      <View style={styles.analyticsBoxContainer}>
        <View style={styles.analyticsBox}>
          <View style={styles.cardContents}>
            <Ionicons name='business-outline' size={21} color='black' />
            <View style={styles.analyticsContent}>
              <Text>70</Text>
              <Text style={styles.businessTitle}>Total Business</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export { Card };
