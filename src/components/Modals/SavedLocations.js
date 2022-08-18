import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { getSavedLocations } from "../../https/Locations";
import BankCard from "../subcomponents/BankCard";
import HeaderCard from "../subcomponents/HeaderCard";
import * as SecureStore from "expo-secure-store";

const SavedLocations = () => {
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        const getLocations = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync('accessToken');
                const data = await getSavedLocations({ accessToken, id });
                if(data?.success === true) {
                    setSavedLocations(data.data);
                }
            } catch(err) {
                console.log(err?.response?.data);
            }
        }
        getLocations();
    }, []);
    

    return (
        <View style={styles.container}>

            <HeaderCard heading="Saved Locations" text="List of all your saved Financial Points" />
            <View style={styles.divider}></View>

            <ScrollView>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="Bank of Baroda" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="State Bank" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="Punjab National Bank" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="Bank of Baroda" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="Axis Bank" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="HDFC Bank" branch="Nekpur Branch" />
                <View style={styles.divider}></View>
                <BankCard imgUrl={require('../../assets/images/bank_1.png')} name="Bank of Baroda" branch="Nekpur Branch" />
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    divider: {
        height: 4,
        backgroundColor: '#EAEAEA'
    }
})

export default SavedLocations;
