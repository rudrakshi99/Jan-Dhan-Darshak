import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";

const Disclaimer = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                </TouchableOpacity>
                <Text style={styles.heading}>Disclaimer</Text>
                <Text></Text>
            </View>

            <ScrollView showsVerticalScrollIndicator ={false} showsHorizontalScrollIndicator={false} style={styles.textBox}>
                <Text style={styles.para}>The Information contained in the mobile application is provided and maintained by various Scheduled commercial banks. No guarantee is given as to the accuracy or currency of any of the data. Therefore, in no event shall Department of Financial Services or its constituents be liable for any special, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data, or profits, whether in an action of contract, negligance, or other action, arising out of or in connection with the use of the information herein provided. the website is desgned to served as a secondary representation of banking infrastructure, and secondary representation of Banking infrastructure, and is compiled from the Scheduled Commercial Banks which are the primary sources for the Scheduled Commercial banks which are the primary sources for this public information. Users of this website are hereby notified that these primary sources should be consulted for verification of the information presented here. And Department of Financial Services or its constituents and the software developer, NIC, assume no legal responsibility for the Information on the website.</Text>
            </ScrollView>

            <View style={styles.topBorder}>
                <TouchableOpacity style={styles.buttonBox}>
                    <Text style={styles.button}>Confirm Language</Text>
                </TouchableOpacity>
            </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 22,
        marginTop: 28,
        marginBottom: 20,
        border: '1px solid black',
        position: 'relative',  
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
    },
    heading: {
        fontSize: 26,
        fontWeight: '600',
        color: '#101010',
        marginLeft: -16
    },
    textBox: {
        height: '79%',
        marginBottom: 6
    },
    para: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 24,
        color: '#101010',
        letterSpacing: 0,
        lineHeight: 24.4,
        textAlign: 'justify'
    },
    topBorder: {
        borderTopColor: '#E0E0E0',
        borderTopWidth: 3,
        width: '100%',
        marginTop: 66
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

export default Disclaimer;
