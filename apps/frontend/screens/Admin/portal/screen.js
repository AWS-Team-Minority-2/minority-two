import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DetailCard from './detailCard';
import { Card } from './card';
import styles from '../sass/Admin.scss';
import { useStores } from '@min-two/business-web';

const AdminPortalScreen = () => {
  const [adminName, setAdminName] = useState('');
  const { allBusiness, pendingBusinesses, verifiedBusinesses } = useStores();

  console.log(verifiedBusinesses, 'bbb');
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setAdminName(value);
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log('Error checking item: ', error);
      }
    };

    getUser();
  }, []);

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log('Error removing user: ', error);
    }
  };

  const handleAdminLogout = async () => {
    navigation.navigate('Home');
    removeUser();
  };

  return (
    <SafeAreaView style={styles.adminScreenAdjustment}>
      <View style={styles.adminContent}>
        <Text style={styles.helloHeader}>Hello {adminName}</Text>
        <ScrollView style={styles.adminScroll}>
          <View style={styles.scroll}>
            <Text style={styles.adminSubtext}>
              Manage all businesses within Nexa
            </Text>
            <View style={styles.cardHeadersParent}>
              <View style={styles.detailedCard}>
                <DetailCard
                  len={allBusiness?.length || 0}
                  iconName={'business-outline'}
                  label={'Total'}
                />
              </View>
              {pendingBusinesses.length != 0 && (
                <View style={styles.detailedCard}>
                  <DetailCard
                    len={pendingBusinesses?.length || 0}
                    label={'Pending'}
                    iconName={'pending-actions'}
                  />
                </View>
              )}
              <View style={styles.detailedCard}>
                <DetailCard
                  len={verifiedBusinesses?.length || 0}
                  label={'Verified'}
                  iconName={'shield-checkmark-outline'}
                />
              </View>
            </View>

            <View style={styles.manageContent}>
              <Text style={styles.selectedCardTitle}>Manage Businesses</Text>
              {allBusiness?.map((business) => (
                <Card
                  name={business.name}
                  address={business.address ?? 'Online'}
                  city={business.city}
                  state={business.state}
                  zipCode={business.zip_code}
                  renderType={business.render_type}
                  verified={!business.is_pending}
                  id={business.sid}
                  adminName={adminName}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={handleAdminLogout}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                Admin activity is recored to ensure system integrity
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { AdminPortalScreen };
