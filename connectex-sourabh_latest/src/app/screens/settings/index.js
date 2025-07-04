import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Modal } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../../../assets/images'
import { COLORS } from '../../../assets/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch } from 'react-redux'


const Settings = () => {
    const dispatch = useDispatch()
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Modal visibility state

    const accountSettings = [
        {
            id: 1,
            title: 'Add / Update bank details',
            iconName: 'bank',
            type: FontAwesome,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 2,
            title: 'Withdraw money',
            iconName: 'money-bills',
            type: FontAwesome6,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 3,
            title: 'Add money',
            iconName: 'wallet',
            type: Entypo,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 4,
            title: 'Discount codes',
            iconName: 'discount',
            type: MaterialIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 5,
            title: 'Refrral code ',
            iconName: 'paste',
            type: FontAwesome,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 6,
            title: 'Profile visits',
            iconName: 'player-settings',
            type: Fontisto,
            size: scale(17),
            color: COLORS.cyan,
        },
    ];

    const myConnect = [
        {
            id: 1,
            title: 'Create a service card',
            iconName: 'idcard',
            type: AntDesign,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 2,
            title: 'My services',
            iconName: 'tools',
            type: MaterialCommunityIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 3,
            title: 'Upcoming sessions',
            iconName: 'comment-video',
            type: Foundation,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 4,
            title: 'Manage availability',
            iconName: 'calendar-edit',
            type: MaterialCommunityIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
    ];

    const myLibrary = [
        {
            id: 1,
            title: 'recorded sessions',
            iconName: 'file-video',
            type: FontAwesome6,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 2,
            title: 'recorded shorts',
            iconName: 'desktop-mac-dashboard',
            type: MaterialCommunityIcons,
            size: scale(17),
            color: COLORS.cyan,
        }
    ];

    const privacy = [
        {
            id: 1,
            title: 'Data privacy',
            iconName: 'private-connectivity',
            type: MaterialIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 2,
            title: 'Terms and Condition',
            iconName: 'file-text-o',
            type: FontAwesome,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 3,
            title: 'Payment policy',
            iconName: 'attach-money',
            type: MaterialIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 4,
            title: 'Blocked users',
            iconName: 'block',
            type: Entypo,
            size: scale(17),
            color: COLORS.cyan,
        },
    ];

    const helpCenter = [
        {
            id: 1,
            title: `FAQ's`,
            iconName: 'frequently-asked-questions',
            type: MaterialCommunityIcons,
            size: scale(17),
            color: COLORS.cyan,
        },
        {
            id: 2,
            title: 'Report an issue',
            iconName: 'report',
            type: Octicons,
            size: scale(17),
            color: COLORS.cyan,
        }
    ];

    const handleAction = (title) => {
        switch (title) {
            case 'Add / Update bank details':
                // Navigate to bank details screen
                navigation.navigate('AddBankDetails');
                break;
            case 'Withdraw money':
                // Navigate to withdraw money screen
                navigation.navigate('WithdrawMoney');
                break;
            case 'Add money':
                // Navigate to add money screen
                navigation.navigate('AddMoney');
                break;
            case 'Discount codes':
                // Navigate to discount codes screen
                console.warn('DiscountCodesScreen');
                break;
            case 'Referral code':
                // Perform referral code action
                console.warn('ReferralCodeScreen');
                break;
            case 'Profile visits':
                // Navigate to profile visits screen
                console.warn('ProfileVisitsScreen');
                break;
            case 'Create a service card':
                console.warn('ServiceCardScreen');
                break;
            case 'Manage availability':
                console.warn('AvailabilityScreen');
                break;
            // Add more cases as needed
            default:
                console.log(`No action defined for ${title}`);
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true); // Show the modal

        try {

            // Remove user data from AsyncStorage
            await AsyncStorage.removeItem('userData',);
            await AsyncStorage.removeItem('token',);

            // Dispatch the logout action
            dispatch({
                type: 'SET_LOGGED_OUT', // Replace with the correct action type
            });
            console.log('User successfully logged out');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoggingOut(false); // Hide the modal after the process
            return ZegoUIKitPrebuiltCallService.uninit()

        }
    };

    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
                <View style={{ height: safeAreaInsets.top }} />
                <StatusBar backgroundColor={COLORS.BLACK} />

                {/* Modal for Loading or Info */}
                {/* <Modal
                    transparent={true}
                    visible={isModalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.BLACK_OPACITY(0.5),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '80%',
                                backgroundColor: COLORS.WHITE,
                                padding: scale(20),
                                borderRadius: moderateScale(10),
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: scale(16), color: COLORS.BLACK, marginBottom: verticalScale(10) }}>
                                Please wait while we prepare your account...
                            </Text>
                            <ActivityIndicator size="large" color={COLORS.cyan} />
                            <TouchableOpacity
                                style={{
                                    marginTop: verticalScale(15),
                                    paddingVertical: verticalScale(10),
                                    paddingHorizontal: moderateScale(20),
                                    backgroundColor: COLORS.cyan,
                                    borderRadius: scale(5),
                                }}
                                onPress={handleModalDismiss}
                            >
                                <Text style={{ color: COLORS.WHITE, fontSize: scale(14) }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
                {/* Search Header */}
                <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: verticalScale(30), width: verticalScale(30), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Settings</Text>
                </View>


                <KeyboardAwareScrollView>
                    <View
                        style={{
                            alignSelf: 'center', width: '98%', backgroundColor: COLORS.WHITE_OPACITY(0.2), borderRadius: 10, overflow: 'hidden', marginTop: verticalScale(30)
                        }}
                    >
                        <View style={{ backgroundColor: COLORS.cyan, alignSelf: 'flex-start', padding: scale(5), }}>
                            <Text style={{ color: COLORS.BLACK }}>Account settings</Text>
                        </View>
                        {accountSettings.map((icon) => {
                            const IconComponent = icon.type; // Dynamically use the icon type
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={icon.id}
                                    onPress={() => { handleAction(icon.title) }}
                                    style={{
                                        // backgroundColor: COLORS.WHITE_OPACITY(0.3), // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                                        // borderRadius: 10,
                                        flexDirection: 'row',
                                        margin: moderateScale(2), // Add spacing between cards

                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // height: verticalScale(60),
                                        width: '100%',
                                        paddingHorizontal: moderateScale(7),
                                        paddingVertical: verticalScale(10)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComponent name={icon.iconName} size={icon.size} color={icon.color} />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: scale(11),
                                                color: COLORS.WHITE,
                                            }}
                                        >
                                            {icon.title.charAt(0).toUpperCase() + icon.title.slice(1)}
                                        </Text>
                                    </View>

                                    <Entypo name={'chevron-thin-right'} size={scale(12)} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            );
                        })}

                    </View>

                    <View
                        style={{
                            alignSelf: 'center', width: '98%', backgroundColor: COLORS.WHITE_OPACITY(0.2), borderRadius: 10, overflow: 'hidden', marginTop: verticalScale(10)
                        }}
                    >
                        <View style={{ backgroundColor: COLORS.cyan, alignSelf: 'flex-start', padding: scale(5), }}>
                            <Text style={{ color: COLORS.BLACK }}>My connect</Text>
                        </View>
                        {myConnect.map((icon) => {
                            const IconComponent = icon.type; // Dynamically use the icon type
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={icon.id}
                                    style={{
                                        // backgroundColor: COLORS.WHITE_OPACITY(0.3), // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                                        // borderRadius: 10,
                                        flexDirection: 'row',
                                        margin: moderateScale(2), // Add spacing between cards

                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // height: verticalScale(60),
                                        width: '100%',
                                        paddingHorizontal: moderateScale(7),
                                        paddingVertical: verticalScale(10)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComponent name={icon.iconName} size={icon.size} color={icon.color} />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: scale(11),
                                                color: COLORS.WHITE,
                                            }}
                                        >
                                            {icon.title.charAt(0).toUpperCase() + icon.title.slice(1)}
                                        </Text>
                                    </View>

                                    <Entypo name={'chevron-thin-right'} size={scale(12)} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <View
                        style={{
                            alignSelf: 'center', width: '98%', backgroundColor: COLORS.WHITE_OPACITY(0.2), borderRadius: 10, overflow: 'hidden', marginTop: verticalScale(10)
                        }}
                    >
                        <View style={{ backgroundColor: COLORS.cyan, alignSelf: 'flex-start', padding: scale(5), }}>
                            <Text style={{ color: COLORS.BLACK }}>My library</Text>
                        </View>
                        {myLibrary.map((icon) => {
                            const IconComponent = icon.type; // Dynamically use the icon type
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={icon.id}
                                    style={{
                                        // backgroundColor: COLORS.WHITE_OPACITY(0.3), // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                                        // borderRadius: 10,
                                        flexDirection: 'row',
                                        margin: moderateScale(2), // Add spacing between cards

                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // height: verticalScale(60),
                                        width: '100%',
                                        paddingHorizontal: moderateScale(7),
                                        paddingVertical: verticalScale(10)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComponent name={icon.iconName} size={icon.size} color={icon.color} />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: scale(11),
                                                color: COLORS.WHITE,
                                            }}
                                        >
                                            {icon.title.charAt(0).toUpperCase() + icon.title.slice(1)}
                                        </Text>
                                    </View>

                                    <Entypo name={'chevron-thin-right'} size={scale(12)} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <View
                        style={{
                            alignSelf: 'center', width: '98%', backgroundColor: COLORS.WHITE_OPACITY(0.2), borderRadius: 10, overflow: 'hidden', marginTop: verticalScale(10)
                        }}
                    >
                        <View style={{ backgroundColor: COLORS.cyan, alignSelf: 'flex-start', padding: scale(5), }}>
                            <Text style={{ color: COLORS.BLACK }}>Privacy</Text>
                        </View>
                        {privacy.map((icon) => {
                            const IconComponent = icon.type; // Dynamically use the icon type
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={icon.id}
                                    style={{
                                        // backgroundColor: COLORS.WHITE_OPACITY(0.3), // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                                        // borderRadius: 10,
                                        flexDirection: 'row',
                                        margin: moderateScale(2), // Add spacing between cards

                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // height: verticalScale(60),
                                        width: '100%',
                                        paddingHorizontal: moderateScale(7),
                                        paddingVertical: verticalScale(10)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComponent name={icon.iconName} size={icon.size} color={icon.color} />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: scale(11),
                                                color: COLORS.WHITE,
                                            }}
                                        >
                                            {icon.title.charAt(0).toUpperCase() + icon.title.slice(1)}
                                        </Text>
                                    </View>

                                    <Entypo name={'chevron-thin-right'} size={scale(12)} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <View
                        style={{
                            alignSelf: 'center', width: '98%', backgroundColor: COLORS.WHITE_OPACITY(0.2), borderRadius: 10, overflow: 'hidden', marginTop: verticalScale(10)
                        }}
                    >
                        <View style={{ backgroundColor: COLORS.cyan, alignSelf: 'flex-start', padding: scale(5), }}>
                            <Text style={{ color: COLORS.BLACK }}>Help Center</Text>
                        </View>
                        {helpCenter.map((icon) => {
                            const IconComponent = icon.type; // Dynamically use the icon type
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={icon.id}
                                    style={{
                                        // backgroundColor: COLORS.WHITE_OPACITY(0.3), // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                                        // borderRadius: 10,
                                        flexDirection: 'row',
                                        margin: moderateScale(2), // Add spacing between cards

                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        // height: verticalScale(60),
                                        width: '100%',
                                        paddingHorizontal: moderateScale(7),
                                        paddingVertical: verticalScale(10)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComponent name={icon.iconName} size={icon.size} color={icon.color} />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: scale(11),
                                                color: COLORS.WHITE,
                                            }}
                                        >
                                            {icon.title.charAt(0).toUpperCase() + icon.title.slice(1)}
                                        </Text>
                                    </View>

                                    <Entypo name={'chevron-thin-right'} size={scale(12)} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <TouchableOpacity onPress={handleLogout} style={{ width: '95%', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(15), paddingVertical: verticalScale(10), alignSelf: 'center', borderRadius: 10 }}>
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(14), fontWeight: '500' }}>Logout</Text>
                    </TouchableOpacity>
                    <View style={{ height: verticalScale(50) }}></View>
                </KeyboardAwareScrollView>
                <Modal transparent={true} visible={isLoggingOut}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '80%',
                                padding: scale(20),
                                // backgroundColor: COLORS.WHITE,
                                borderRadius: 10,
                                alignItems: 'center',
                            }}
                        >
                            <ActivityIndicator size='small' color={COLORS.WHITE} />
                            <Text
                                style={{
                                    marginTop: scale(10),
                                    fontSize: scale(16),
                                    color: COLORS.BLACK,
                                }}
                            >
                                Logging out...
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    )
}

export default Settings