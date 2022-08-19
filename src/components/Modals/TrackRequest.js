import React, { useEffect,useState } from "react";

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { SuggestionByUser } from "../../https/suggestions";
const TrackRequest = () => {
    const [accessToken,setAccessToken]=useState("");
    const [userId,setUserId]=useState("");
    const [suggestions,setSuggestions]=useState({});
    useEffect(() => {
        async function getDetails(){
        setAccessToken(await SecureStore.getItemAsync('accessToken'));
        setUserId(await SecureStore.getItemAsync('userId'));
        GetTheList();
        }
        async function GetTheList(){
            console.log(accessToken,userId)
            const body={User:parseInt(userId)};
            const data = await SuggestionByUser(accessToken,body);
            console.log(data,'data')
            if(data?.success === true) {
                setSuggestions(data)
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
        <FlatList
        data={suggestions.data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
        ></FlatList>
    </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 12,
    },
  });
export default TrackRequest;
