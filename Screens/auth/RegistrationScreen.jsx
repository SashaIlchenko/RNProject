import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, View, TextInput, Text, TouchableOpacity,
    Image, ImageBackground,
    TouchableWithoutFeedback,
    Keyboard, KeyboardAvoidingView, Platform
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from '../../redux/auth/authOperations'


const RegistrationScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isShownPass, setIsShownPass] = useState(false);
    const dispatch = useDispatch();
    const nameHandler = (text) => setLogin(text);
    const emailHandler = (text) => setEmail(text);
    const passwordhandler = (text) => setPassword(text);
    const onPress = () => {
        if (login.length && email.length && password.length) {
            console.log(login, email, password);
            dispatch(authSignUpUser({ login, email, password }))
            navigation.navigate('Home');
        }
        else {
            alert("Please type all fields!")
        }
        setIsShowKeyboard(false);
        setLogin('');
        setEmail('');
        setPassword('');
    }
    const shownPass = () => {
        setIsShownPass(p => !p);
    }
    return (<View style={styles.container}><ImageBackground source={require('../../assets/Photo-BG.jpg')} style={styles.bgImage}><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 0 : 0 }}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/UserPhoto.jpg')} />
                    <TouchableOpacity style={styles.btnClose}><Image style={styles.imgClose}
                        source={require('../../assets/Union.jpg')} /></TouchableOpacity>
                </View>
                <Text style={styles.inputTitle}>Registration</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    defaultValue={login}
                    onChangeText={nameHandler}
                    onFocus={() => setIsShowKeyboard(true)}
                />
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
                    <Text style={styles.buttonLabel}>Sign up</Text>
                </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={styles.labelText}>Already have an account? Log in</Text></TouchableOpacity>
            </View>
            <StatusBar style="auto" /></KeyboardAvoidingView>
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
        marginTop: 92,
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
        width: 100,
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

export default RegistrationScreen;