import React, { useState } from "react";
import { View } from "react-native";

//Components
import Map from "../components/Map";

import style from "../styles/styles";
import Header from "../components/Header";

const MapBox = () => {
    return (
        <View style={style.container}>
            <Header title="Location" subtitle="Current Address of the User" />
            <Map />
        </View>
    );
};

export default MapBox;
