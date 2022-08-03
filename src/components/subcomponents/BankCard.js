import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const BankCard = ({ imgUrl, name, branch }) => {
    return (
        <View style={styles.bankBox}>
            <Image
                style={styles.bankImage}
                source={imgUrl}
                resizeMode="cover"
            />
                
            <View style={styles.rightBox}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.branch}>{branch}</Text>
                <Text><Text style={styles.time1}>Open Now</Text> . <Text style={styles.time2}>Closes in  2 hours</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bankBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    bankImage: {
        marginRight: 28
    },
    rightBox: {

    },
    name: {
        fontSize: 17,
        lineHeight: 17,
        color: '#101010',
        fontWeight: '600'
    },
    branch: {
        color: '#8E8E8E',
        marginTop: 2,
        fontSize: 14.5,
        fontWeight: '400'
    },
    time1: {
        color: '#34994C',
        fontSize: 14.6,
        fontWeight: '500'
    },
    time2: {
        color: '#8E8E8E',
        fontSize: 14.6,
        fontWeight: '500'
    }
})

export default BankCard