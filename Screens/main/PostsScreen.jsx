import react from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';


const PostsScreen = () => {
    return (
        <View>
            <Image source={require('../../assets/UserPhoto.jpg')} />
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
        </View>
    )
}

export default PostsScreen;