import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ImageBackground,
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView, Platform
} from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isShownPass, setIsShownPass] = useState(false);

    const emailHandler = (text) => setEmail(text);
    const passwordhandler = (text) => setPassword(text);
    const onPress = () => {
        if (email.length && password.length) {
            console.log(email, password);

        }
        else {
            alert("Please type all fields!")
        }
        setIsShowKeyboard(false);
        setEmail('');
        setPassword('');
    }
    const shownPass = () => {
        setIsShownPass(p => !p);
    }
    return (<View style={styles.container}><ImageBackground source={require('../../assets/Photo-BG.jpg')} style={styles.bgImage}><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}><View style={{ ...styles.form, marginBottom: isShowKeyboard ? 0 : 0 }}>
            <Text style={styles.inputTitle}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                defaultValue={email}
                onChangeText={emailHandler}
                onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    defaultValue={password}
                    onChangeText={passwordhandler}
                    secureTextEntry={!isShownPass && true}
                    onFocus={() => setIsShowKeyboard(true)}
                /><TouchableOpacity onPress={shownPass}>
                    {!isShownPass && <Text style={styles.passwordText}>Show</Text>}
                    {isShownPass && <Text style={styles.passwordText}>Hide</Text>}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.button} >
                <Text style={styles.buttonLabel}>Log in</Text>
            </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate("Registration")}><Text style={styles.labelText}>Don't have an account? Sign up</Text></TouchableOpacity>
        </View><StatusBar style="auto" /></KeyboardAvoidingView>
    </TouchableWithoutFeedback ></ImageBackground ></View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',

    },
    form: {
        position: 'relative',
        borderRadius: 25,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
        marginHorizontal: 40,
        width: 375,
        justifyContent: "flex-end",
    },
    imgClose: {
        width: 13,
        height: 13,
    },
    input: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginTop: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        color: "#E8E8E8",
    },
    inputTitle: {
        color: "#212121",
        fontSize: 30,
        fontFamily: 'Roboto_500Medium',
        marginTop: 32,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 150,
        marginTop: 43,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        height: 51,
    },
    buttonLabel: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#fff',
    },
    labelText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#1B4371',
        marginTop: 16,
        marginHorizontal: 50,
        paddingBottom: 45,
    },
    wrapper: {
        position: 'relative',
    },
    passwordText: {
        position: 'absolute',
        top: -35,
        left: 290,
        color: '#1B4371',
    }
})

export default LoginScreen;