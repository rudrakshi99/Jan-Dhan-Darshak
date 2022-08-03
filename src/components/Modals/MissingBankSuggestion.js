import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Map from "../Map";
import HeaderCard from "../subcomponents/HeaderCard";

const MissingBankSuggestion = () => {
    return (
        <View style={styles.container}>

            <HeaderCard heading="Suggestion" text="Suggest Missing Bank or FInancial Points" />
            <Map />

            <View style={styles.bottomBox}>
                <View style={styles.locationBox}>
                    <Text style={styles.locationText}>Select Location</Text>
                    <Text style={styles.locationText}>Step 1/2</Text>
                </View>

                <View style={styles.locationBox}>
                    <Text style={styles.address}>Adarsh Nagar, DM Road,{'\n'}Budaun 243601, UP</Text>
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
        flex: 1
    },
    bottomBox: {
        height: 180,
        marginVertical: 26,
        marginHorizontal: 20,
        background: '#F9F9F9',
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.12)'
    },
    locationBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 18
    },
    locationText: {
        fontSize: 18,
        color: '#8E8E8E',
        fontWeight: '400'
    },
    address: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'justify',
        color: '#101010'
    },
    changeBtn: {
        borderColor: '#292C31',
        borderWidth: 1,
        borderRadius: 4
    },
    changeText: {
        paddingVertical: 13,
        paddingHorizontal: 25,
        fontSize: 15,
        fontWeight: '500',
        color: '#292C31'
    },
    buttonBox: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        backgroundColor: '#292C31',
        borderRadius: 5
    },
    button: {
        color: '#fff',
        textAlign: 'center',
        padding: 12,
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5
    }
})

export default MissingBankSuggestion;
