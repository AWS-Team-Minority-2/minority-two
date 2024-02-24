import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';

import styles from '../sass/Admin.scss';

const Card = ({ name, address, city, state }) => {
  return (
    <View style={styles.selectedBusinessCard}>
      {/* style={styles.selectedBusinessCard} */}
      <View style={styles.Business} a>
        {/*  style={styles.Business}*/}
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{name}</Text>
        <View style={styles.verifiedMark}>
          <Ionicons
            name='shield-checkmark-sharp'
            size={15}
            color='#f2998d'
            style={{ marginLeft: 5 }}
          />
        </View>
      </View>
      {address == 'Online' && (
        <Text style={styles.selectedBusinessCardAddress}>Online</Text>
      )}

      {address && address != 'Online' && (
        <Text style={styles.selectedBusinessCardAddress}>
          {address} {city}, {state}
        </Text>
      )}

      <View style={styles.selectedBusinessOptions}>
        <TouchableOpacity style={styles.removeBusinessButton}>
          <Text style={styles.removeBusinessText}>Remove Business</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.editBusinessText}>Edit Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Card };
