import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import styles from "./sass/Favorites";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
  const navigation = useNavigation();
  const [pressedList, setPressedList] = useState([false, false, false]);
  const handlePress = (index) => {
    const newList = [...pressedList];
    newList[index] = !newList[index];
    setPressedList(newList);
  };

  return (
    <View style={styles.favoritesLayout}>
      <View style={styles.favoritesAdjustment}>
        <Text style={styles.favoritesText}>Favorites</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scroll}>
            <View style={styles.boxes}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.row}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://d1ralsognjng37.cloudfront.net/8ec59378-146f-4eba-ad06-80dcc9574cde.webp",
                      }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.rowTitle}>NuVegan</Text>
                    <Text style={styles.rowDistance}>4.3 mi.</Text>

                    <View style={styles.ratingContainer}>
                      <Text style={styles.rowRate}>4.4 </Text>
                      <Ionicons name="star-outline" size={12} color="black" />

                      <TouchableOpacity onPress={() => handlePress(0)}>
                        <View style={styles.heart}>
                          {pressedList[0] ? (
                            <Ionicons
                              name="heart-outline"
                              size={30}
                              color="black"
                            />
                          ) : (
                            <Ionicons name="heart" size={30} color="pink" />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row}>
                <View style={styles.row}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://s3-alpha-sig.figma.com/img/3d3b/7abd/c23c7b054d4c53a45401f991d2e277c2?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V9VmSWIEWu-bzdJBOVtmTm4CdPTBfwGMtfDrhLtXQV7LSKW7nb-~Db76MsnBmTMLDhBAjMiKwnYXyMPAEed8Pg4Od8KTdFTPTUKgRc-S3L3atSpwfbmKCmeGtFmt-fr1MxsQjKmIwRhrhbYANRz-SRWAxdwq2s22h11-HlsRIyLiaGsHVDJC6iyutiGv6SzzpIGnSiXJlHmn4KfsdICs4Xq8QeXSnDFptMhM1Vg55r2se6-axHtSmUqW2NjKMj0tF3-vpFWI01g3qHXU1iLUdj-mjKpmA9eA7nahDzeZgWpRThZgb0F5IsCYIAyhmv6oE6kNvtJ~0DiVpn22-BNh~g__",
                      }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.rowTitle}>Studio Chique</Text>
                    <Text style={styles.rowDistance}>4.3 mi.</Text>

                    <View style={styles.ratingContainer}>
                      <Text style={styles.rowRate}>4.6 </Text>
                      <Ionicons name="star-outline" size={12} color="black" />

                      <TouchableOpacity onPress={() => handlePress(1)}>
                        <View style={styles.heart}>
                          {pressedList[1] ? (
                            <Ionicons
                              name="heart-outline"
                              size={30}
                              color="black"
                            />
                          ) : (
                            <Ionicons name="heart" size={30} color="pink" />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row}>
                <View style={styles.row}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: "https://thelipbar.com/cdn/shop/files/about_us_banner.jpg?v=1645166626",
                      }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.rowTitle}>The Lip Bar</Text>
                    <Text style={styles.rowDistance}>4.3 mi.</Text>

                    <View style={styles.ratingContainer}>
                      <Text style={styles.rowRate}>4.8 </Text>
                      <Ionicons name="star-outline" size={12} color="black" />

                      <TouchableOpacity onPress={() => handlePress(2)}>
                        <View style={styles.heart}>
                          {pressedList[2] ? (
                            <Ionicons
                              name="heart-outline"
                              size={30}
                              color="black"
                            />
                          ) : (
                            <Ionicons name="heart" size={30} color="pink" />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export { Favorites };
