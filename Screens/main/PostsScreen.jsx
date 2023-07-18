import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { firestore } from '../../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from "react-redux";
const PostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const { login, userEmail } = useSelector((state => state.auth))
    const getAllPosts = async () => {
        const dbRef = await collection(firestore, 'posts')
        onSnapshot(dbRef, (docSnap) =>
            setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
    }
    useEffect(() => {
        (async () => {
            await getAllPosts()
        })()
    }, [])
    return (<>
        <View style={styles.container}>
            <View style={styles.profileWrapper}>
                <View style={styles.imgWrapper}>
                    <Image
                        style={{
                            borderRadius: 16,
                            width: 60,
                            height: 60
                        }}

                        source={require('../../assets/UserPhoto.jpg')} /></View>
                <View style={{ paddingBottom: 30 }}>
                    <Text style={styles.nameTitle}>{login}</Text>
                    <Text style={styles.emailTitle}>{userEmail}</Text></View>
            </View>
            <View>
                <FlatList
                    data={posts}
                    keyExtractor={(item, indx) => indx.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 34 }}>
                            <View style={styles.photoWrapper}>

                                <Image source={{ uri: item.photo }}
                                    style={styles.postItem} /></View>
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
        </View ></>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    postItem: {
        height: 240,
        borderRadius: 8,

    },
    imgWrapper: {
        marginBottom: 32,
    },
    profileWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nameTitle: {
        color: "#212121",
        fontFamily: 'Roboto_700Bold',
        fontSize: 13,
        lineHeight: 15,
    },
    emailTitle: {
        color: '#212121',
        fontFamily: 'Roboto_400Regular',
        fontSize: 11,
        lineHeight: 13,
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
    }

})
export default PostsScreen;