import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from './sass/RestaurantsBrowse';

const RestaurantsBrowse = () => {
    const navigation = useNavigation();

    const restaurantCategories = [
        { name: "Southern", imageUrl: "https://popmenucloud.com/cdn-cgi/image/width%3D3840%2Cheight%3D3840%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/nqahwdzj/bad04296-f608-42d0-bb95-0bbbf27124e8.jpg" },
        { name: "Juice and Smoothies", imageUrl: "https://cordis.europa.eu/docs/news/images/2021-01/428908.jpg" },
        { name: "Desserts", imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRIXTKXCKRU5ANNkAVZCr1qMCnCHLpb_NB6pf7eGI50eEuR0n_V" },
        { name: "Pasta", imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQqx8KGzTX3UlBJsBfLvmzXGo4YPhmux65AErnGieY-jM1cCWIk" },
        { name: "Vegan", imageUrl: "https://s3-alpha-sig.figma.com/img/0290/24ec/41177bea2f13e591091fd4d680219747?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HVjKIR6el8wHjaGaZ~GHZCj94IfGaEVD50e3uZ0TxU6yRrStbYrc4XP1Fyb7PytlMSZbGSjkSy-OjDtvcAbFi1c5cigGyRKgxK~gHrVt9IoSAO2mgRjqdR12NBaibd90GS1HjLC6ZkBwuz5qC2XSjV-sv5NETKflv3LCImuAFAFtq0jmjWD3ANZmUE0uaWje4eGf-SGc5O5DIxl65gsI82mFJRnhstaNMPkxQP6XMuf5dCBHeTj-92uP~vJnELQPmgZOk1544w29BhlhosE4arRDEhiDX-wohK1tQOSGsiNhS13Yt9VkrY7Dgi0ZmK58ytJAMgTX61k7tALrVvM0ow__" },
        { name: "Coffee and Tea", imageUrl: "https://s3-alpha-sig.figma.com/img/4e41/9e8b/f145a29d3b33cb2759c067b6888f2947?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jUFNgJD8W3qM-gJRZBu5FUen-3qqLPu5FRlKTi3ZmEAcdJqVe-xYnyMKYXdOyqVigD0-DXh8D0gVdas~qZthylZXiB6RCmWiVqxkUAVoY34QuIoMc0RPFODiJ4KebyMsIeqQhDfCBaKN6fZnz1kvASRnnZYZ5mNl4FoeHMTMZACffMpEpNlWARqXOe8uw7jDQj~6xdiK4sfHz9-Tee18rXlcv5Ou0KuNowId85R5yVnFXubFsYm700NSObPgjbiM9bowzJ1fLIfPmS-wfvwEHmTy7mGLW~UePp7mLdV-q0fhZ5APV~58aOs5kqEEtC4egBkcYOOdcENehs3gsC5byg__" },
        { name: "Pizza", imageUrl: "https://s3-alpha-sig.figma.com/img/de8f/25a5/bcceb7c823faf063c9ad2298450cbaee?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KpYyawtCuZyQzB9MKR08MlHFrdeZxNztiQJ4QT88lxN2bsQOzqJY2FJOrjWh6aXCOlVYFGHRXnVZZhqeqRl2l8B7jbhCX~dupLRJMil1531wGNGn6Jjhrv9sSxuqnNFUoPekRf2A6OY6F0bxz48g54W3jCAWBtLOS6iR2gcOM~utBQqVY1LKpJzrcQ80bfh982SpyeTISG~5r1gQhh0HbJpCujYwIvV1uJthY6bRKRz0TP-Hp~F~sCT3ZVw~7Jl8rrMi88VTf8Hou7KunEa0M47uVZG6fMqBVgM8NjvKEioTzuv59g24m9qsF304ixwRPhnWHqyrOh6hX~UA7olvZw__" },
        { name: "Ethiopian", imageUrl: "https://s3-alpha-sig.figma.com/img/c4db/4c1c/f88515de5f98f31e9ea23ceede41e1df?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i0J0P1kdv8C3G45RwaLDxlQHSDXVJe~cdyXrWjYoS9CWk87d-tAoqKYrMtLtEw4qKBkgMZRqk6gGXYv4HSF~nvdnD~72eMxBBtELisfM7olyVdJ4~v88CePD2O3FLZWopMX1E4xCaSq3X1mmMBHJaO0j0wEYNzEJ0OTEdAXX~Q~VlOpbfpBesfg5O39~nZQGmHLq6qQcYofzOHlc-8y9cuwaFhkDoeC2dBC8D8EmyopL6wJtTPM7m8iVy-fV5gdwySdbazTlUM3CpRpNqRLENZqFbK9k6KA5-rIYOMKIlMv0GQs6xoRjpLlh-bMUbiXaAXfh8Izd68JBGow-eJfeJQ__" },
        { name: "Burgers", imageUrl: "https://s3-alpha-sig.figma.com/img/d90b/c8b3/8c8e790c28168a2234b23cbdc10891ed?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z5kDgdkf-x-TEyWBWQn3JcJ3mYtIIk8ZxWg60UamXChrzszpac--K0iMndb-duxzkesRR70o3sDs0VbA-bsw9-zeZq~qVemw5JqRZowd7lULToBteQGNP3ZdYPawqx~2nLDsFDL0BirB87QnKVNQqXqTtb-L~tLsO6~QbMFkDyWYVr2NpWPxYmCt-Xp6JmOx3VM1ro-W5yByrSCEZp2yafucri5NZB5-~f-OJlXvmjLJ2B2fSsqoVRsZ3J4UQe0FIJhFlC2~fxVyIOIXnAM4PBu4hjmtpJBpdLfH1KySXTvc0I5xSiOst9IdEnTcMwiC0wIhEIBeJwjupSRnoOhGfw__" },
        { name: "Brunch", imageUrl: "https://tampamagazines.com/wp-content/uploads/2018/01/the-c-house-banner-1024x512.jpg" },
        { name: "Breakfast", imageUrl: "https://recipes.net/wp-content/uploads/2021/11/best-american-breakfast-foods.jpg" },
        { name: "Wings", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8FW6cQovDZnapZ8WMv3EoOjcoiKTyArhYQ&s" },
    ];

    return (
        <View style={styles.rLayout}>
            <View style={styles.rAdjustment}>
                <View style={styles.rNotifBar}>
                    <Ionicons name="chevron-back-outline" size={24} color='black' />
                    <Text style={styles.rText}>Restaurants</Text>
                    <TouchableOpacity style={styles.notification}>
                        <Ionicons name='notifications-outline' size={20} color='black' />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name='search-outline' size={17} color='black' style={styles.searchIcon} />
                    <TextInput style={styles.textInput} placeholder='Search Restaurants' />
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserMap')}>
                        <Feather name='map' size={17} color='black' style={styles.mapIcon} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                    {/* Render food categories */}
                    <View style={styles.Boxes}>
                        {restaurantCategories.map(category => (
                            <TouchableOpacity key={category.name}>
                                <View style={styles.Box}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.title}>{category.name}</Text>
                                    </View>
                                    {/* Placeholder for image */}
                                    <Image source={{ uri: category.imageUrl }}
                                        style={styles.Image}
                                        onError={() => console.log('Error loading image')}/>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export { RestaurantsBrowse };