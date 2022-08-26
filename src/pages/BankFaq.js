import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Accordion from "../components/subcomponents/Accordion";
import HeaderCard from "../components/subcomponents/HeaderCard";

const BankFaqs = () => {

	return (
		<View style={styles.container}>
			<HeaderCard
				heading="Bank FAQs"
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
        title: 'Where can an NRI open a demat account?',
        desc: "NRI can open a demat account with any of our identified branches for opening a demat account. The NRI needs to mention the type ('NRI' as compared to 'Resident') and the sub-type ('Repatriable' or 'Non-Repatriable') in the account opening form collected from the depository participant."
    },
    {
        id: '2',
        title: 'Can such property be sold without the permission of Reserve Bank?',
        desc: "Yes. Reserve Bank has granted general permission for the sale of such property. However, where the property is purchased by another foreign citizen of Indian origin, funds towards the purchase consideration should either be remitted to India or paid out of balances in NRE/FCNR accounts."
    },
    {
        id: '3',
        title: 'How do I come to know about the settlement deadlines?',
        desc: "The depository participant with whom you have your demat account will prescribe the deadlines to be followed by you for submission of delivery instruction slips. You should deliver instructions to your DP as per these deadlines."
    },
    {
        id: '4',
        title: 'Where should I approach for getting my forex transactions processed?',
        desc: "All customers are advised to approach their Base branch (where account of the customer is being maintained) for submission of required documents for processing the forex transactions."
    },
    {
        id: '5',
        title: 'What is the procedure to be followed in case of loss of debit card?',
        desc: "In case of loss of card, customer will be required to report the loss immediately over phone to our 24-hours customer care toll-free number 1800 220 400. He/she will also be required to report the loss to nearest police station and inform the Bank in writing along with a copy of information duly acknowledged by the Police."
    },
    {
        id: '6',
        title: 'Can one buy and sell shares through depository participant?',
        desc: "No. Shares can be bought and sold only through a stockbroker. Our branch DP facilitates delivering the shares against a sell transaction or receiving the shares for a buy transaction."
    },
]

export default BankFaqs;
