import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Accordion from "../subcomponents/Accordion";
import HeaderCard from "../subcomponents/HeaderCard";


const Faq = () => {
    const faqs = [
        {
            id: '1',
            title: 'Getting Started- what are the functions of GIS tools?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '2',
            title: 'What are the Prerequisites?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '3',
            title: 'What are the main functionalities of the app?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '4',
            title: 'What are the features of a map?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '5',
            title: ' How does Zoom in & Zoom Out help?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '6',
            title: 'How does User GPS Location be helpful?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '7',
            title: 'How does the Reset or Clear Graphics button works?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '8',
            title: 'How can you search a particular location?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
        {
            id: '9',
            title: 'How does Proximity Buffer help?',
            desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
        },
    ]

	return (
		<View style={styles.container}>
			<HeaderCard
				heading="FAQs"
				text="Frequently Asked Questions"
			/>
			<View style={styles.divider}></View>
			<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {
                    faqs.map((faq) => (
                        <Accordion key={faq.id} id={faq.id} title={faq.title} desc={faq.desc} />
                    ))
                }
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	divider: {
		height: 4,
		backgroundColor: "#EAEAEA",
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)'
	},
});

export default Faq;
