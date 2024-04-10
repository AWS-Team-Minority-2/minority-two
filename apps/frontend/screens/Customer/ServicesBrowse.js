import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from './sass/ServicesBrowse';

const ServicesBrowse = () => {
    const navigation = useNavigation();

    const serviceCategories = [
        { name: "Makeup", imageUrl: "https://s3-alpha-sig.figma.com/img/6aa4/92ee/f4194d7ea042c0be9fa7d0e4956243cd?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eo5Dc~ZIBuKhBX~9xx4bEBaEtjE3yrd8CXn9KIfJjd8eYRNkOxJptbBaY3muNUDVG3xzv4LVsuJETNxHy2AGWynZdpybmSWqk4FhNlEykzrwCzMgP3brQj7~gttXFT0K8iZD1J6~2PszDN7axzVmyRjYVGEf65AUqPPs44flK0CcguCSncDAR34MIITaycgU4ZOC55gZwC~W4QVsXdOByeo4XIw70HxOk4Z8xUPYhGMnRcoelhLVfp9RMEbm~no3V8jMpf486IUCdMux2ew0DzsliGIPLVgjcCsfWQPYUzESFKyvYXOpXggzAK4NggsfRO31t70uBDNE3CEOHnlMhQ__" },
        { name: "Barbershop", imageUrl: "https://media.istockphoto.com/id/1244833615/photo/barbershop-working-place-interior-3d-illustration.jpg?s=612x612&w=0&k=20&c=IcF7m2POk-mjAhQv10z5yVToIVqAm_YEBBRZF3KHiPQ=" },
        { name: "Hair Removal", imageUrl: "https://www.shutterstock.com/image-photo/young-african-american-woman-waxing-260nw-185570471.jpg" },
        { name: "Hair", imageUrl: "https://media.istockphoto.com/id/1277309406/photo/the-longer-the-hair-the-bigger-the-dreams.jpg?s=612x612&w=0&k=20&c=laB0TMDfoT0oDpopDyRL511vTMRh16NL5_ndmDrxF08=" },
        { name: "Skin Care ", imageUrl: "https://s3-alpha-sig.figma.com/img/3462/591c/f6412b119881894e512dc17e86fdabc8?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S1GqXjgmcfoO3SQxL32OTHnrRgVfgr6XeKVyyGWqgZi50Rt7baZdzjUH3MBeXL1vidmDn9Nhmj9GRq8YgfBaxU7JPm16UxHcbQR9~khQA1DpYkDO0llJ71mWySq8jKCSNCWy~c-aDsYBHtM0aO5Ga6DE4SkYrvJDqBKcJ5OTIyPN8K24L5cnQzEwLpY0TkfP0TwXVWp4Ufl3Ttun4OVAdKD5-If3wCzQCjoO1B3MVK7qrNBZ29dgLLgS5crh4mH-Bq0XFIiDmj9fMSUixf6ZDwT0zG8He2Ma-ozygZn1jbBlAqdffxKfgWIdL-KyHnEqN1i2ptpRAv~PHVmK6S5xWw__" },
        { name: "Nail Care", imageUrl: "https://www.shutterstock.com/image-photo/beautiful-black-woman-hands-female-600nw-2277144881.jpg" },
        { name: "Brows & Lashes", imageUrl: "https://media.istockphoto.com/id/486859959/photo/eyelash-extension.jpg?s=612x612&w=0&k=20&c=ztA2zj0Pjtx53bVcwLZWt8bFRtM5vN6gxpOyzyU6R2w=" },
        { name: "Health & Wellness", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hac9WL9YtWkD86TFAHg7BXvdshaYDo9Qfg&s" },
        { name: "Body Modification", imageUrl: "https://as1.ftcdn.net/v2/jpg/02/91/19/08/1000_F_291190864_7CcrZX3teWhNupRCvdqreDL88r4I5GQ3.jpg" },
        { name: "Custom Services", imageUrl: "https://media.istockphoto.com/id/1256579050/photo/dj-adjusts-the-volume-on-the-turntable-at-a-party.jpg?s=612x612&w=0&k=20&c=fHAJVOkrs3lqYMp3WDfTmINGFvukUgrASTee8PPw_MQ=" },
        { name: "Activites", imageUrl: "https://media.istockphoto.com/id/1304715557/photo/imagine-where-your-imagination-could-take-you.jpg?s=612x612&w=0&k=20&c=aNNW2tuFjXzhL7CXu8-_UDYAsxhZ5NqrDZ4HgoDl_-s=" },
        { name: "Dental & Orthodontics", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqtbrwA036Rf0TRH8GVa6ifQsfaXx9x3OL_w&s" },
        { name: "Home Services", imageUrl: "https://media.istockphoto.com/id/1361116682/photo/plumber-fixing-a-leaking-bathroom-faucet.jpg?s=612x612&w=0&k=20&c=THa1uoYgW4gGz0C8YMqenM58UFY-uD1X79dP3obYLLI=" },
        { name: "Other", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFMSOuZRr9ewCPn0HWJFkusHVHBU3flnLmhQ&s" },

    ];

    return (
        <View style={styles.sbLayout}>
            <View style={styles.sbAdjustment}>
                <View style={styles.sbNotifBar}>
                    <Ionicons name="chevron-back-outline" size={24} color='black' />
                    <Text style={styles.sbText}>Services</Text>
                    <TouchableOpacity style={styles.notification}>
                        <Ionicons name='notifications-outline' size={20} color='black' />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name='search-outline' size={17} color='black' style={styles.searchIcon} />
                    <TextInput style={styles.textInput} placeholder='Search Services' />
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserMap')}>
                        <Feather name='map' size={17} color='black' style={styles.mapIcon} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                    {/* Render food categories */}
                    <View style={styles.Boxes}>
                        {serviceCategories.map(category => (
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

export { ServicesBrowse };