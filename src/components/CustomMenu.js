import React from "react";
import { View, Image, Dimensions, StyleSheet, Text } from "react-native";

import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

const CustomMenu = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.heading}>Jan Dhan Darshak</Text>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        height: Dimensions.get("window").height / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    image: { height: 150, width: 90 },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
});

export default CustomMenu;
