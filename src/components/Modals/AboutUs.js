import { useNavigation } from "@react-navigation/native";
import React,{useEffect, useState} from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput,Button } from "react-native";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import { translations } from "../../translations/translations";
import * as SecureStore from 'expo-secure-store';
const About = () => {
    const navigation = useNavigation();
    const [lan,setLan]=useState('');
    const [about,setAbout]=useState(translations['English'].about);
    const getLan=async()=>{
        setLan(await SecureStore.getItemAsync('lan'));
        setAbout(translations[lan].about)
    }
    getLan();
    useEffect(()=>{{
        const getLan = async () => {
            setLan(await SecureStore.getItemAsync('lan'));
            setAbout(translations[lan].about)
        }
        
        getLan();
    }},[]) 
    
    return (
        <ScrollView>
            
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Find')}>
                        <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                    </TouchableOpacity>
                    <Text style={styles.heading}>{about.title}</Text>
                    <Text></Text>
                </View>

                <View style={styles.imageBox}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../assets/images/aboutLogo.png')}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.textBox}>
                    <Text style={styles.para}>{about.content} </Text>
                </View>
                

                {/* <View style={styles.topBorder}>
                    <TouchableOpacity style={styles.buttonBox}>
                        <Text style={styles.button}>Got it</Text>
                    </TouchableOpacity>
                </View> */}
            </View>

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginTop: 28,
        marginBottom: 20,
        border: '1px solid black',
        position: 'relative',
        height: '70%'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconHeader: {

    },
    heading: {
        fontSize: 26,
        fontWeight: '600',
        color: '#101010',
        marginLeft: -16
    },
    imageBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },
    imageLogo: {

    },
    textBox: {
        marginTop: 60,
        // marginBottom: 80,
    },
    para: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 24,
        color: '#101010',
        paddingBottom: 120,
        // borderBottomColor: '#E0E0E0',
        // borderBottomWidth: 3,
        width: '100%',
        letterSpacing: 0,
        lineHeight: 24.4,
        textAlign: 'justify'
    },
    topBorder: {
        marginVertical: 10
    },
    buttonBox: {
        position: 'absolute',
        bottom: 13,
        height: 50,
        width: '100%',
        backgroundColor: '#2C81E0',
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

export default About;
