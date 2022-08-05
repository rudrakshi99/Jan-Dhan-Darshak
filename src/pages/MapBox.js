import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

//Components
import Map from "../components/Map";

import style from "../styles/styles";
import Header from "../components/Header";

const MapBox = () => {
    const [type, setType] = useState({
        atm: false,
        bank: false,
        postOffice: false,
        crc: false,
        bankMitra: false,
    });
    const initialState = {
        atm: true,
        bank: false,
        postOffice: false,
        crc: false,
        bankMitra: false,
    };
    return (
        <View style={style.container}>
            <Header title="Location" subtitle="Current Address of the User" />
            <Map />
            <View style={style.tabsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setType({ ...initialState, atm: true });
                    }}
                >
                    <Text style={style.buttonText}>ATM</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.buttonText}>Branch</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.buttonText}>Post Office</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.buttonText}>CRC</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.buttonText}>Bank Mitra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MapBox;
