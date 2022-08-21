import { ChevronUpIcon,ChevronDownIcon } from "react-native-heroicons/solid";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'

const Accordion = ({ otherdetails,pointName,uid,address,suggestion_status}) => {
    const [isActive, setIsActive] = useState(false);
  return (
    <View>
        
        <TouchableOpacity onPress={() => setIsActive(!isActive)}>
            <View style={styles.AccordView}>
            <View style={styles.innerAccord}>
            {pointName.length>18?(<Text style={styles.pointname}>{`${pointName.slice(0,15)}...`}</Text>):(<Text style={styles.pointname}>{pointName}</Text>)}
            <Text style={styles.trackid}>Track ID:{uid}</Text>
            </View>
            <View style={styles.buttonarrow}>
            {suggestion_status === 'Pending' ? <View style={{backgroundColor:"#FFD233",borderRadius:8,justifyContent:"center",height:30,width:100,alignItems:"center"}}><Text style={styles.statustext}>{suggestion_status}</Text></View> : null}
            {suggestion_status === 'Approved' ? <View style={{backgroundColor:"#3A8DEC",borderRadius:8,justifyContent:"center",height:30,width:100,alignItems:"center"}}><Text style={styles.statustext}>{suggestion_status}</Text></View> : null}
            {suggestion_status === 'Rejected' ? <View style={{backgroundColor:"#DB0E0E",borderRadius:8,justifyContent:"center",height:30,width:100,alignItems:"center"}}><Text style={styles.statustext}>{suggestion_status}</Text></View> : null}
            {suggestion_status === 'Completed' ? <View style={{backgroundColor:"#219653",borderRadius:8,justifyContent:"center",height:30,width:100,alignItems:"center"}}><Text style={styles.statustext}>{suggestion_status}</Text></View> : null}
            
            
            <View style={styles.iconview}>{isActive ? <ChevronUpIcon size={12} color="#101010"/> : <ChevronDownIcon size={12} color="#101010" />}</View>
            </View>
            </View>
        </TouchableOpacity>
    {isActive &&<View style={styles.dropdownView}>
    <Text style={styles.dropdetail}>{address}</Text>
    <Text style={styles.dropdetail}>{otherdetails}</Text>
    </View>}
  </View>
  )
}

export default Accordion

const styles = StyleSheet.create({


    AccordView:{
        backgroundColor: "#FAFAFA",
       padding:10,
        justifyItems: "center",
       display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonarrow:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      right: -30,
      alignContent: "center",
      justifyContent: "center",
    },
  
    pointname:{
      marginHorizontal:20,
      fontSize:16,
      lineHeight:24,
      color:"#101010",
      fontWeight:"500",
    },
    trackid:{
      marginHorizontal:20,
      fontSize:12,
      fontWeight:"400",
      color:"#626262",
    },
   
    statustext:{
     marginVertical:4,
     fontSize:10,
      fontWeight:"700",
      color:"#fff",
    },
    iconview:{
      
        marginHorizontal: 20,
        width:50,
        justifyContent: "center",
        height:50,
        
    },
    dropdownView:{
        background: "#1c1c1c",
        color: "#00ffb9",
        width: "100%",
        height: "100px",
        
    },
    dropdetail:{
        fontSize: 16,
    },
})