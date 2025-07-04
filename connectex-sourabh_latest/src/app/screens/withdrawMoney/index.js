import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Image, Platform, TextInput } from 'react-native'
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

const WithdrawMoney = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');

    // const isFormValid = ;

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
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Withdraw Money</Text>
                </View>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Image source={IMAGES.withdrawmoney} resizeMode="contain" style={{ height: verticalScale(90), width: "100%", tintColor: COLORS.cyan, alignSelf: 'center', marginTop: verticalScale(30) }} />
                    <Text style={{ color: COLORS.WHITE_OPACITY(0.5), alignSelf: 'center', marginTop: verticalScale(13) }}>Enter amount to withdraw money</Text>
                    <View style={{ flexDirection: 'row', width: '50%', alignSelf: 'center', alignItems: 'center', backgroundColor: COLORS.cyanOpacity(0.1), height: Platform.OS === 'ios' ? verticalScale(40) : undefined, borderRadius: 8, borderBottomWidth: 0.5, borderBottomColor: COLORS.cyan, marginTop: verticalScale(45), }}>
                        <View style={{ width: moderateScale(20), alignItems: 'flex-end' }}>
                            <FontAwesome name={'rupee'} size={20} color={COLORS.WHITE} />
                        </View>
                        <TextInput style={{ flex: 1, marginLeft: moderateScale(5), color: COLORS.WHITE, fontSize: scale(18) }} keyboardType='numeric' placeholder='Enter Amount' placeholderTextColor={COLORS.GREY} />
                    </View>
                    <Text style={{ color: COLORS.WHITE, alignSelf: 'center', marginTop: verticalScale(13) }}>{`Withdrawable amount: ₹ 10,000 `}</Text>
                    <Text style={{ color: COLORS.WHITE, alignSelf: 'center', marginTop: verticalScale(13) }}>{`Available balance: ₹ 10,000 `}</Text>

                    <View style={{ backgroundColor: COLORS.cyanOpacity(0.1), borderRadius: 8, overflow: 'hidden', marginTop: verticalScale(30) }}>
                        <View style={{ backgroundColor: COLORS.cyanOpacity(0.3), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(10), alignItems: 'center', paddingVertical: verticalScale(7) }}>
                            <Text style={{ color: COLORS.WHITE }}>Your bank details</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: moderateScale(10), paddingVertical: verticalScale(2), borderRadius: 5, borderColor: COLORS.WHITE }}>
                                <Text style={{ color: COLORS.WHITE }}>Add</Text>
                                <AntDesign name="plus" size={15} color={COLORS.WHITE} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', paddingVertical: verticalScale(18) }}>
                            <Image source={IMAGES.Bank} style={{ height: verticalScale(60), width: verticalScale(60), tintColor: COLORS.cyan, alignSelf: 'center', }} />
                            <Text style={{ color: COLORS.GREY, fontSize: scale(11), marginTop: verticalScale(3) }}>Add your bank details to get started</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: COLORS.cyanOpacity(0.6), alignItems: 'center', justifyContent: 'center', height: verticalScale(42), marginTop: verticalScale(35), borderRadius: scale(10) }}>
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(14), fontWeight: '700' }}>Confirm withdraw</Text>

                    </TouchableOpacity>
                    <View style={{ height: verticalScale(50), marginTop: 20 }}></View>

                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}

export default WithdrawMoney
