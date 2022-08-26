import React, { useState, useEffect } from "react";
import {
	View,
	Platform,
	TouchableOpacity,
	Text,
	Modal,
	Dimensions,
	StyleSheet,
	Image,
	ScrollView,
	Share,
	Alert,
	Linking,
	Animated,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { ArrowNarrowDownIcon } from "react-native-heroicons/outline";
import { BASE_URL, API_KEY } from "@env";
import { TabView, SceneMap } from "react-native-tab-view";
import { createSavedLocation } from "../https/Locations";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { flashMessage } from "../lottie/flashMessage";
import { translations } from "../translations/translations";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Calendar } from 'react-native-calendars';
import { getDatesOfCalendar } from "../https/suggestions";
import { ArrowNarrowLeftIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DetailModal = ({ show, setShow, item, type }) => {
	const [index, setIndex] = useState(0);
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalReminder, setModalReminder] = useState(false);
	const [lan, setLan] = useState("");
	const [detailpage, setDetailpage] = useState(
		translations["English"].detail_page
	);
	const [holidays, setHolidays] = useState({});
	const [holidayList, setHolidayList] = useState([]);

	const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
	const [time,setTime] = useState('Set Time');

	const handleConfirm = (date) => {
		date=date.toString();
		const newDate=date.substring(date.indexOf(':')-2,date.lastIndexOf(':'));
		console.log("A date has been picked: ", newDate);
		setTime(newDate);
		setDatePickerVisibility(false);
		hideDatePicker();
	};

	useEffect(() => {
		{
			const getLan = async () => {
				const res = await SecureStore.getItemAsync("lan");
				if (res == "") {
					setLan("English");
				}
				setDetailpage(translations[lan].detail_page);
			};
			getLan();
		}
	}, []);

	let markDates = {};
	useEffect(() => {
		const getDate = async () => {
			const ans = await getDatesOfCalendar('PB');
			if(ans?.success === true) {
				setHolidayList(ans.data);
				ans.data.map(item => (
					markDates[item.holiday] = { selected: true, selectedColor: '#8e8e8e' }
				))
				setHolidays(markDates);
			}
		}
		getDate();
	}, []);
	
	const [routes] = useState([
		{ key: "first", title: `${detailpage.overview}` },
		{ key: "second", title: `${detailpage.review}` },
	]);

	async function share(name) {
		try {
			const result = await Share.share({
				message: `Hey, I wan to share this location of ${name}, Click on the link to view it. \n https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
				title: "I am sharing this location with you",
				url: `https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	}
	async function handleSaveLocation(place_id) {
		try {
			const accessToken = await SecureStore.getItemAsync("accessToken");
			const userId = await SecureStore.getItemAsync("userId");
			if (!!accessToken) {
				// navigation.navigate("Login", {
				// 	to: "Detail",
				// 	place_id: place_id,
				// });
			}
			const result = await createSavedLocation({
				accessToken: accessToken,
				place_id: place_id,
				User: userId,
			});
			if (result.success) {
				flashMessage(result?.message, "success");
				Alert.alert(result.message);
			}
			console.log(result);
		} catch (err) {
			console.log(err);
			flashMessage(err?.response?.data, "success");
		}
	}

	function handleFeedback({ name, financial_type, location, place_id }) {
		navigation.navigate("BankFeedback", {
			name: name,
			financial_type: financial_type,
			location: location,
			place_id: place_id,
		});
	}

	const handleReminder = async () => {
		flashMessage('Reminder has been setted successfully', 'success');
		setTimeout(() => {
			navigation.push('Home');
		}, 1000);
	}

	const FirstRoute = () => {
		const [expand, setExpand] = useState(false);
		return (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#EAEAEA",
				}}
			>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 5,
					}}
				>
					<Image
						source={require("../assets/icons/marker.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "400",
							marginLeft: 10,
						}}
					>
						{item?.formatted_address}
					</Text>
				</View>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "flex-start",
						marginBottom: 5,
					}}
				>
					<Image
						source={require("../assets/icons/clock.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					{expand ? (
						<View>
							{item?.opening_hours.weekday_text.map((item, i) => {
								return (
									<Text
										style={{ marginLeft: 10, fontSize: 16 }}
										key={i}
									>
										{item}
									</Text>
								);
							})}
						</View>
					) : (
						<Text
							style={{
								fontSize: 16,
								fontWeight: "400",
								marginLeft: 10,
							}}
						>
							Monday : 10AM to 6PM
						</Text>
					)}
					<TouchableOpacity
						onPress={() => {
							setExpand((prev) => !prev);
						}}
					>
						<ArrowNarrowDownIcon
							style={{ marginLeft: 10 }}
							size={20}
							color="#2C81E0"
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						paddingHorizontal: 30,
						paddingVertical: 40,
						backgroundColor: "#fff",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../assets/icons/clock.png")}
						style={{ height: 20, resizeMode: "contain" }}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "400",
							marginLeft: 10,
						}}
					>
						Write a review...
					</Text>
				</View>
			</ScrollView>
		);
	};

	const SecondRoute = () => (
		<ScrollView style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
			<View style={styles.reviewContainer}>
				<View>
					<Text style={styles.reviewTitle}>
						{detailpage.user_review}
					</Text>
					<View style={styles.rating}>
						<Text
							style={{
								fontSize: 60,
								marginRight: 10,
								fontWeight: "600",
							}}
						>
							{item?.rating}
						</Text>
						<Icon name="star" size={40} color="#FF9900" />
					</View>
				</View>
				<View></View>
			</View>
			<View
				style={{
					backgroundColor: "#fff",
					paddingHorizontal: 30,
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: "600" }}>
					{detailpage.top_review}
				</Text>
			</View>
			<View style={{}}>
				{item?.reviews ? (
					item?.reviews?.map((review, i) => {
						return (
							<View
								key={i}
								style={{
									paddingHorizontal: 30,
									marginBottom: 10,
									backgroundColor: "#fff",
									paddingVertical: 20,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Image
										source={{
											uri: review.profile_photo_url,
										}}
										style={{ width: 40, height: 40 }}
									/>
									<View style={{ marginLeft: 10 }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "600",
											}}
										>
											{review.author_name}
										</Text>
										<Text
											style={{
												color: "#101010",
												fontSize: 14,
											}}
										>
											{review.relative_time_description}
										</Text>
									</View>
								</View>
								<Text style={{ marginTop: 10 }}>
									{review.text}
								</Text>
							</View>
						);
					})
				) : (
					<View
						style={{ paddingVertical: 20, backgroundColor: "#fff" }}
					>
						<Text
							style={{
								fontSize: 18,
								textAlign: "center",
								fontWeight: "600",
								fontStyle: "italic",
							}}
						>
							No reviews made..
						</Text>
					</View>
				)}
			</View>
		</ScrollView>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	// const renderTabBar = (props) => {
	// 	const inputRange = routes.map((x, i) => i);
	// 	return (
	// 		<View style={styles.tabBar}>
	// 			{props.navigationState.routes.map((route, i) => {
	// 				const opacity = props.position.interpolate({
	// 					inputRange,
	// 					outputRange: inputRange.map((inputIndex) =>
	// 						inputIndex === i ? 1 : 0.5
	// 					),
	// 				});
	// 				{
	// 					const w = inputRange.map((inputIndex) => {
	// 						if (inputIndex === i) {
	// 							return 2;
	// 						}
	// 						return 0;
	// 					});
	// 				}

	// 				return (
	// 					<View
	// 						style={[
	// 							styles.tabItem,
	// 							{
	// 								borderBottomWidth: w,
	// 							},
	// 						]}
	// 						onPress={() => setIndex(i)}
	// 					>
	// 						<Animated.Text
	// 							style={[{ opacity }, { fontSize: 16 }]}
	// 						>
	// 							{route.title}
	// 						</Animated.Text>
	// 					</View>
	// 				);
	// 			})}
	// 		</View>
	// 	);
	// };

	return (
		<Modal
			animationType="slide"
			visible={show}
			transparent
			onRequestClose={() => {
				setShow(false);
			}}
		>
			<View style={styles.container}>
				{item?.photos ? (
					<Image
						source={{
							uri: `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item?.photos[0]?.photo_reference}&key=${API_KEY}`,
						}}
						style={styles.image}
					/>
				) : (
					<Image
						source={require("../assets/images/not-found.jpg")}
						style={styles.image}
					/>
				)}
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => setShow(false)}
				>
					<Icon name="keyboard-backspace" size={25} color="black" />
				</TouchableOpacity>
				<View style={styles.detailContainer}>
					<View style={[{ paddingHorizontal: 16 }]}>
						<View style={styles.headContainer}>
							<View>
								<Text style={styles.name}>{item?.name}</Text>
								{/* <Text style={styles.id}>
									Place ID : #{item?.place_id.toUpperCase().substr(0,12)}
								</Text> */}
								{type.atm === true && (
									<View className="pt-2">
										<Text style={styles.id}>
											<Text className="font-semibold">
												Withdrawal Amount :
											</Text>
											<Text>
												₹{" "}
												{parseInt(
													Math.random() * 25000
												) + 10000}
											</Text>
										</Text>
										<Text style={styles.id}>
											<Text className="font-semibold">
												IFSC :
											</Text>
											<Text>
												{parseInt(
													Math.random() * 999999
												) + 999999}
											</Text>
										</Text>
									</View>
								)}
								{type.bank === true && (
									<View className="p-2">
										<Text style={styles.id}>
											<Text className="font-semibold">
												IFSC :
											</Text>
											<Text>
												{parseInt(
													Math.random() * 999999
												) + 999999}
											</Text>
										</Text>
										<Text style={styles.id}>
											<Text className="font-semibold">
												RTGS :{" "}
											</Text>
											{parseInt(Math.random() * 10) <
											5 ? (
												<Text className="text-[#34994C]">
													Available
												</Text>
											) : (
												<Text className="text-[#DB0E0E]">
													Not Available
												</Text>
											)}
										</Text>
										<Text style={styles.id}>
											<Text className="font-semibold pr-2">
												MICR :{" "}
											</Text>
											{parseInt(Math.random() * 10) <
											5 ? (
												<Text className="text-[#34994C]">
													Available :
												</Text>
											) : (
												<Text className="text-[#DB0E0E]">
													Not Available
												</Text>
											)}
										</Text>
									</View>
								)}
							</View>
							<Text
								style={[
									styles.openStatus,
									item?.opening_hours?.open_now
										? { color: "rgba(52, 153, 76, 1)" }
										: { color: "rgba(219, 14, 14, 1)" },
									item?.opening_hours?.open_now
										? {
												backgroundColor:
													"rgba(52, 153, 76, 0.4)",
										  }
										: {
												backgroundColor:
													"rgba(219, 14, 14, 0.4)",
										  },
								]}
							>
								{item?.opening_hours?.open_now
									? `${detailpage.open_now}`
									: `${detailpage.closed_now}`}
							</Text>

							<TouchableOpacity onPress={() => setModalVisible(true)} className='mr-2'><Icon1 name="calendar" size={20} color="#2C81E0" /></TouchableOpacity>
							<TouchableOpacity onPress={() => setModalReminder(true)}><Icon2 name="notifications" size={20} color="#2C81E0" /></TouchableOpacity>
						</View>

						<View style={styles.buttonRow}>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[
										styles.optionButton,
										{ backgroundColor: "#2C81E0" },
									]}
									onPress={() => {
										navigation.navigate("Directions", {
											name: item?.name,
											place_id: item?.place_id,
										});
									}}
								>
									<Image
										source={require("../assets/icons/direction.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>
									{detailpage.directions}
								</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() => {
										item.international_phone_number
											? Linking.openURL(
													`tel:${item.international_phone_number}`
											  )
											: Alert.alert("No Phone Avaialble");
									}}
								>
									<Image
										source={require("../assets/icons/call.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>
									{detailpage.call}
								</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() => {
										share(item?.name);
									}}
								>
									<Image
										source={require("../assets/icons/share_outlined.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>
									{detailpage.share}
								</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity
									style={[styles.optionButton]}
									onPress={() =>
										handleSaveLocation(item?.place_id)
									}
								>
									<Image
										source={require("../assets/icons/save.png")}
										style={styles.optionVector}
										resizeMode="contain"
									/>
								</TouchableOpacity>
								<Text style={styles.optionText}>
									{detailpage.save}
								</Text>
							</View>
						</View>
					</View>

					<TabView
						navigationState={{ index, routes }}
						renderScene={renderScene}
						// renderTabBar={renderTabBar}
						onIndexChange={setIndex}
						initialLayout={{
							width: Dimensions.get("window").width,
						}}
						indicatorContainerStyle={{ backgroundColor: "white" }}
						inactiveColor="#fff"
					/>
					<View style={styles.floatingButtonContainer}>
						<TouchableOpacity
							style={styles.floatingButton}
							onPress={() =>
								handleFeedback({
									name: item?.name,
									place_id: item?.place_id,
									location: item?.formatted_address,
									financial_type: item.type
										? item.type[0]
										: null,
								})
							}
						>
							<Image
								source={require("../assets/icons/feedback.png")}
								style={styles.floatingButtonImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								marginTop: 10,
							}}
						>
							{detailpage.feedback}
						</Text>
					</View>
				</View>
			</View>

			{
                modalVisible ? (
					
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
						>
							<View style={styles.centeredView1}>
								<View className='flex-row items-center mt-3 mb-3'>
									<TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className='-ml-6'>
										<ArrowNarrowLeftIcon size={30} color="#101010" />
									</TouchableOpacity>
									<Text className='text-[19px] font-semibold ml-12 text-[#101010]'>Bank Holidays Calendar</Text>
									<Text></Text>
								</View>
								<View className='w-[100%]'>
									<Calendar
										markedDates={holidays}
									/>
								</View>

								<Text className='text-[19px] font-semibold text-left mt-2 mb-2 text-[#413838]'>Holidays List</Text>
								<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
									{
										holidayList?.filter(item => !item.holiday_reason.includes('Sunday')).filter(item => !item.holiday_reason.includes('Saturday')).map(list => (
											<View className='w-42 flex-row bg-[#fff] items-center space-x-6 space-y-2 mb-4'>
												<Text className='text-left text-[#fff] bg-[#8E8E8E] rounded-3xl p-2.5 m-2'>{list.holiday.substring(list.holiday.lastIndexOf('-')+1, list.holiday.length)}</Text>
												<Text className='text-[#8E8E8E] text-[16px]'>{list.holiday_reason}</Text>
											</View>
										))
									}
								</ScrollView>
							</View>
                        </Modal>
                    </View>
					
                ) : null
            }


			{
                modalReminder ? (
					
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalReminder}
						>
							<View style={styles.centeredView2}>
								<View className='flex-row items-center mt-3 mb-3'>
									<TouchableOpacity onPress={() => setModalReminder(!modalReminder)} className='-ml-20'>
										<ArrowNarrowLeftIcon size={30} color="#101010" />
									</TouchableOpacity>
									<Text className='text-[19px] font-semibold ml-12 text-[#101010]'>Set Reminder</Text>
									<Text></Text>
								</View>
								<View className='w-[100%]'>
									<Calendar
										onChange={(range) => console.log(range)}
										startDate={new Date(2022, 3, 30)}
  										endDate={new Date(2018, 4, 5)}
										markedDates={holidays}
									/>
								</View>

								<TouchableOpacity
									onPress={() => setDatePickerVisibility(true)}
									className=' mx-8 mt-6 p-3 w-72 rounded-lg flex-row items-center'
								>
									<View className='flex-1 text-center'>
										<Text className='flex-1 border text-center text-[28px] text-[#2C81E0]'>{time}</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleReminder()}
									className='bg-[#2C81E0] mx-8 mt-6 p-3 w-72 rounded-lg flex-row items-center'
								>
									<Text className='flex-1 text-white font-bold text-lg text-center'>Save</Text>
								</TouchableOpacity>
								<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
									<DateTimePickerModal
											isVisible={isDatePickerVisible}
											mode="time"
											onConfirm={handleConfirm}
											onCancel={() => setDatePickerVisibility(false)}
										/>
								</ScrollView>
								
							</View>
                        </Modal>
                    </View>
					
                ) : null
            }

		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
		top: 200,
    },
	centeredView1: {
        backgroundColor: '#F9F9F9',
        display: 'flex',
		flex: 1,
        justifyContent: "center",
        alignItems: "center",
		top: 100,
		margin: 2
    },
	centeredView2: {
        backgroundColor: '#F9F9F9',
        display: 'flex',
		flex: 1,
        justifyContent: "center",
        alignItems: "center",
		top: 200,
		margin: 2
    },
	container: {
		width: Dimensions.get("window").width,
		backgroundColor: "#fff",
		// paddingVertical: 30,
		position: "absolute",
		bottom: -30,
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 60,
		height: Dimensions.get("window").height + 30,
	},
	headContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	detailContainer: {
		backgroundColor: "#fff",
		height: Dimensions.get("window").height / 1.3,
		paddingVertical: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		elevation: 5,
		transform: [{ translateY: 0 }],
	},
	image: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 4,
	},
	name: {
		fontSize: 20,
		fontWeight: "700",
		width: Dimensions.get("window").width / 2.1,
	},
	id: {
		color: "#101010",
		fontSize: 14,
	},
	openStatus: {
		fontSize: 15,
		fontWeight: "500",
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginRight: 8,
		borderRadius: 8,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
	},
	tabBar: {
		flexDirection: "row",
		// paddingTop: 10,
		elevation: 1,
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	optionVector: {
		height: 24,
		width: 24,
	},
	optionButton: {
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 5,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 14,
		fontWeight: "500",
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	reviewContainer: {
		backgroundColor: "#fff",
		paddingVertical: 20,
		paddingHorizontal: 30,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 0,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	reviewTitle: {
		fontSize: 20,
		fontWeight: "700",
	},
	floatingButtonContainer: {
		position: "absolute",
		bottom: 45,
		right: 25,
		backgroundColor: "white",
		borderTopLeftRadius: 99,
		borderTopRightRadius: 99,
		padding: 10,
	},
	floatingButton: {
		backgroundColor: "#fff",
		borderRadius: 99,
		padding: 20,
		elevation: 10,
	},
	floatingButtonImage: {
		height: 30,
		width: 30,
	},
	backButton: {
		backgroundColor: "#fff",
		borderRadius: 99,
		padding: 10,
		position: "absolute",
		top: 10,
		left: 10,
		elevation: 5,
	},
});

export default DetailModal;
