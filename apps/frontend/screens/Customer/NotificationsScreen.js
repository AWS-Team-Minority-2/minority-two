import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import noNotfications from '../../../frontend/assets/bell.png';

import styles from './sass/Notifications.scss';

const NotificationsScreen = () => {
  const [noNotifcations, setNotifcations] = useState(false);
  return (
    <SafeAreaView style={styles.safeAreaViewBase}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyleTexts}>Notifications</Text>
      </View>
      {noNotifcations ? (
        <View style={styles.noNotficationsView}>
          <Image source={noNotfications} style={styles.noNotficationsImage} />
        </View>
      ) : (
        <ScrollView>
          <Text>hello</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export { NotificationsScreen };
