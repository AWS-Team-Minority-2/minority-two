import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { FeaturedCardStore } from './FeaturedCardStore';
import styles from './sass/StoreProfile';

//Handles each feature tab of all the rows
const FeaturedRowStore = ({
  featuredName,
  featuredAmount,
  items,
  store,
  activeOverride,
}) => {
  return (
    <View>
      <View style={styles.featureSection}>
        <Text style={styles.featureName}>{featuredName}</Text>
        <TouchableOpacity style={styles.featureAmount}>
          {items.length < 1 && <Text>See all {items.length}</Text>}
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storeScroll}
      >
        {items.map((item, index) => (
          <FeaturedCardStore
            item={item}
            store={store}
            activeOverride={activeOverride}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { FeaturedRowStore };
