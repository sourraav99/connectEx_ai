import {
    View,
    ImageBackground,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    FlatList,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView,
    Switch
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGE_BASE_URL } from '../../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';


const { height, width } = Dimensions.get('window'); // Screen dimensions
const screenWidth = Dimensions.get('window').width; // Get the screen width
const numDots = 12; // Number of dots
const dotSize = screenWidth / (numDots * 1.7); // Calculate dot size and spacing

const PaymentConfirmation = ({ props }) => {
    const route = useRoute();
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();
    const { data, ServiceType,source } = route?.params || {};
    const [userData, setUserData] = useState(null);
    const [discountCode, setDiscountCode] = useState('');

    console.log('source=====>>>>', source);
    const getAmount = (serviceType) => {
        if (['Message', 'Call', 'Video Call'].includes(serviceType)) {
            return '₹ 50/min';
        }
        return 'N/A';
    };



    const getUserDataFromStorage = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
                const parsedData = JSON.parse(userDataString); // Parse JSON data
                console.log('User Data:', parsedData);
                setUserData(parsedData); // Save the data to state
            } else {
                console.log('No user data found in storage.');
            }
        } catch (error) {
            console.error('Error retrieving user data:', error); // Log the error
        }
    };


    useEffect(() => {
        getUserDataFromStorage(); // Fetch user data when the screen loads
    }, []);

    const navigateToChat = () => {
        console.log('firebaseId:', userData?.firebaeUserId);

        if (discountCode.toLowerCase() === 'free') {
            if (userData?.firebaeUserId) {
                navigation.navigate('ChatScreen', {
                    data: data,
                    firebaseId: userData.firebaeUserId,
                    source:source
                });
            } else {
                console.log('No firebaseId found in userData');
                // alert('Firebase ID not found. Please try again.');
            }
        } else {
            Toast.show('Please enter valid discount code.', Toast.SHORT)
            // alert('Invalid discount code. Please try again.');
        }
    };


    // const navigateToChat = () => {
    //     console.log('firebaseId:', userData.firebaeUserId);

    //     if (userData && userData.firebaeUserId) {
    //         // Pass firebaseId along with any other data needed for ChatScreen

    //         navigation.navigate('ChatScreen', { data: data, firebaseId: userData.firebaeUserId });
    //     } else {
    //         console.log('No firebaseId found in userData');
    //     }
    // };

    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
                <View style={{ height: safeAreaInsets.top }} />
                <StatusBar backgroundColor={COLORS.BLACK} />
                {/* Search Header */}
                <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: verticalScale(30), width: verticalScale(30), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Payment Confirmation</Text>
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={verticalScale(100)} // Adjusts scrolling height when the keyboard opens
                >
                    <View style={{ width: "98%", backgroundColor: COLORS.WHITE_OPACITY(0.3), alignSelf: 'center', borderRadius: scale(10), marginTop: verticalScale(40) }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: moderateScale(10), marginTop: verticalScale(10) }}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <MaterialIcons name="star" size={16} color="orange" />
                                <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>{`4`}</Text>
                            </View>
                            <View style={{ position: 'absolute', alignItems: 'center', width: '98%', top: verticalScale(-35), zIndex: 100, marginLeft: moderateScale(12) }}>

                                <View style={{ height: verticalScale(65), width: verticalScale(65), borderRadius: 100, borderWidth: 3, borderColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: verticalScale(59), width: verticalScale(59), borderRadius: 100, }} source={{ uri: data?.image?.trim() ? `${IMAGE_BASE_URL}/${data.image}` : `https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg` }} />
                                    {/* item?.image?.trim() ? `${IMAGE_BASE_URL}/${item.image}` : `https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg` */}
                                </View>
                                <Text style={{ color: 'white', fontSize: scale(14) }}>{data.name}</Text>
                                <Text numberOfLines={1} style={{ color: 'white', fontSize: scale(10) }}>{data.bio}</Text>
                            </View>
                            <TouchableOpacity style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <FontAwesome6 name="pen" size={14} color={COLORS.app_violete} /> */}
                                <Text style={{ fontSize: scale(9), color: COLORS.WHITE_OPACITY(0.8) }}>{`     500+\nConnections`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '95%',
                                overflow: 'hidden',
                                alignSelf: 'center',
                                marginTop: verticalScale(48)
                            }}
                        >
                            {Array.from({ length: numDots }).map((_, index) => (
                                <View
                                    key={index}
                                    style={{
                                        width: dotSize, // Dot width
                                        height: dotSize / 20, // Dot height
                                        backgroundColor: COLORS.GREY, // Dot color
                                        borderRadius: dotSize / 2, // Make it circular
                                    }}
                                />
                            ))}

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: moderateScale(14), paddingVertical: verticalScale(5) }}>
                            <Text style={{ color: 'white', fontSize: scale(11) }}>{data.description}</Text>
                        </View>

                    </View>
                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: verticalScale(10), backgroundColor: COLORS.WHITE_OPACITY(0.3), paddingVertical: verticalScale(12), borderRadius: scale(10) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.WHITE_OPACITY(0.8) }}>Type Of Service: </Text>
                            <Text style={{ color: COLORS.WHITE }}>{ServiceType}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10) }}>
                            <Text style={{ color: COLORS.WHITE_OPACITY(0.8) }}>Amount to be Paid: </Text>
                            <Text style={{ color: COLORS.WHITE }}>{getAmount(ServiceType)}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(10), paddingVertical: verticalScale(12), borderRadius: scale(10) }}>
                        <Text style={{ color: COLORS.WHITE }}>Enter Discount Code :</Text>

                        <View style={{ paddingHorizontal: moderateScale(10), marginTop: verticalScale(4), backgroundColor: COLORS.WHITE_OPACITY(0.3), paddingVertical: Platform.OS == 'ios' ? verticalScale(12) : verticalScale(3), borderRadius: scale(10) }}>
                            <TextInput value={discountCode} onChangeText={setDiscountCode} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Enter Code' />
                        </View>
                    </View>
                    <Text style={{ color: COLORS.WHITE, alignSelf: 'center' }}>{`Type 'free' for free chat access`}</Text>
                    <View style={{ marginTop: verticalScale(90) }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ color: COLORS.WHITE }}>Current Balance: </Text>
                            <Text style={{ color: COLORS.WHITE }} >{`₹10.00/-`} </Text>
                        </View>
                        <TouchableOpacity onPress={navigateToChat} activeOpacity={0.7} style={{ width: '100%', height: verticalScale(38), backgroundColor: COLORS.app_violete, alignItems: 'center', justifyContent: 'center', borderRadius: scale(10), marginTop: verticalScale(8) }}>
                            <Text style={{ fontSize: scale(15), fontWeight: '500', color: COLORS.WHITE }}>Add Balance</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

export default PaymentConfirmation