import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import {ArrowNarrowLeftIcon} from 'react-native-heroicons/outline'
import React, { useState } from 'react'
import InputField from "../inputComponents/InputField";
const BankFeedback = () => {
    const navigation=useNavigation();
    [feedback,setFeedbackInfo]=useState({NameOfThePoint:"",location:"",username:"",mobile:"",comments:""});
   const[NameOfThePoint,setNameOfThePoint]=useState("")
   const [location,setLocation]=useState("");
   const [username,setUsername]=useState("");
   const [mobile,setMobile]=useState("");
   const [comments,setComments]=useState("");

    const handleChange = () => {
        console.log(feedback)
        setFeedbackInfo({
            NameOfThePoint:NameOfThePoint,
            location:location,
            mobile:mobile,
            username:username,
            comments:comments
        });
        console.log(feedback)
    };
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <ArrowNarrowLeftIcon style={styles.iconHeader} size={30} color="#101010" />
                    </TouchableOpacity>
                    <View style={styles.headingBox}>
                        <Text style={styles.heading}>Feedback</Text>
                        <Text style={styles.smallDesc}>This will be shared with the bank</Text>
                    </View>
                    <Text></Text>
        </View>
        <View style={styles.divider}></View>
        <ScrollView style={styles.forms}>
             
        <InputField
        inputname="Name of the Point"
         name={feedback.NameOfThePoint}
         onChangeText={(e)=>{setNameOfThePoint(e)}}
         placeholder="Name of the place"
        ></InputField>
        <InputField
        inputname="Location"
         name={feedback.location}
         onChangeText={(e)=>{setLocation(e)}}
         placeholder="Location"
        ></InputField>
        <InputField
        inputname="Your Name"
         name={feedback.username}
         onChangeText={(e)=>{setUsername(e)}}
         placeholder="Your Full Name"
        ></InputField>
        <InputField
        inputname="Your Mobile no."
         name={feedback.mobile}
         onChangeText={(e)=>{setMobile(e)}}
         placeholder="Your Mobile"
        ></InputField>
        <InputField
        multi={true}
        inputname="Comments"
         name={feedback.comments}
         onChangeText={(e)=>{setComments(e)}}
         placeholder="Please write your feedback here..."
        ></InputField>
        </ScrollView>
        <TouchableOpacity onPress={handleChange} style={styles.buttonBox}>
                    <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BankFeedback
const styles=StyleSheet.create({
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
    divider: {
        marginTop:28,
        width:1000,
        height: 4,
        backgroundColor: '#EAEAEA'
    },
    buttonBox: {
        
        position: 'absolute',
        bottom: -70,
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