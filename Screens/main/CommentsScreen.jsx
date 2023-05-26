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
    FlatList,
    Image,
    Platform,
} from 'react-native';

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const { postId, photo } = route.params;

    const createComment = (text) => {
        setAllComments(pre => [...pre, text])
    }
    const markupComment = () => {
        return (<View
            style={{
                ...styles.containerImgComment,
                marginLeft: Platform.OS === 'ios' ? 0 : 90,
            }}>
            <View
                style={{
                    ...styles.commentContainer,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                <Text style={styles.commentText}>{comment}</Text>
            </View>
        </View>)
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: photo }} style={{ width: 300, height: 200 }} />
                </View>
                <FlatList
                    data={allComments}
                    renderItem={({ item }) => markupComment(item)}
                    keyExtractor={(_, i) => i.toString()}
                />
                <View style={styles.inputCommentContainer}>
                    <TextInput
                        onChangeText={setComment}
                        style={styles.inputComment}
                        placeholder="Comments..."></TextInput>
                    <TouchableOpacity style={styles.btnComment} onPress={createComment}>
                        <AntDesign name="arrowup" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        marginBottom: 32,
        marginTop: 32,
        alignItems: 'center',
    },
    commentContainer: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        width: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        marginBottom: 24,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    commentText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#212121',
    },
    inputCommentContainer: {
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