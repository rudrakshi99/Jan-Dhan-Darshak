import React, { useEffect,useState } from "react";

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity,ScrollView } from 'react-native';
import * as SecureStore from "expo-secure-store";
import HeaderCard from "../subcomponents/HeaderCard";

import { SuggestionByUser } from "../../https/suggestions";
import AccordionItem from "../Accordion/Accordion";
const TrackRequest = () => {
    const [accessToken,setAccessToken]=useState("");
    const [userId,setUserId]=useState("");
    const [suggestions,setSuggestions]=useState({});
    const [loading ,setLoading]=useState(false);
    // useEffect(() => {
    //     async function getDetails(){
        
    //     setAccessToken(await SecureStore.getItemAsync('accessToken'));
    //     setUserId(await SecureStore.getItemAsync('userId'));
    //     GetTheList();
    //     }
    //     async function GetTheList(){
    //         const body={User:parseInt(userId)};
    //         const data = await SuggestionByUser(accessToken,body);
    //         console.log(data,'data')
    //         if(data?.success === true) {
    //             setSuggestions(data)
    //             setLoading(false)
    //         }
    //     }
    //     getDetails();
        
    // }, [])
    const data=[{'uid':1,'pointName':'JSS Academy of technical education','address':'address1','otherdetails':'content1lnkacsklnsalcasnnlkcsanncsansakcl','status':'Pending'},
      {'uid':2,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','status':'Rejected'},
      {'uid':3,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','status':'Pending'},
      {'uid':4,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','status':'Approved'},
      {'uid':5,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','status':'Completed'},
      {'uid':6,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','status':'Completed'},
      {'uid':7,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','status':'Completed'},
      {'uid':8,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','status':'Completed'},
      {'uid':9,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','status':'Rejected'},
      {'uid':10,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','status':'Pending'},
      {'uid':11,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','status':'Approved'},
      {'uid':12,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','status':'Completed'},
      {'uid':13,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','status':'Rejected'},
      {'uid':14,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','status':'Pending'},
      {'uid':15,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','status':'Approved'},
    ]

    
    
    
     
    return (
    <View style={styles.container}>
        {loading
        ?
        <View style={styles.loadView}><Text style={styles.loading}>Loading....</Text></View>
        :
        <View>
        <HeaderCard
				heading="Your Suggestions"
				text="List of all your Suggestions"
			  />
        <ScrollView>
        
       {data.map(({ uid,address,otherdetails,pointName,status }) => {
            return (
              <AccordionItem key={uid} uid={uid} address={address} pointName={pointName} otherdetails={otherdetails} status={status}/>
            );
          })}</ScrollView></View>}
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    loadView:{  
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loading:{
      color:"#00CCBB",
      fontSize:20,
      textAlign:"center"
    },
   
    
  });
export default TrackRequest;
