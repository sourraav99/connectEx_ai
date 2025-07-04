import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Image, Platform } from 'react-native'
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
import { TextInput } from 'react-native-paper'

const AddBankDetails = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const isFormValid =
        accountHolderName.trim() !== "" &&
        accountNumber.trim() !== "" &&
        confirmAccountNumber.trim() !== "" &&
        ifscCode.trim() !== "" &&
        panNumber.trim() !== "" //&&
    // accountNumber === confirmAccountNumber;

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
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Add bank details</Text>
                </View>
                <KeyboardAwareScrollView>
                    <Image source={IMAGES.Bank} style={{ height: verticalScale(70), width: verticalScale(70), tintColor: COLORS.cyan, alignSelf: 'center', marginTop: verticalScale(30) }} />
                    <View style={{ marginTop: verticalScale(20) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>Account holder's name</Text>
                            {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', }} >

                            <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                <TextInput style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, backgroundColor: 'transparent' }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter your name " value={accountHolderName} onChangeText={setAccountHolderName} />
                            </View>

                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>Account number</Text>
                            {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', }} >

                            <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                <TextInput style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, backgroundColor: 'transparent' }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter your account number " value={accountNumber} onChangeText={setAccountNumber} />
                            </View>

                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}> Confirm account number</Text>
                            {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', }} >

                            <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                <TextInput style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, backgroundColor: 'transparent' }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter your account number " value={confirmAccountNumber} onChangeText={setConfirmAccountNumber} />
                            </View>

                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}> IFSC code</Text>
                            {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', }} >

                            <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                <TextInput style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, backgroundColor: 'transparent' }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter your IFSC code " value={ifscCode} onChangeText={setIfscCode} />
                            </View>

                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}> PAN number</Text>
                            {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', }} >

                            <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                <TextInput style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, backgroundColor: 'transparent' }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter your PAN number " value={panNumber} onChangeText={setPanNumber} />
                            </View>

                        </View>
                        <Text style={{ color: COLORS.WHITE_OPACITY(0.7), marginTop: verticalScale(5), fontSize: scale(11) }}>Note: Your bank account must be linked with your PAN</Text>
                    </View>
                    {/* <View style={{ height: verticalScale(50), backgroundColor: 'red', marginTop: 20 }}></View> */}
                    <TouchableOpacity disabled={!isFormValid} style={{ backgroundColor: !isFormValid ? COLORS.GREY : COLORS.cyanOpacity(0.5), alignItems: 'center', justifyContent: 'center', height: verticalScale(46), marginTop: verticalScale(35), borderRadius: scale(10) }}>
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(14), fontWeight: '700' }}>Update bank details</Text>
                    </TouchableOpacity>
                    <View style={{ height: verticalScale(50), marginTop: 20 }}></View>

                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

export default AddBankDetails
