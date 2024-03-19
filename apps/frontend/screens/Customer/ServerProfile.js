import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  findNodeHandle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import styles from './sass/ServerProfile';
import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { desserts, features } from './data/service';
import { FeaturedRow } from './FeaturedRow';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { useNavigation } from '@react-navigation/native';

const ServerProfile = () => {
  const serverInfo = [
    {
      id: '1',
      name: 'Federico',
      address: '2612 Georgia Ave NW',
      image:
        'https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170',
      rating: '5.0(191)',
    },
  ];

  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const dispatch = useScreenDispatch();
  const [showBanner, setShowBanner] = useState(false);
  const sectionRefs = useRef([]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const scrollRef = useRef(null);

  const Reviews = [
    {
      id: '1',
      name: 'Jourdan',
      date: 'October 23, 2024',
      comment: 'Great Barber, really nice guy',
      rating: 5,
    },
    {
      id: '2',
      name: 'Dee',
      date: 'September 23, 2024',
      comment: 'Nice clean shapeup, no waiting time and was truly professional',
      rating: 5,
    },
    {
      id: '3',
      name: 'Yony',
      date: 'January 13, 2024',
      comment:
        'Great barber been going to him these past 2 years and never fail to come back',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesome key={i} name='star' size={14} color='#f2998d' />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name='star-o' size={14} color='black' />
        );
      }
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.serverProfileLayout}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   style={styles.serviceScroll}
        >
          <ImageBackground
            source={{
              uri: 'https://d2zdpiztbgorvt.cloudfront.net/us/images/152418/inspiration_154837168471.jpeg?size=1170x1170',
            }}
            style={{ width: '100%', height: 185, ...styles.topView }}
          >
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={() => {
                changeScreen(dispatch, 'ServiceProfile');
                navigation.navigate('ServiceProfile');
              }}
            >
              <Feather name='chevron-left' size={25} color='black' />
            </TouchableOpacity>

            {serverInfo.map((server) => (
              <Text style={styles.rating}>★{server.rating}</Text>
            ))}
          </ImageBackground>

          {serverInfo.map((server) => (
            <View style={styles.serverTopView}>
              <Text style={styles.serverName}>
                Best Cuts BarberShop- {server.name}
              </Text>
              <Text style={styles.serverAddress}>{server.address}</Text>
            </View>
          ))}
          <View style={styles.reviewContent}>
            <ScrollView
              ref={scrollRef}
              horizontal={true} // Set horizontal scroll
              showsHorizontalScrollIndicator={false}
              style={styles.serverScrollView}
            >
              {Reviews.map((review, index) => (
                <View
                  key={index}
                  style={[styles.reviewBox, index === 0 && { marginLeft: 10 }]}
                >
                  <View style={styles.reviewUser}>
                    <FontAwesome name='user-circle-o' size={18} color='black' />
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.dateContainer}>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                  <View style={styles.starContainer}>
                    {renderStars(review.rating)}
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.allReviews}>
                <Text style={styles.allReviewsText}>All Reviews</Text>
                <Ionicons
                  name='arrow-forward-sharp'
                  size={17}
                  color='#f2998d'
                  style={styles.allReviewsArrow}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.businessTabView}>
            {features.map((item, index) => (
              <View
                style={styles.businessTab}
                key={index}
                ref={(ref) => (sectionRefs.current[index] = ref)}
              >
                <FeaturedRow featuredName={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export { ServerProfile };

{
  /* <TouchableOpacity style={styles.Favorite} onPress={toggleFavorite}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-outline"}
                size={20}
                color={isFavorite ? "#f2998d" : "black"}
              />
            </TouchableOpacity>
            {showBanner && (
              <View style={styles.banner}>
                <Text style={{ color: "white", marginLeft: 5 }}>
                  Added to favorites
                </Text>
                <MaterialIcons
                  name="favorite-outline"
                  size={20}
                  color="white"
                />
              </View>
            )} */
}
