import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
const MapScreen = ({ route }) => {
    console.log(route.params.location.coords)
    const { latitude, longitude } = route.params.location.coords
    return (
        <View style={styles.container}>
            <MapView style={styles.mapConteiner}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}><Marker
                    coordinate={{
                        latitude,
                        longitude,
                    }}
                /></MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    mapConteiner: {
        flex: 1,
    }
});
export default MapScreen;