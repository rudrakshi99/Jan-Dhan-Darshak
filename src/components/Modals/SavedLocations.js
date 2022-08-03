import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BankCard from "../subcomponents/BankCard";
import HeaderCard from "../subcomponents/HeaderCard";

const SavedLocations = () => {
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
