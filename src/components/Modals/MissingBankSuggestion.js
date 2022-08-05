import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Map from "../Map";
import HeaderCard from "../subcomponents/HeaderCard";
import * as Location from "expo-location";
import axios from "axios";
import { BASE_URL, API_KEY } from "@env";

const MissingBankSuggestion = () => {
    const focused = useIsFocused();
    const [address, setAddress] = useState(
        "B-47 Sector C, Aliganj, Lucknow, Uttar Pradesh, India"
    );
    useEffect(() => {
        async function getGeocodedAddress() {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            // const result = await axios.get(
            //     `${BASE_URL}maps/api/geocode/json?latlng=${
            //         latitude + "," + longitude
            //     }&key=${API_KEY}`
            // );
            // console.log(result.data.results[0].formatted_address);
            // setAddress(result.data.results[0].formatted_address);
        }
        getGeocodedAddress();
    }, [focused]);
    return (
        <View style={styles.container}>
            <HeaderCard
                heading="Suggestion"
                text="Suggest Missing Bank or FInancial Points"
            />
            <Map />
            <View style={styles.bottomBox}>
                <View style={styles.locationBox}>
                    <Text style={styles.locationText}>Select Location</Text>
                    <Text style={styles.locationText}>Step 1/2</Text>
                </View>

                <View style={styles.locationBox}>
                    <Text style={styles.address}>{address}</Text>
                    <TouchableOpacity style={styles.changeBtn}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.buttonBox}>
                    <Text style={styles.button}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomBox: {
        height: 180,
        marginVertical: 26,
        marginHorizontal: 20,
        background: "#F9F9F9",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.12)",
    },
    locationBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 18,
    },
    locationText: {
        fontSize: 18,
        color: "#8E8E8E",
        fontWeight: "400",
    },
    address: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "justify",
        color: "#101010",
        paddingRight: 20,
        width: Dimensions.get("window").width / 1.5,
    },
    changeBtn: {
        borderColor: "#292C31",
        borderWidth: 1,
        borderRadius: 4,
    },
    changeText: {
        paddingVertical: 13,
        paddingHorizontal: 25,
        fontSize: 15,
        fontWeight: "500",
        color: "#292C31",
    },
    buttonBox: {
        position: "absolute",
        bottom: 0,
        height: 50,
        width: "100%",
        backgroundColor: "#292C31",
        borderRadius: 5,
    },
    button: {
        color: "#fff",
        textAlign: "center",
        padding: 12,
        fontSize: 17,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});

export default MissingBankSuggestion;
