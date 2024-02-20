import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Card } from './card';

import styles from '../sass/Admin.scss';

const AdminPortalScreen = () => {
  return (
    <SafeAreaView style={styles.screenAdjustmentHome}>
      <View>
        <Text>Hello Admin</Text>
      </View>
      <View style={styles.summaryText}>
        <Text>Business Summary</Text>
        <Card />
      </View>
    </SafeAreaView>
  );
};

export { AdminPortalScreen };
