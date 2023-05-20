import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
const CreatePostsScreen = () => {
    return (
        <View style={styles.container}>
            <Camera style={styles.camera}>
                <TouchableOpacity style={styles.snap}>
                    <Image source={require('../../assets/camera.png')} /></TouchableOpacity>
            </Camera>
            <Text style={styles.cameraTitle}>Download photo</Text>
            <TextInput
                style={styles.input}
                placeholder="title"
                defaultValue="Title..."
                onChangeText={'#'}
                onFocus={() => { }}
            />
            <TextInput
                style={styles.input}
                placeholder="location"
                defaultValue="location"
                onChangeText={'#'}
                onFocus={() => { }}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Publish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
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
    cameraTitle: {
        color: '#BDBDBD',
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 32,
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
    buttonTitle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#BDBDBD',

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