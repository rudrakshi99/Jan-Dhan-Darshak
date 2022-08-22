import React, { useEffect,useState } from "react";

import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity,ScrollView, Dimensions } from 'react-native';
import * as SecureStore from "expo-secure-store";
import HeaderCard from "../subcomponents/HeaderCard";

import { SuggestionByUser } from "../../https/suggestions";
import AccordionItem from "../Accordion/AccordionItem";
import { useNavigation } from "@react-navigation/native";
import { FilterIcon } from "react-native-heroicons/solid";
import { CheckBox,Button } from "@rneui/themed";

const TrackRequest = () => {
    const [accessToken,setAccessToken]=useState("");
    const [userId,setUserId]=useState("");
    const [suggestions,setSuggestions]=useState({});
    const [loading ,setLoading]=useState(false);
    const navigation = useNavigation();

    // useEffect(() => {
    //   const isLoggedIn = async () => {
    //     const name = await SecureStore.getItemAsync('name');
    //     if(!name) {
    //       navigation.push('Login');
    //     }
    //   }
    //   isLoggedIn();
    // }, []);

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
    const data=[{'uid':1,'pointName':'JSS Academy of technical education','address':'address1','otherdetails':'content1lnkacsklnsalcasnnlkcsanncsansakclnasbckacksbjkasbckbbascbkbskjac','suggestion_status':'Pending'},
      {'uid':2,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','suggestion_status':'Rejected'},
      {'uid':3,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','suggestion_status':'Pending'},
      {'uid':4,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','suggestion_status':'Approved'},
      {'uid':5,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','suggestion_status':'Completed'},
      {'uid':6,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','suggestion_status':'Completed'},
      {'uid':7,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','suggestion_status':'Completed'},
      {'uid':8,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','suggestion_status':'Completed'},
      {'uid':9,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','suggestion_status':'Rejected'},
      {'uid':10,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','suggestion_status':'Pending'},
      {'uid':11,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','suggestion_status':'Approved'},
      {'uid':12,'pointName':'title5','address':'address5','otherdetails':'content5acnslnasclnlsacnlcaksnlsacnlcsallcsanncasl','suggestion_status':'Completed'},
      {'uid':13,'pointName':'title2','address':'address2','otherdetails':'content2clasnklnsancascnk','suggestion_status':'Rejected'},
      {'uid':14,'pointName':'title3','address':'address3','otherdetails':'content3alscnnklanslknacslk','suggestion_status':'Pending'},
      {'uid':15,'pointName':'title4','address':'address4','otherdetails':'content4alscnlnasklnlacsnl','suggestion_status':'Approved'},
    ]

    
    const [toggleFilter,setToggleFilter]=useState(false)
    const [togglePending, setTogglePending] = useState(false)
    const [toggleAccepted, setToggleAccepted] = useState(false)
    const [toggleRejected, setToggleRejected] = useState(false)
    const [toggleCompleted, setToggleCompleted] = useState(false)
    const [filteredData,setFilteredData]=useState(data)
    const handleFilter=()=>{
      if(toggleAccepted===true){
      let res = data.filter((item)=>item.suggestion_status=="Approved");
      setFilteredData(res);
    }
      else if(toggleRejected===true){
        let res = data.filter((item)=>item.suggestion_status=="Rejected");
      setFilteredData(res);
      }
      else if(togglePending===true){
        let res = data.filter((item)=>item.suggestion_status=="Pending");
      setFilteredData(res);
        }
      else if(toggleCompleted===true){
      let res = data.filter((item)=>item.suggestion_status=="Completed");
      setFilteredData(res);
      }
      else setFilteredData(data)
      setToggleFilter(!toggleFilter);
    }
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
        <ScrollView style={styles.listview}>
        
       {filteredData.map(({ uid,address,otherdetails,pointName,suggestion_status }) => {
            return (
              <AccordionItem key={uid} uid={uid} address={address} pointName={pointName} otherdetails={otherdetails} status={suggestion_status}/>
            );
          })}
          </ScrollView>
          {
          !toggleFilter
          ?(<View style={styles.filterview}>
          <TouchableOpacity onPress={()=>{setToggleFilter(!toggleFilter)}}>
              <Text style={styles.filtertext}><FilterIcon size={16} color="#8E8E8E"></FilterIcon>Filter</Text>
          </TouchableOpacity>

          </View>):
          (<View style={styles.filterdetailed}>
          <View style={styles.filterexpand}>
            <View style={styles.filterhead}>
              <Text>Filters </Text>
                    
              </View>
              <View style={styles.filterdivider}></View>
              <View style={styles.filteroptions}>
              <Text>Pending  </Text>
                    <CheckBox
                    checkedColor={"#2C81E0"}
                    checked={togglePending}
                    onPress={() => {
                      setTogglePending(!togglePending);
                      setToggleAccepted(false);
                      setToggleRejected(false);
                      setToggleCompleted(false);
                    }}
                    />
              </View>
            
            <View style={styles.filterdivider}></View>
            
              <View style={styles.filteroptions}>
              <Text> Approved </Text>
                    <CheckBox
                    checkedColor={"#2C81E0"}
                    checked={toggleAccepted}
                    onPress={() => {
                      setToggleAccepted(!toggleAccepted);
                      setTogglePending(false)
                      setToggleRejected(false);
                      setToggleCompleted(false);
                    }}
                    />
              </View>
            
            <View style={styles.filterdivider}></View>
            
              <View style={styles.filteroptions}>
              <Text>Rejected</Text>
                    <CheckBox
                    checkedColor={"#2C81E0"}
                    checked={toggleRejected}
                    onPress={() => {
                      setTogglePending(false)
                      setToggleRejected(!toggleRejected);
                      setToggleAccepted(false);
                      setToggleCompleted(false);
                    }}
                    />
              </View>
            
            <View style={styles.filterdivider}></View>
            
              <View style={styles.filteroptions}>
                    <Text>Completed</Text>
                    <CheckBox
                    checkedColor={"#2C81E0"}
                    
                    checked={toggleCompleted}
                    onPress={() => {
                      setToggleCompleted(!toggleCompleted);
                      setToggleAccepted(false);
                      setTogglePending(false)
                      setToggleRejected(false);
                    }}
                    />
              </View>
            
            <View style={styles.filterdivider}></View>
            <View style={styles.applyfooter}>
            
            <Button onPress={()=>{setToggleFilter(!toggleFilter)}} size="lg" title="Cancel" type="outline"  containerStyle={{
                
                width: "45%",
                
              }}/>
            
            <Button size="lg" title="Apply" onPress={()=>{handleFilter()}} containerStyle={{
                
                width: "45%",
                
              }}/>
          </View>
          </View>
          
        </View>)
          }
          
          </View>
         } 

    </View>
    );
};
const styles = StyleSheet.create({
    container: {
      
      // marginTop: StatusBar.currentHeight || 0,
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
   filterview:{
    position:"absolute",
    
    alignItems:"center",
    top:Dimensions.get("screen").height*0.92,
    
    
    justifyContent:"center",
    width:Dimensions.get("window").width,
    height:Dimensions.get("screen").height*0.08,
    backgroundColor:"#F9F9F9",

   },
   filtertext:
   {
    fontSize:16,
    color:"#8E8E8E",
   },
   filterdetailed:{
    width:Dimensions.get("window").width,
    height:Dimensions.get("screen").height,
    
    backgroundColor:"rgba(0, 0, 0, 0.8)",
    position:"absolute",
   },
   filterexpand:{
    position:"absolute",
    bottom:0,
    width:Dimensions.get("window").width,
    backgroundColor:"#FFFFFF",
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
   },
   applyfooter:{
    flexDirection:"row",
    padding:30,
    justifyContent:"space-around"

   },
   filteroptions:
   {
    
    padding:10,
    paddingLeft:30,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    fontSize:14,
    color:"#101010"
   },
   filterdivider:{
    width:Dimensions.get("window").width,
    borderBottomWidth:1,
    borderColor:"#8E8E8E",
   },
    filterhead:{
      
      fontSize:14,
      fontWeight:"500",
      padding:20,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    color:"#101010"
    }
  });
export default TrackRequest;
