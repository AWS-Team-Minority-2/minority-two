import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from './sass/RestaurantsBrowse';

const ShopsBrowse = () => {
    const navigation = useNavigation();

    const shopsCategories = [
        { name: "Clothing", imageUrl: "https://s3-alpha-sig.figma.com/img/8579/5204/5d09596d535e9adae5251c3a60c7dfd5?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZFS7a2dQ5-sqD2iLH7iF38mDTX7w0o9E8kgvc-6h3YDbNhHwEXQffMKZ2l1ruUqEJAEXwj4e2swHHwn4wzaOvQQxwC9mql8OSKFTYaIHV5xjqlJ5Hc6hdwyCu82y-6i~ayUqdTliZqg4-WHzRkg-Bp4-OIc95-kQQX9TogQ-tiAGiKFXb8oxi~-xH-v1hhiwmU2-BWp8juYjgfXML5Sh3vG6RsvhiFjDtBRK4HdAR7dm~s1OyT4AzRJ-AEiaG~XYxzHhw~ZlLME54lgHm5SLfX4MF02LujbKT78DSL8bXv0NplWl9~tTt-9iovQIkSbXUOH9dYkQQEy-FlM41JunhA__" },
        { name: "Shoes", imageUrl: "https://s3-alpha-sig.figma.com/img/d119/3253/dbff056a29b591bb7903ddf8bb08950d?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V8voo7qqCRVkY7z4BZq--m~C9aE0oUUg5sNd9671-kV7RHtldcwENrOUcpTtywChCj~BKtDCSPgOgokzAUZGMzgELswz8JHe3NMHluGGFg-aLDWYr3BmmdO~5wEh5jNmigaBwxHTGUal-xGDy1QSbvlt3BALoSvVuiP4RbnFLOZ60fSYr2D-Z5ErEQXtpiJFdfXVTtc-EoU-xGG3iFq9T9JPJRiaPmsthSZSv4NjXwnaKfMSX8YgOy8v7h2MwXC2BKymm6LI3FaoVUY8V9hBjYGyTqVorGSQhWlXVZQUlouP~H54WiFrF9uhXb-TM3kubJ8E~eZyoyDkRLm95ZPoNw__" },
        { name: "Convienience", imageUrl: "https://s3-alpha-sig.figma.com/img/75ee/c8b8/32ac083fc39edf04fec9b7289108ae2b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dAYvRElSBA61mn3-Szudw1Q8tc5zlZ5SgIlwTnzKzWQxkHqrQW2D17zWgpIrhMLEUyAZg82JPWXkrETwke8TrGPiYuSI8W-rXQsLNR4vAlPWqALJcnnXLRCcp5XcQgsOSYAcbI2PsiHDZfhv2YNGhwX3LoXM2fPSJg~jxLDsVs8MzP4GKxSHm~-DFPc1L8EqJgarQtAw3tqgMdecaS6Gw9K-Yt-fI9wya2Z-5fbKoo6Z9oFnhyppvSoOLO8ibLAtfgsLk53fT38Xg2FdRGaPb4f2uih5j4uNnso5i2KoHMYCtViNqJQO-m3JCbtNm~-T0VqmDFXCHEqbFhVLCwrqmg__" },
        { name: "Accessories", imageUrl: "https://s3-alpha-sig.figma.com/img/925d/18c1/d2edb471e9e4e597681c4806d5b154f7?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RHWfkVadB1lcxuR8Kx~OI62tH98Z1T8fFBbIykUD8-G~Jl0gsgj82aTc-Br4H8viZM0NW~Zlq78iAh1EHZPXj1t6DhdtcInHZiUzJOX9nhVurCMNhZWWS-fvpymP-DwheLIsOPypi6IWfQmGJ-yLCxJdn3c6m-OrGjwViE~zpBfHDAeP09yjDs4BBlXQo7FtC9-c0~8~C2Gkl6X5Dn6Z9Er9XUrzB9PXsm2PNAZzAm9~QSPG64bYDH-BmSAoERYLgoRXy3sX8hYloMqtwWcOe-RgP0Jvp2cMIluyMdjBTCrqLuMFmwObvmUzTXhdDX6sLk3YQJ6hcjIQp9WBpIwQWQ__" },
        { name: "Cosmetics", imageUrl: "https://s3-alpha-sig.figma.com/img/27e3/e07a/581ecd431042809ba41deeba5e40b83c?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ip6McsCTAyLJPYAXzTTXwwIO1AG7nf2Rpn5P7UNaBntrfcW7pxv9l4tBQ-VhQ3GT6CXR8jx3eoQgos6vbI7VTVK~eNC8nZqH1AX1Rb8f0d~~mtVvTdv5qNSDcJI6We-O2WGjXDcuHAr5riL75UDwnvWra00mbYPyb7GLahgPCU52bsI1~cHokUt9Xb7-lwLc756GGeslRQultZjresbaf44cNML3UMVwS6O65EjZXpSBZO02wE0WpgF2RrmkZOIlYlEMyxb90b5DYqiOChu1szxoBPSwak6pYFEKSVp~WSD8E2poBgSv~OwK3lywGjAv4i0zyn3V2pTorpkgfsfvwA__" },
        { name: "Home & Garden", imageUrl: "https://s3-alpha-sig.figma.com/img/611c/801b/c172199fcb1d34076291ba86dae522d8?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R5iwhSjITQSvgrS3ixKAl68WqppZmG7zquAhJ0nsYtmvK0wLE2ozgXysKVnE3bPpZzz0X8aRsAFezgrwefY-7So9rz971y1KBHAOxfzbu-XDY7YqxwaGlphpX-qS3xZeXqp13S9VCPmQWLjVkyy581WWGozL0TA5aFCjNVQ0X9QewVFYUXwf4tllyXs8GMaF0PwHizODLQfqT6gfN80ULnzucXxW-EImdQW9cWVu50JxECLia3cvXGGG1cCjLPnAAK1yVhS-sVxG~o6C0kKZlnQ1jz4DdQ92N4aOf5HbO1ox84aCNVHODRWm40KFFDrQF-7Fm2WyC3s9ca7aLjbAWQ__" },
        { name: "Books & Music", imageUrl: "https://s3-alpha-sig.figma.com/img/8a5e/cc7b/636153df70b2a135a70e98bca8312f2e?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ixveLrNPyc7s~8XmZ3eQImpwxxjq15JbZglXLHgv4P5IY5jDAnSIOsfoVaFGrs2BnudOqBh580p210SXDI7BAbO~PXwCwSrJ-~m9nAZXSw67kOWs1CIlb9J64ThL3PB2zzD--fbCBDHxo~jfhpC9YWH4GLqsbvs8p98Kt8iupCDOIinImGp1NeY108spmAt~uF6FNPqBgOYZgh5154ZglryDbkHcRG-YngR-Nxrbibo1wwzJRLYub1ezvkhg78XO76z7quaCcDj2AvnGoEv-HC4J4MUskBkplf9UeRcJ1CN-JM4pRWkG-eNM730~glZD9d4fmT0OAnAjzASW6f2htA__" },
        { name: "Beauty Supply", imageUrl: "https://s3-alpha-sig.figma.com/img/be9d/dcac/528a3497f06898d5e18773f59559a45c?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZvneLCQDeT-Yp8Dj14Q0FuQbLyo~dwiBYCsCXo6vQK9gR7TNf33qnWjftaR2z9H9RvvUPUpFjMrqzJNYxe5OLAZ8DjOlmP82bonsOuapMyHIaOllgyDugz~fEe2H3tf327kzLZymN391ItgtXIinDfCJdi7Z32vDcrlylnAKjNBGj3GSZ8Tc6QmbcXZJOPoYvURR5evEGKAVMq2aCFzb34HX96i1G4kkMoIGVjIKunRvmXJJPhP9J0hfYq1e0UPjlxoa0hV-ON5fTFq5mr4rM4n92OX8I3yvcadoQa6SZqJZSTCEYhRV6igSiyMf2iiIHu6VHQNgG8nVfY81sNvHbQ__" },
        { name: "Specialty Products", imageUrl: "https://www.shutterstock.com/image-photo/composition-cheese-grapes-bottles-glasses-260nw-76934305.jpg" },
        { name: "Cultural Foods and Spices", imageUrl: "https://media.istockphoto.com/id/1227198304/photo/colourful-background-from-various-herbs-and-spices-for-cooking-in-bowls.jpg?s=612x612&w=0&k=20&c=OtzOlSOjQ0a9giYM0FKyRJqIsIvWguEZv9pCzjKs5vo=" },
        { name: "Sporting Goods", imageUrl: "https://media.istockphoto.com/id/1136317339/photo/sports-equipment-on-floor.jpg?s=612x612&w=0&k=20&c=-aI8u_Se89IC-HJZYH724ei5z-bIcSvRW6qUwyMtRyE=" },
        { name: "Electronics and Technology", imageUrl: "https://media.gettyimages.com/id/1335669510/vector/vector-isometric-devices-set.jpg?s=612x612&w=gi&k=20&c=XhMrwS5dZ5l7ti8YVvNYeX0y6jgMLYCxJE5KmQ87ZZQ=" },
    ];

    return (
        <View style={styles.rLayout}>
            <View style={styles.rAdjustment}>
                <View style={styles.rNotifBar}>
                    <Ionicons name="chevron-back-outline" size={24} color='black' />
                    <Text style={styles.rText}>Shops</Text>
                    <TouchableOpacity style={styles.notification}>
                        <Ionicons name='notifications-outline' size={20} color='black' />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name='search-outline' size={17} color='black' style={styles.searchIcon} />
                    <TextInput style={styles.textInput} placeholder='Search Shops' />
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserMap')}>
                        <Feather name='map' size={17} color='black' style={styles.mapIcon} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                    {/* Render food categories */}
                    <View style={styles.Boxes}>
                        {shopsCategories.map(category => (
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

export { ShopsBrowse };