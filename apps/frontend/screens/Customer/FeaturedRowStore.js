import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FeaturedCardStore } from './FeaturedCardStore';
import styles from './sass/StoreProfile';

//Handles each feature tab of all the rows
const FeaturedRowStore = ({
  featuredName,
  featuredAmount,
  items,
  store,
  activeOverride,
  activeItems,
}) => {
  const reduceItems = (items) => {
    const reducedItems = items.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { id: item.id, count: 1 };
      } else {
        acc[item.id].count++;
      }
      return acc;
    }, {});

    return Object.values(reducedItems);
  };

  const [groupedItems, setGroupedItems] = useState([]);

  useEffect(() => {
    setGroupedItems(reduceItems(activeItems));
  }, [activeItems]);

  function getCountById(idToCheck) {
    // Iterate through the itemList
    for (var i = 0; i < groupedItems.length; i++) {
      // Check if the current item's id matches the idToCheck
      if (groupedItems[i].id === idToCheck) {
        // If found, return the count
        return groupedItems[i].count;
      }
    }
    // If not found, return 0
    return 0;
  }

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
            itemCount={getCountById(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { FeaturedRowStore };
