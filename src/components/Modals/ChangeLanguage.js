import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ArrowNarrowLeftIcon, MicrophoneIcon, SearchIcon } from "react-native-heroicons/outline";

const ChangeLanguage = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                    </TouchableOpacity>
                    <View style={styles.headingBox}>
                        <Text style={styles.heading}>Language</Text>
                        <Text style={styles.smallDesc}>Select the Language of your choice</Text>
                    </View>
                    <Text></Text>
                </View>

                <View style={styles.filterWrapper}>
                    <TextInput
                        value={search}
                        onChangeText={(val) => setSearch(val)}
                        style={styles.searchBar}
                        placeholder="Search Language"
                    />
                    <SearchIcon style={styles.searchIcon} size={23} color="#8E8E8E" />
                    <MicrophoneIcon style={styles.microIcon} size={23} color="#8E8E8E" />
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.upperBox}>
                        <TouchableOpacity style={[styles.languageBox, styles.borderColor]}>
                            <Text style={[styles.language1, styles.colorBlue]}>English</Text>
                            <Text style={[styles.language2, styles.colorBlue]}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.languageBox, styles.borderBlack]}>
                            <Text style={[styles.language1, styles.colorBlack]}>English</Text>
                            <Text style={[styles.language2, styles.colorFade]}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.languageBox, styles.borderBlack]}>
                            <Text style={[styles.language1, styles.colorBlack]}>English</Text>
                            <Text style={[styles.language2, styles.colorFade]}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.languageBox, styles.borderBlack]}>
                            <Text style={[styles.language1, styles.colorBlack]}>English</Text>
                            <Text style={[styles.language2, styles.colorFade]}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.languageBox, styles.borderBlack]}>
                            <Text style={[styles.language1, styles.colorBlack]}>English</Text>
                            <Text style={[styles.language2, styles.colorFade]}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.languageBox, styles.borderBlack]}>
                            <Text style={[styles.language1, styles.colorBlack]}>English</Text>
                            <Text style={[styles.language2, styles.colorFade]}>English</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


                <TouchableOpacity style={styles.buttonBox}>
                    <Text style={styles.button}>Confirm Language</Text>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginTop: 28,
        marginBottom: 20,
        border: '1px solid black',
        position: 'relative',
        height: '85%',
        backgroundColor: '#F1F1F1'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    heading: {
        fontSize: 26,
        fontWeight: '600',
        color: '#101010',
        paddingBottom: 5
    },
    smallDesc: {
        color: '#101010'
    },
    filterWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 20,
    },
    searchBar: {
        flex: 1,
        paddingHorizontal: 15,
        paddingLeft: 56,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 15.0,
        fontWeight: '500'
    },
    searchIcon: {
        position: 'absolute',
        left: 20
    },
    microIcon: {
        position: 'absolute',
        right: 20
    },
    upperBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderColor: {
        borderColor: '#2C81E0',
        borderWidth: 1,
        borderRadius: 10,
    },
    borderBlack: {
        borderColor: '#101010',
        borderWidth: 1,
        borderRadius: 10,
    },
    languageBox: {
        height: 70,
        width: '84%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    colorBlue: {
        color: '#2C81E0',
    },
    colorBlack: {
        color: '#101010',
    },
    colorFade: {
        color: '#8E8E8E',
    },
    language1: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 2
    },
    language2: {
        fontSize: 15,
        fontWeight: '400'
    },
    topBorder: {
        // marginVertical: 10
    },
    buttonBox: {
        position: 'absolute',
        bottom: -60,
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

export default ChangeLanguage;
