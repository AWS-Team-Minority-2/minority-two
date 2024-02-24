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
import { useNavigation } from '@react-navigation/native';

const Card = ({
  name,
  address,
  city,
  state,
  zipCode,
  renderType,
  verified,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={
        verified
          ? styles.selectedBusinessCard
          : styles.selectedBusinessCardPending
      }
    >
      {/* style={styles.selectedBusinessCard} */}
      <View style={styles.Business} a>
        {/*  style={styles.Business}*/}
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{name}</Text>
        {verified && (
          <View style={styles.verifiedMark}>
            <Ionicons
              name='shield-checkmark-sharp'
              size={15}
              color='#f2998d'
              style={{ marginLeft: 5 }}
            />
          </View>
        )}

        {!verified && (
          <View style={styles.verifiedMark}>
            <MaterialIcons
              name='pending-actions'
              size={15}
              color='black'
              style={{ marginLeft: 5 }}
            />
          </View>
        )}
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AdminBusinessEdit', {
              name,
              address,
              city,
              state,
              zipCode,
              renderType,
              verified,
            })
          }
        >
          {!verified && (
            <Text style={styles.editBusinessText}>Approve Business</Text>
          )}

          <Text style={styles.editBusinessText}>Edit Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Card };
