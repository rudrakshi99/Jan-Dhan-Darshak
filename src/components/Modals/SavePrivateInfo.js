import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,TextInput, Dimensions} from 'react-native'
import React,{useEffect, useState} from 'react'
import { ArrowNarrowLeftIcon } from 'react-native-heroicons/outline';
import HeaderCard from '../subcomponents/HeaderCard'
import InputField from '../inputComponents/InputField';
import * as SecureStore from 'expo-secure-store';
import { flashMessage } from '../../lottie/flashMessage';

const SavePrivateInfo = () => {
    const [AccountNumber, setAccountNumber] = useState('')
    const [ifsc,setIfsc] = useState('')
    const [card,setCard] = useState('')
    const [aadhar,setAadhar] = useState('')
    const [pan,setPan] = useState('')

    useEffect(() => {
        const isLoggedIn = async () => {
            const name = await SecureStore.getItemAsync('name');
            if(!name) {
                navigation.push('Login');
            }
        }
        isLoggedIn();
    } ,[])
    useEffect(() => {
        
        async function getData(){
            
            setAccountNumber(await SecureStore.getItemAsync("AccountNumber"))
            setIfsc(await SecureStore.getItemAsync("ifsc"))
            setCard(await SecureStore.getItemAsync("card"))
            setAadhar(await SecureStore.getItemAsync("aadhar"))
            setPan(await SecureStore.getItemAsync("pan"))
            flashMessage("Your Private information loaded successfully!", 'success');
        };
        getData();
},[]);
    const handleSave = async () => {
        
        await SecureStore.setItemAsync('AccountNumber',AccountNumber);
        await SecureStore.setItemAsync('ifsc',ifsc);
        await SecureStore.setItemAsync('card',card);
        await SecureStore.setItemAsync('aadhar',aadhar);
        await SecureStore.setItemAsync('pan',pan);
        
        flashMessage("Your Private information saved successfully!", 'success');
    }
    
  return (
    <View style={styles.container}>
        <HeaderCard heading="Info Vault" text="This is your private and safe info" />
        <View style={styles.divider}></View>
        <Text className='text-[12px] bg-[#DB0E0E] font-semibold text-[#FFFFFF] text-center mt-2 mb-2 p-1'>Please note  that the information {"\n"}added here is sensitive.</Text>
        <ScrollView
        style={styles.forms}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >
       
        <View style={styles.inputhead}>
        <Text style={styles.inputLabel}>Bank Account Number</Text>
        <TouchableOpacity><Text style={styles.inputCopy}>Copy</Text></TouchableOpacity>
        </View>
        <TextInput
        style={styles.inputStyle}
        onChangeText={(e)=>{setAccountNumber(e)}}
        placeholder="Account Number"
        value={AccountNumber}
        ></TextInput>
        <View style={styles.inputhead}>
        <Text style={styles.inputLabel}>IFSC Code</Text>
        <Text style={styles.inputCopy}>Copy</Text>
        </View>
        <TextInput
        style={styles.inputStyle}
        onChangeText={(e)=>{setIfsc(e)}}
        placeholder="IFSC Code"
        value={ifsc}
        ></TextInput>
        <View style={styles.inputhead}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <Text style={styles.inputCopy}>Copy</Text>
        </View>
        <TextInput
        style={styles.inputStyle}
        onChangeText={(e)=>{setCard(e)}}
        placeholder="Card Number"
        value={card}
        ></TextInput>
        <View style={styles.inputhead}>
        <Text style={styles.inputLabel}>Aadhar Number</Text>
        <Text style={styles.inputCopy}>Copy</Text>
        </View>
        <TextInput
        style={styles.inputStyle}
        onChangeText={(e)=>{setAadhar(e)}}
        placeholder="Aadhar Number"
        value={aadhar}
        ></TextInput>
        <View style={styles.inputhead}>
        <Text style={styles.inputLabel}>Pan Number</Text>
        <Text style={styles.inputCopy}>Copy</Text>
        </View>
        <TextInput
        style={styles.inputStyle}
        onChangeText={(e)=>{setPan(e)}}
        placeholder="Pan Number"
        value={pan}
        ></TextInput>
        <Text className="flex-1 text-center mt-2 text-[#101010]">Note: You have to enter OTP every time{"\n"}you try to access this page.</Text>
        <TouchableOpacity 
        onPress={handleSave}
        style={styles.savebutton}
        >
        <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default SavePrivateInfo

const styles = StyleSheet.create({
    container: {
		
		marginTop: 28,
		marginBottom: 20,
        
		
	},
	innerContainer: {
        
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headingBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	heading: {
		fontSize: 26,
		fontWeight: "600",
		color: "#101010",
		paddingBottom: 5,
	},
    smallDesc: {
		color: "#101010",
    
	},
    forms:{
        marginHorizontal:24,
    },
    inputhead:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:12,
    },
    inputStyle:{
        marginVertical:4,
        height:48,
        fontSize:12,
        padding:10,
        color:"#101010",
        borderColor:"#8E8E8E",
        borderWidth:1,
        borderRadius:4,
        
    },
    inputLabel:{
        color: "#8E8E8E",

    },
    inputCopy:{
        color: "#2C81E0",
    },
    divider:{
        borderBottomWidth:1,
        width:Dimensions.get("window").width,
        borderBottomColor:"#8E8E8E",
    },
    savebutton:{
        backgroundColor:"#2C81E0",
        padding:12,
        alignItems:"center",
        borderRadius:4,
        marginTop:12,
        

    },
    buttonText:{
        color:"#FFFFFF",
        fontSize:20,
        
    }
})