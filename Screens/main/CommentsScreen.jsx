import React from "react";
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList,
    Image,
    Platform,
} from 'react-native';
import { firestore } from '../../firebase/config'
import {
    collection,
    updateDoc,
    doc,
    addDoc,
    onSnapshot,
} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const { postId, photo } = route.params;
    const { login, userId } = useSelector((state) => state.auth)

    useEffect(() => {
        ; (async () => {
            await getAllPosts()
        })()
    }, [])
    const createPost = async () => {
        const date = new Date()

        const formatData = format(new Date(date), 'dd MMMM, yyyy | HH:mm')

        const dbRef = await doc(firestore, 'posts', postId)
        await updateDoc(dbRef, {
            comments: allComments.length + 1,
        })

        await addDoc(collection(dbRef, 'comments'), {
            comment,
            login,
            userId,
            formatData,
        })
        setComment('')
    }

    const getAllPosts = async () => {
        try {
            const dbRef = doc(firestore, 'posts', postId)
            onSnapshot(collection(dbRef, 'comments'), (docSnap) =>
                setAllComments(docSnap.docs.map((doc) => ({ ...doc.data() })))
            )
        } catch (error) {
            console.log(`getAllComments`, error)
        }
    }

    const markupComment = (item) => {
        if (item.userId === userId)
            return (<View
                style={styles.containerImgComment}>
                <View
                    style={styles.commentContainer}>
                    <Image
                        source={require('../../assets/UserPhoto.jpg')}
                        style={styles.userPhoto}
                    />
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.commentData}>{item.formatData}</Text>
                </View>
            </View>)
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: photo }} style={{ width: 380, height: 240, borderRadius: 8, flexShrink: 0 }} />
                </View>
                <FlatList
                    data={allComments}
                    renderItem={({ item }) => markupComment(item)}
                    keyExtractor={(_, i) => i.toString()}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.inputCommentContainer}>
                        <TextInput
                            onChangeText={setComment}
                            style={styles.inputComment}
                            placeholder="Comments..."></TextInput>
                        <TouchableOpacity style={styles.btnComment} onPress={createPost}>
                            <AntDesign name="arrowup" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View></KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    imgContainer: {
        marginBottom: 32,
        marginTop: 32,
        alignItems: 'center',
    },
    commentContainer: {
        padding: 16,
        width: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        marginBottom: 24,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    commentText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 13,
        lineHeight: 18,
        color: '#212121',
        marginBottom: 8,
    },
    commentData: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 10,
        color: '#BDBDBD',
    },
    inputCommentContainer: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        marginHorizontal: 10,
        position: 'relative',
        marginTop: 'auto',
        marginBottom: 50,
    },
    inputComment: {
        backgroundColor: '#E8E8E8',
        height: 50,
        borderRadius: 50,
        paddingLeft: 16,
    },
    userPhoto: {
        width: 28,
        height: 28,
        borderRadius: 50,
    },
    btnComment: {
        position: 'absolute',
        right: 8,
        top: 7,
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: '#FF6C00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImgComment: {
        flex: 1,
        flexDirection: 'row',
    },

});

export default CommentsScreen;