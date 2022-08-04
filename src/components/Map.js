import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

const Map = () => {
    const route = useRoute();
    const [location, setLocation] = useState({
        latitude: 26.862185,
        longitude: 80.911271,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            location.coords.latitudeDelta = 0.01;
            location.coords.longitudeDelta = 0.01;
            setLocation(location.coords);
        })();
    }, []);
    return (
        <View
            style={{
                flex: route.name === "Find" ? 3 : 4,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <MapView
                style={styles.map}
                initialRegion={location}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            ></MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        flex: 1,
    },
});

export default Map;
