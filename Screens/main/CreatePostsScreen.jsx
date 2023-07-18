import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import * as MediaLibrary from "expo-media-library";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { storage } from "../../firebase/config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { firestore } from "../../firebase/config"
import { collection, addDoc } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState(null);
    const [locationTitle, setLocationTitle] = useState('');
    const { userId, login } = useSelector((state) => state.auth)
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
            }
        })();
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");

        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const titleHandler = (text) => {
        setTitle(text);
    }
    const locationHandler = (text) => {
        setLocationTitle(text);
    }
    const takePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            await MediaLibrary.createAssetAsync(uri);
            setPhoto(uri);
        }
    }
    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();
        const uniquePostId = Date.now().toString();
        const storageRef = await ref(storage, `postImage/${uniquePostId}`)
        const uploadPhoto = await uploadBytes(storageRef, file)
        const takePhoto = await getDownloadURL(uploadPhoto.ref)
        return takePhoto
    }
    const getPublication = async () => {
        const locationPhoto = await Location.getCurrentPositionAsync();
        setLocation(locationPhoto);
        uploadPostToServer(photo);
        navigation.navigate('PostsScreen', { photo, title, locationTitle, location });
        setPhoto('');
        setTitle('');
        setLocationTitle('');
    }
    const uploadPostToServer = async () => {
        const photo = await uploadPhotoToServer()
        try {
            const docRef = await addDoc(collection(firestore, 'posts'), {
                photo,
                location,
                locationTitle,
                title,
                userId,
                login,
            })
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                type={type}
                ref={setCameraRef}>
                {!photo && <TouchableOpacity
                    style={styles.flipCamera}
                    onPress={
                        () => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }
                    }>
                    <Ionicons name="camera-reverse-outline" size={24} color="#BDBDBD" /></TouchableOpacity>}
                <TouchableOpacity onPress={takePhoto}

                    style={!photo ? styles.snap : { ...styles.snap, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    {!photo ? <Ionicons name="camera-sharp" size={24} color="#BDBDBD" /> :
                        <Ionicons name="camera-sharp" size={24} color="#FFFFFF" />}
                </TouchableOpacity>
                {photo && <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: photo }}
                        style={{
                            borderRadius: 8,
                            height: 240,
                        }} />
                </View>}
            </Camera>
            <Text style={styles.cameraTitle}>Download photo</Text>
            <TextInput
                style={styles.input}
                placeholder="title..."
                defaultValue={title}
                onChangeText={titleHandler}
            />
            <TextInput
                style={styles.input}
                placeholder="location"
                defaultValue={locationTitle}
                onChangeText={locationHandler}
            />
            <TouchableOpacity
                onPress={getPublication}
                style={
                    !title && !photo && !locationTitle
                        ? styles.button
                        : styles.activeBtn}>
                <Text style={!photo && !title && !locationTitle ? styles.buttonTitle : styles.activeTitle} >Publish</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setPhoto('');
                    setTitle('');
                    setLocationTitle('');
                }}
                style={styles.deleteBtn}>
                <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    camera: {
        borderRadius: 8,
        height: 240,
        backgroundColor: "#F6F6F6",
        borderColor: "#E8E8E8",
    },
    snap: {
        backgroundColor: "#FFFFFF",
        width: 60,
        height: 60,
        borderRadius: '50%',
        position: 'absolute',
        top: '40%',
        left: '40%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipCamera: {
        flex: 0.1,
        marginLeft: 10,
        marginTop: 5,
    },
    cameraTitle: {
        color: '#BDBDBD',
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 32,
    },
    takePhotoContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#fff',
        height: 240,
    },
    input: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginTop: 16,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        color: "#212121",
        marginBottom: 16,
    },
    button: {
        height: 50,
        borderRadius: 100,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',

    },
    activeBtn: {
        height: 50,
        borderRadius: 100,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6C00',
    },
    buttonTitle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#BDBDBD',
    },
    activeTitle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#fff',
    },
    deleteBtn: {
        height: 40,
        borderRadius: 100,
        marginHorizontal: 152,
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    }

});

export default CreatePostsScreen;