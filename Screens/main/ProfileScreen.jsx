import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from '../../firebase/config'
import { authSignOutUser } from "../../redux/auth/authOperations";
import { MaterialIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons'
import { collection, query, where, onSnapshot } from "firebase/firestore"
const ProfileScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const { userId, login } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const screenWidth = Dimensions.get('window').width
    useEffect(() => {
        getUserPosts()
    }, [])
    const getUserPosts = async () => {
        const q = query(
            collection(firestore, 'posts'),
            where('userId', '==', userId)
        )
        onSnapshot(q, (docSnap) =>
            setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
    }
    const signOut = () => {
        dispatch(authSignOutUser())
    }

    return (
        <ImageBackground source={require('../../assets/Photo-BG.jpg')} style={styles.bgImg}>
            <View style={styles.container}>
                <View style={styles.wrappContent}>
                    <TouchableOpacity onPress={signOut} style={styles.btnSignOut}>
                        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/UserPhoto.jpg')} />
                        <TouchableOpacity style={styles.btnClose}><Image style={styles.imgClose}
                            source={require('../../assets/Union.jpg')} /></TouchableOpacity>
                    </View>
                    <View style={styles.nameProfile}>
                        <Text style={styles.userTitle}>{login}</Text>
                    </View>
                    <View>
                        <FlatList
                            data={posts}
                            keyExtractor={(item, indx) => indx.toString()}
                            renderItem={({ item }) => (
                                <View style={{ marginBottom: 34 }}>
                                    <View style={styles.photoWrapper}>
                                        <Image source={{ uri: item.photo }}
                                            style={styles.postItem} />
                                    </View>
                                    <Text style={styles.photoTitle}>{item.title}</Text>
                                    <View style={styles.infoWrapper}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Comments', {
                                                postId: item.id,
                                                photo: item.photo,
                                            })}
                                            style={{ ...styles.locationBtn, marginTop: 11 }}><FontAwesome
                                                name="comment-o"
                                                size={24}
                                                color="#BDBDBD" />
                                            <Text style={styles.commentsTitle}>0</Text></TouchableOpacity>
                                        <TouchableOpacity><SimpleLineIcons name="like" size={24} color="black" />
                                            <Text>0</Text></TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('MapScreen', {
                                                location: item.location
                                            })}
                                            style={styles.locationBtn}><SimpleLineIcons
                                                style={{ marginRight: 10 }}
                                                name="location-pin"
                                                size={24}
                                                color="#BDBDBD"
                                            /><Text style={styles.locationTitle}>{item.locationTitle}</Text></TouchableOpacity>
                                    </View>
                                </View>
                            )} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    bgImg: {
        flex: 2,
    },
    container: {
        flex: 1,
        marginTop: 147,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: 'rgba(180, 180, 180, 0.2)',
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 150,
    },
    imageWrapper: {
        position: 'absolute',
        top: -60,
        left: 125,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        width: 120,
        height: 120,
    },
    image: {
        borderRadius: 16,
        width: 120,
        height: 120,
    },
    btnClose: {
        position: 'absolute',
        top: 70,
        left: 105,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        padding: 7,
        borderColor: '#E8E8E8',
        borderWidth: 1,
    },
    imgClose: {
        width: 13,
        height: 13,
    },

    postItem: {
        height: 240,
        borderRadius: 8,
    },
    btnSignOut: {
        position: 'absolute',
        right: 0,
        top: 20,
        zIndex: 1000,
    },
    nameProfile: {
        marginBottom: 32,
        marginTop: 32,
    },

    userTitle: {
        textAlign: 'center',
        color: '#212121',
        fontFamily: 'Roboto_500Medium',
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.3,
        marginTop: 60,
    },
    photoWrapper: {
        borderRadius: 8,
        marginBottom: 8,
    },
    photoTitle: {
        color: '#212121',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        lineHeight: 19,
    },
    locationBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationTitle: {
        color: '#212121',
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 19,
        textDecorationLine: 'underline',

    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    commentsTitle: {
        color: '#BDBDBD',
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 9,
    },
})

export default ProfileScreen;