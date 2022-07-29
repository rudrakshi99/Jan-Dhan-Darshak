import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";

import styles from "../styles/styles";

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.push("Home");
        }, 3000);
    }, []);
    return (
        <View style={styles.container && styles.splash}>
            <StatusBar hidden />
            <Text style={styles.logo}>Jan Dhan Darshak</Text>
        </View>
    );
};

export default Splash;
