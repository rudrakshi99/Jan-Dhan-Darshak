import { useNavigation } from "@react-navigation/native";
import React,{useEffect, useState} from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import { translations } from "../../translations/translations";
import * as SecureStore from 'expo-secure-store';

const Disclaimer = () => {
    const navigation = useNavigation();

    const [lan,setLan]=useState('');
    const [disclaimer,setDisclaimer]=useState(translations['English'].disclaimer);
    const getLan=async()=>{
        setLan(await SecureStore.getItemAsync('lan'));
        setDisclaimer(translations[lan].disclaimer)
    }
    getLan();
    useEffect(()=>{{
        const getLan = async () => {
            const res=await SecureStore.getItemAsync('lan')
            if(res=='')
            {setLan('English')}
            setDisclaimer(translations[lan].disclaimer)
        }
        getLan();
    }},[]) 
    return (
        <View>
            <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Find')}>
                    <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                </TouchableOpacity>
                <Text style={styles.heading}>{disclaimer.title}</Text>
                <Text></Text>
            </View>

            <ScrollView showsVerticalScrollIndicator ={false} showsHorizontalScrollIndicator={false} style={styles.textBox}>
                <Text style={styles.para}>{disclaimer.content}</Text>
            </ScrollView>

            {/* <View style={styles.topBorder}>
                <TouchableOpacity style={styles.buttonBox}>
                    <Text style={styles.button}>Got it</Text>
                </TouchableOpacity>
            </View> */}
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
        height: '88%',
        marginBottom: 6
    },
    para: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 24,
        color: '#101010',
        letterSpacing: 0,
        lineHeight: 24.4,
        textAlign: 'justify'
    },

})

export default Disclaimer;
