import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { getDatesOfCalendar } from "../../https/suggestions";
import Accordion from "../subcomponents/Accordion";
import HeaderCard from "../subcomponents/HeaderCard";

const Faq = () => {

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


const faqs = [
    {
        id: '1',
        title: 'Getting Started- what are the functions of GIS tools?',
        desc: "GIS(Geographic Information System) tools provide a powerful way of exploring spatial phenomenon and trends, aiding a better understanding of Bank Branch, ATM, Bank Mitra and CSC through this android based mobile application with ArcGIS Platform. Here’s a guide to get you started using Jan Dhan Darshan."
    },
    {
        id: '2',
        title: 'What are the Prerequisites?',
        desc: "Internet will be required. (Minimum 3G Internet Speed will be required).\nOnly applicable for Android Mobile (Version 4.3 and above)."
    },
    {
        id: '3',
        title: 'What are the main functionalities of the app?',
        desc: "Map, Map Layers, Global Search, My Location & Near Me, Buffer are the default functionalities in the main layout page.\nFeed Back form needs to be selected from the left side panel or the feedback can be given on any feature using the Identify window of that feature."
    },
    {
        id: '4',
        title: 'What are the features of a map?',
        desc: "A map provides a background of geographical context for the content you wish to display.\nYou can change the different layers of the map at any time and select the one you want to view.\n- Click on Map layer name from the bottom tabs of the map page.\n- Nearby features will appear on the map from the selected map layer.\n- The entire layer Features will be visible with under lying ESRI Street Base Map Layer."
    },
    {
        id: '5',
        title: ' How does Zoom in & Zoom Out help?',
        desc: "This function helps the user to zoom and view any feature at required extent.\n- Drag out and Drag in using the double finger will respectively Zoom In and Zoom Out the map.\n- User can also double click on the map to zoom in."
    },
    {
        id: '6',
        title: 'How does User GPS Location be helpful?',
        desc: "This function will be extremely helpful when you zoom in or zoom out too much on the map, or focused to certain area of interest. This allows the user to come back to user current location with default extent"
    },
    {
        id: '7',
        title: 'How does the Reset or Clear Graphics button works?',
        desc: "This function will be extremely helpful when you want to clear all the graphics from the map.\n- Click on the Default Extent icon from the top right corner of the map page.\n- Extent of the map will be redirect to the current GPS location of the user."
    },
    {
        id: '8',
        title: 'How can you search a particular location?',
        desc: "Search provides user with an opportunity to look for a particular place on a map.\n- Click on the search icon.\n- Search box will expand, on text input the search suggestion will come.\n- Type the place to be search and select from the suggestion list.\n- Extent will be zoomed on to the searched place with identification icon over the location."
    },
    {
        id: '9',
        title: 'How does Proximity Buffer help?',
        desc: "This allows the user to quickly identify the services/facilities of the selected map layer (Bank, ATM, Bank Mitra, and CSC) within the specified location. It shows the complete list of all nearest features within the proximity.\n\nNote: - The distance calculated is aerial distance.\n- Click on the tool icon from second right of the tool bar.\n- Select the layer from the map layer tab at the bottom tab, in which you need to find the features within proximity.\n- Select the proximity distance from the horizontal scroll bar at the bottom of the page.\m- Click over the map to define the point of origin of the proximity buffer.\n- Features within the proximity will be selected and highlighted with graphic.\n- Result button will be displayed at the top left of the map window.\n- On click of the result button will pop up the list window of features selected within the proximity.\n- On click of any individual result from the list window will zoom in to the particular feature.  "
    },
    {
        id: '10',
        title: 'Feedback ?',
        desc: "Help us make Jan Dhan Darshan mobile application better by providing your valuable feedback.\nWe are always looking for ways to improve and would love to hear from you.\n- Click on the module panel icon from the top left tool bar.\n- Module panel window will open, click on the feedback button.\n- Pop up window with list of all banks will open.\n- Select a particular bank to suggest the feedback.\n- Feedback form will open, fill the required fields and submit the feedback.\nNote: Be as specific as possible, and include as much as you can, so that we can serve you better."
    },
    {
        id: '11',
        title: 'Missing Bank Suggestion',
        desc: "Help us make Jan Dhan Darshan mobile application better by providing your valuable suggestion on the location of a Bank Branch, ATM or Bank Mitra.\n- Click on the module panel icon from the top left tool bar.\n- Module panel window will open, click on the ‘Missing Bank Suggestion’ button.\n- A message will come to click on the map, for the user’s suggested bank (Bank Branch, ATM or Bank Mitra) location.\n- Click on the map to select the location for the bank, the selected layer and location is automatically filled in the Form.\n- Suggestion form will open, fill the required fields and submit the suggestion.\n- Note: Be as specific as possible, and include as much as you can, so that we can serve you better."
    },
    {
        id: '12',
        title: 'About Us',
        desc: "‘About Us’ tab in the menu item can be used to get the information about the application."
    },
    {
        id: '13',
        title: 'Disclaimer',
        desc: "To read the ‘disclaimer’ for the application user can click on the Disclaimer menu item."
    },
]

export default Faq;
