import React, { useEffect,useState } from "react";

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import * as SecureStore from "expo-secure-store";
import HeaderCard from "../subcomponents/HeaderCard";
import { SuggestionByUser } from "../../https/suggestions";
const TrackRequest = () => {
    const [accessToken,setAccessToken]=useState("");
    const [userId,setUserId]=useState("");
    const [suggestions,setSuggestions]=useState({});
    const [loading ,setLoading]=useState(true);
    useEffect(() => {
        async function getDetails(){
        
        setAccessToken(await SecureStore.getItemAsync('accessToken'));
        setUserId(await SecureStore.getItemAsync('userId'));
        GetTheList();
        }
        async function GetTheList(){
            const body={User:parseInt(userId)};
            const data = await SuggestionByUser(accessToken,body);
            console.log(data,'data')
            if(data?.success === true) {
                setSuggestions(data)
                setLoading(false)
            }
        }
        getDetails();
        
    }, [])
    
    const Item = ({ pointName,address,otherdetails,suggestion_status }) => (
        <View style={styles.item}>
            <Text style={styles.address}>Point Name :{pointName}</Text>
          <Text style={styles.address}>Address : {address}</Text>
          <Text style={styles.address}>Other Details: {otherdetails}</Text>
          <Text style={styles.address}>Status: {suggestion_status}</Text>
        </View>
      );
      const renderItem = ({ item }) => (
        <Item pointName={item.pointName} address={item.address} otherdetails={item.otherdetails} suggestion_status={item.suggestion_status}   />
      );
    return (
    <SafeAreaView style={styles.container}>
        {loading
        ?
        <View style={styles.loadView}><Text style={styles.loading}>Loading....</Text></View>
        :
        <View>
        <HeaderCard
				heading="Your Suggestions"
				text="List of all your Suggestions"
			  />
        <FlatList
        data={suggestions.data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
        ></FlatList></View>}
    </SafeAreaView>
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
    item: {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 20,
      marginVertical: 8,
      boxShadow: '10px 10px 30px rgba(255, 255, 255, 0.5)',
      marginHorizontal: 16,
    },
    title: {
      fontSize: 12,
    },
  });
export default TrackRequest;
