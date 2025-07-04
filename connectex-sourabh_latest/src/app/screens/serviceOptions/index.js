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
    Alert,
} from 'react-native';
import React from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ZegoUIKitPrebuiltCallService, ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const ServiceOptions = () => {
    const route = useRoute();
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();
    const { data, ServiceType,source } = route.params;
    console.log('source======>>>>', source);
    console.log('ServiceType======>>>>', ServiceType);
    const showMessage = () => {
        Toast.show('not performable');
    }

    const sendCallInvitation = (isVideoCall, userID, userName) => {
        console.log('isvideocall----->>>>', isVideoCall);
        console.log('userID----->>>>', userID);
        console.log('userName----->>>>', userName);

        console.log('ZegoUIKitPrebuiltCallService------------->>>>>>', ZegoUIKitPrebuiltCallService);
        if (!userID || !userName) {
            Alert.alert('Error', 'Please enter both User ID and User Name!');
            return;
        }

        // if (!ZegoUIKitPrebuiltCallService) {
        //     console.error('Zego SDK is not initialized yet!');
        //     Alert.alert('Error', 'Zego SDK is not initialized yet!');
        //     return;
        // }

        ZegoUIKitPrebuiltCallService.sendCallInvitation({
            invitees: [{ userID, userName }],
            type: isVideoCall ? 1 : 2, // 1 for video call, 2 for audio call
            resourceID: 'ConnectEx_ai', // Replace with your actual resource ID
        })
            .then(() => {
                Alert.alert(
                    'Success',
                    isVideoCall ? 'Video call invitation sent!' : 'Voice call invitation sent!'
                );
            })
            .catch((error) => {
                console.error('Error sending call invitation:', error);
                Alert.alert('Error', 'Failed to send call invitation. Please try again.');
            });
    };



    const handleServiceTypeAction = (serviceType) => {
        switch (serviceType) {
            case 'Call':
                console.log('Performing action for Call...');
                // Add logic for "Call"
                sendCallInvitation(false, data.email, data.name);
                break;

            case 'Message':
                console.log('Performing action for Message...');
                navigation.navigate('PaymentConfirmation', { data: data, ServiceType: ServiceType ,source:source})
                break;

            case 'Video Call':
                console.log('Performing action for Video Call...');
                // Add logic for "Video Call"
                sendCallInvitation(true, data.email, data.name); // For video call
                break;

            default:
                console.log('Invalid ServiceType!');
            // Add fallback logic if needed
        }
    };

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
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Select Your Option</Text>
                </View>
                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), flexDirection: 'row', justifyContent: 'space-between', padding: verticalScale(13), borderRadius: scale(10), marginTop: verticalScale(18) }}>
                    <View >
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>Konnect Now</Text>
                        <Text style={{ color: COLORS.WHITE_OPACITY(0.8), fontSize: scale(10) }}>{`Reach out to ${data.name} right now.`}</Text>
                    </View>
                    <View>

                    </View>
                    <TouchableOpacity
                        onPress={() => handleServiceTypeAction(ServiceType)}
                        style={[
                            {
                                // paddingHorizontal: moderateScale(25),
                                // paddingVertical: verticalScale(5),
                                borderRadius: scale(10),
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            ServiceType === 'Call' ? { backgroundColor: COLORS.green } :
                                ServiceType === 'Message' ? { backgroundColor: COLORS.blue } :
                                    ServiceType === 'Video Call' ? { backgroundColor: COLORS.red } :
                                        { backgroundColor: COLORS.app_violete }, // Default style
                        ]}
                    >
                        <Text style={{ color: COLORS.WHITE }}>
                            {ServiceType === 'Call'
                                ? <ZegoSendCallInvitationButton

                                    invitees={[{ userID: data.email, userName: data.basicInfo.name }]}
                                    isVideoCall={false}
                                    resourceID={"zego_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
                                />
                                : ServiceType === 'Message'
                                    ? 'Send Message'
                                    : ServiceType === 'Video Call'
                                        ? <ZegoSendCallInvitationButton

                                            invitees={[{ userID: data.email, userName: data.basicInfo.name  }]}
                                            isVideoCall={true}
                                            resourceID={"zego_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
                                        />
                                        : 'Select'} {/* Default fallback */}
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), flexDirection: 'row', justifyContent: 'space-between', padding: verticalScale(13), borderRadius: scale(10), marginTop: verticalScale(12) }}>
                    <View >
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>Book a slot</Text>
                        <Text style={{ color: COLORS.WHITE_OPACITY(0.8), fontSize: scale(10) }}>{`Book and Block ${data.name} Calender.`}</Text>
                    </View>
                    <TouchableOpacity onPress={showMessage} style={{ backgroundColor: 'darkgrey', paddingHorizontal: moderateScale(25), paddingVertical: verticalScale(5), borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.WHITE }}>Select</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), flexDirection: 'row', justifyContent: 'space-between', padding: verticalScale(13), borderRadius: scale(10), marginTop: verticalScale(12) }}>
                    <View style={{ width: moderateScale(220) }} >
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>Start Chat</Text>
                        <Text style={{ color: COLORS.WHITE_OPACITY(0.8), fontSize: scale(10) }}>{`Initiate a chat with ${data.name} to interact with them.`}</Text>
                    </View>
                    <TouchableOpacity onPress={showMessage} style={{ backgroundColor: 'darkgrey', paddingHorizontal: moderateScale(25), borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.WHITE }}>Select</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}

export default ServiceOptions