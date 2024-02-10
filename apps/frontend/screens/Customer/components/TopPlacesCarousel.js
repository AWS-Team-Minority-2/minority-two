import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

const CARD_WIDTH = 293;
const CARD_HEIGHT = 200;

const TopPlacesCarousel = ({list}) => {
  return (
    <FlatList
      data={list}
      horizontal
    //   snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
                marginLeft: index === 0 ? 2 : -25, // Adjust the marginLeft for the first card
              marginRight: index === list.length - 1 ? -35 : 0, // Adjust the marginRight for the last card
            }}>
            <View style={[styles.card, styles.dark]}>
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: 18,
    right: 1,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH -50,
    height: CARD_HEIGHT -50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH -50,
    height: CARD_HEIGHT -50,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 45,
    left: 7,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    fontSize: 13,
    color: '#555',
  },
  light: {
      shadowColor: '#000',
      shadowRadius: 4,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    dark: {
      shadowColor: '#000',
      shadowRadius: 4,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    
});

export default TopPlacesCarousel;