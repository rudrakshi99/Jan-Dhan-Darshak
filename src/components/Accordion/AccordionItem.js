import { ChevronUpIcon,ChevronDownIcon } from "react-native-heroicons/solid";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

const AccordionItem = ({ otherdetails,pointName,uid,address,status}) => {
    const [isActive, setIsActive] = useState(false);
  return (
    <View>
        <Collapse onToggle={isActive => setIsActive(isActive)}>
        <CollapseHeader>
            <View style={styles.AccordView}>
            <View style={styles.innerAccord}>
            {pointName.length>18?(<Text style={styles.pointname}>{`${pointName.slice(0,15)}...`}</Text>):(<Text style={styles.pointname}>{pointName}</Text>)}
            {!isActive && <Text style={styles.trackid}>Track ID:{uid.substr(0,12)}...</Text>}
            </View>
            <View style={styles.buttonarrow}>
            {status === 'Pending' ? <View style={{backgroundColor:"#FFD233",borderRadius:8,justifyContent:"center",height:32,width:100,alignItems:"center"}}><Text style={styles.statustext}>{status}</Text></View> : null}
            {status === 'Approved' ? <View style={{backgroundColor:"#3A8DEC",borderRadius:8,justifyContent:"center",height:32,width:100,alignItems:"center"}}><Text style={styles.statustext}>{status}</Text></View> : null}
            {status === 'Rejected' ? <View style={{backgroundColor:"#DB0E0E",borderRadius:8,justifyContent:"center",height:32,width:100,alignItems:"center"}}><Text style={styles.statustext}>{status}</Text></View> : null}
            {status === 'Completed' ? <View style={{backgroundColor:"#219653",borderRadius:8,justifyContent:"center",height:32,width:100,alignItems:"center"}}><Text style={styles.statustext}>{status}</Text></View> : null}
            
            
            <View style={styles.iconview}>{isActive ? <ChevronUpIcon size={22} color="#2C81E0"/> : <ChevronDownIcon size={22} color="#2C81E0" />}</View>
            </View>
            </View>
        </CollapseHeader>
      <CollapseBody>   
        <View style={styles.dropdownView}>
          <View style={styles.address}><Text style={styles.dropdetail}>Address:</Text><Text style={styles.dropdetailview}>{address}</Text></View>
          <View style={styles.address}><Text style={styles.dropdetail}>Other Details:</Text><Text style={styles.dropdetailview} >{otherdetails}</Text></View>
          <View style={styles.address}><Text style={styles.dropdetail}>Track ID:</Text><Text style={styles.dropdetailview}>{uid}</Text></View>
        </View>
      </CollapseBody>
    </Collapse>

    <View style={styles.divider2}></View>
  </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
  divider2: {
		height: 0.3,
		backgroundColor: "#8E8E8E",
	},
    AccordView:{
        backgroundColor: "#FAFAFA",
       padding:12,
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
     fontSize:12,
      fontWeight:"600",
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
        
        

    },
    dropdetail:{
      color:"#626262",
        fontSize: 14,
        padding: 20
    },
    dropdetailview:{
      color:"#626262",
        fontSize: 14,
        flexShrink: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
        textAlign: "left"
    },

    address:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      textAlign: "left"
    }
})