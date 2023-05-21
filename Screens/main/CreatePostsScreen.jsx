import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import * as MediaLibrary from "expo-media-library";
const CreatePostsScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState(null);
    const [locationTitle, setLocationTitle] = useState('');

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
    const getPublication = async () => {
        const locationPhoto = await Location.getCurrentPositionAsync();
        setLocation(locationPhoto);
        navigation.navigate('PostsScreen', { photo, title, locationTitle });
        setPhoto('');
        setTitle('');
        setLocationTitle('');
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                type={type}
                ref={setCameraRef}>
                <TouchableOpacity
                    style={styles.flipCamera}
                    onPress={
                        () => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }
                    }><Text>Choose camera</Text></TouchableOpacity>
                <TouchableOpacity onPress={takePhoto}
                    style={styles.snap}>
                    <Image source={require('../../assets/camera.png')} />
                </TouchableOpacity>
                <View style={styles.takePhotoContainer}>
                    {photo && <Image source={{ uri: photo }}
                        style={{
                            borderRadius: 8,
                            height: 100,
                            width: 100,
                        }} />}
                </View>
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
                <Image source={require('../../assets/trash.png')} />
            </TouchableOpacity>
        </View>
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
        height: 240,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        borderColor: "#E8E8E8",
        justifyContent: 'center',
        alignItems: 'center',
    },
    snap: {
        backgroundColor: "#FFFFFF",
        width: 60,
        height: 60,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCamera: {
        flex: 0.1,

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
        borderColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,

    },
    input: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginTop: 16,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        color: "#E8E8E8",
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