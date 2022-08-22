import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Icon from "react-native-vector-icons/Feather";

const Accordion = ({ id, title, desc }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Collapse onToggle={isExpanded => setOpen(isExpanded)}>
            <CollapseHeader style={styles.collapseHeader}>
                <View className="flex-row justify-center items-center h-20 ml-6 mr-4">
                <Text className="text-[16px] text-[#101010] w-[88%] flex-1 mr-3 font-normal">{title}</Text>
                <Icon name={!open ? "chevron-down" : "chevron-up"} size={24} color="#2C81E0" className="" />
                </View>
            </CollapseHeader>
            <CollapseBody>
                <Text className="text-[14px] mx-5 px-2 -mt-1 mb-3 text-justify text-[#626262]" style={styles.txtInp}>{desc}</Text>
            </CollapseBody>
        </Collapse>
        <View style={styles.divider2}></View>
        </>
    );
};

const styles = StyleSheet.create({
    collapseHeader: {
        height: 77,
        width: '100%',
    },
    divider2: {
		height: 0.3,
		backgroundColor: "#8E8E8E",
	},
    txtInp: {
        lineHeight: 18
    }
});

export default Accordion;
