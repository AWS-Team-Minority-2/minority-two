import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './sass/Browse';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';

const Browse = () => {

    const navigation = useNavigation();

    const dispatch = useScreenDispatch();

    return (
        <View style={styles.browseLayout}>
            <View style={styles.browseAdjustment}>
            

                <View style={styles.browseNotifBar}>

                <Text style={styles.browseText}>Browse</Text>

                <TouchableOpacity style={styles.notification}>
                    <Ionicons
                    name='notifications-outline'
                    size={20}
                    color='black'
                    />
                </TouchableOpacity>
                </View>


                <View style={styles.searchContainer}>
                    <Ionicons
                    name='search-outline'
                    size={17}
                    color='black'
                    style={styles.searchIcon}
                />
                <TextInput style={styles.textInput} placeholder='Search Nexa' />
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => navigation.navigate('UserMap')}>
                    <Feather
                    name='map'
                    size={17}
                    color='black'
                    style={styles.mapIcon}
                    />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.Scroll}
                showsVerticalScrollIndicator={false}>

                <View style={styles.Boxes}>

                    <TouchableOpacity style={styles.Box}
                    onPress={() => {
                    changeScreen(dispatch, 'ServicesBrowse');
                    navigation.navigate('ServicesBrowse');}
                    }>
                        <Image style={styles.Image} source={{ uri: "https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/Copy%20of%20hair%20salon%20websites-May-10-2023-01-13-53-2451-PM.png?width=1190&height=800&name=Copy%20of%20hair%20salon%20websites-May-10-2023-01-13-53-2451-PM.png"}}/>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Services</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Box}
                    onPress={() => {
                    changeScreen(dispatch, 'RestaurantsBrowse');
                    navigation.navigate('RestaurantsBrowse');}
                    }>
                        <Image style={styles.Image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQym_Og5r3J7EAuasQJf0kdP2706Vg8uVjlYY-Ja86sgoy-PU8 " }}/>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Restaurants</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Box}
                    onPress={() => {
                    changeScreen(dispatch, 'ShopsBrowse');
                    navigation.navigate('ShopsBrowse');}
                    }>
                        <Image style={styles.Image} source={{ uri: "https://www.motorcitysupplies.com/wp-content/uploads/2019/07/Biodegradable-shopping-bags.jpg"}}/>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Shop</Text>

                        </View>
                    </TouchableOpacity>


                
                </View>
                </ScrollView>
            </View>
                        
        </View>
    );
};

export { Browse };

