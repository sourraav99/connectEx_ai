import {
  View,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { VIDEOS } from '../../../assets/videos';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { COLORS } from '../../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import Toast from "react-native-simple-toast";
import { verifyEmailAction } from '../../../redux/action';
import AsyncStorage from "@react-native-async-storage/async-storage";


const yourAppID = 1091612176; // Replace with your app ID from ZEGOCLOUD
const yourAppSign = "81706b86bcb8ebda3e28e4c3aa68eacb60c3452d802c5bcc7339de20f153506c"; // Replace with your app Sign from ZEGOCLOUD




const AccountVerification = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const route = useRoute();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState(60)
  const { payload, userData } = route.params; // Access email and name from route.params


  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer); // Clean up the timer
  }, [timeLeft]);

  const onNewUserLogin = async (userID, userName) => {
    try {
      console.log('Starting Zego Call Service...');
      console.log('AppID:', yourAppID);
      console.log('AppSign:', yourAppSign);
      console.log('UserID:', userID);
      console.log('UserName:', userName);

      // Initialize ZegoUIKitPrebuiltCallService
      await ZegoUIKitPrebuiltCallService.init(
        yourAppID,
        yourAppSign,
        userID,
        userName,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: 'incoming.mp3',
            outgoingCallFileName: 'outgoing.wav',
          },
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
        }
      );

      Toast.show('Signup successful', Toast.SHORT);
      // setLoading(false);
      // navigation.navigate('Home');
      // navigation.dispatch(
      //     CommonActions.reset({
      //         index: 0, // Set the index of the new navigation stack
      //         routes: [{ name: 'Home' }],
      //     })
      // );
    } catch (error) {
      console.error('Error initializing Zego service:', error);
      // setLoading(false);
      Toast.show('Failed to start Zego Call Service. Please try again.', Toast.SHORT);
    }
  };



  const handleResendCode = () => {
    setTimeLeft(60); // Reset timer to 60 seconds
  };

  const navigateToOtpVerification = () => {
    navigation.navigate('AccountVerification')
  }

  const handleVerification = async () => {


    // return console.log('payload----->>', payload);

    if (otp.length !== 4) {
      Toast.show('Please enter a valid 4-digit OTP', Toast.SHORT);
      return;
    }

    const verifyData = {
      email: payload.email,
      otp: otp,
      // authMethod: 'email'
    };

    dispatch(verifyEmailAction(verifyData, async (response) => {
      console.log(response.data);

      if (response?.data?.success) {

        // console.log('token=======>>>>>>>>', response?.data?.token);
        // console.log('userData=======>>>>>>>>', userData);
        // Save token and userData to AsyncStorage
        try {
          await AsyncStorage.setItem('token', response?.data?.token);

          await AsyncStorage.setItem('userData', JSON.stringify(userData));

          onNewUserLogin(payload.email, payload.name)

          dispatch({
            type: `SET_LOGGED_IN`,
            payload: true
          })
          Toast.show('Account verified successfully!', Toast.SHORT);

        } catch (error) {
          Toast.show(response?.data?.message, Toast.SHORT);
          console.error('Error saving to AsyncStorage:', error);
        }
      } else {
        // Show error message
        console.log(response?.data);

        Toast.show(response?.data?.message || 'Verification failed. Please try again.', Toast.SHORT);
      }
    }));
  };


  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <View style={{ height: safeAreaInsets.top }} />

      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
        locations={[0, 0.2, 0.5, 0.8, 1]}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: verticalScale(600),
        }}
      />

      {/* Keyboard Handling */}
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={verticalScale(100)} // Adjusts scrolling height when the keyboard opens
      >
        <View style={{ width: '97%', alignSelf: 'center', flex: 1 }}>
          <Image source={IMAGES.verificationPNG} style={{ width: '100%', height: verticalScale(200), marginTop: verticalScale(10), }} resizeMode='contain' />
          <Text style={{ fontSize: scale(24), color: COLORS.app_violete, fontWeight: '600', alignSelf: 'center', marginTop: verticalScale(18), }}>Verify Account</Text>
          <Text style={{ fontSize: scale(13), color: COLORS.WHITE, alignSelf: 'center', marginTop: verticalScale(10), }}>
            {`Code has been sent to `}
            <Text style={{ color: COLORS.app_violete, }}>{`${payload.email}`}</Text>
            {`. \nEnter the code to verify your account.`}
          </Text>
          <Text style={{ color: COLORS.WHITE, fontSize: scale(12), marginTop: verticalScale(20), }}>Enter Code</Text>
          <View
            style={{
              height: verticalScale(40),
              backgroundColor: COLORS.WHITE_OPACITY(0.5),
              justifyContent: 'center',
              borderRadius: moderateScale(5),

            }}
          >
            <TextInput
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
              style={{ paddingHorizontal: moderateScale(10), }}
              placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
              placeholder="Enter 4 digit code"
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(10) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: scale(13), color: COLORS.WHITE }}>
                {`Didn't receive the code?`}
              </Text>
              <TouchableOpacity
                onPress={handleResendCode}
              >
                <Text style={{ color: COLORS.app_violete, fontSize: scale(13), marginLeft: scale(5) }}>
                  {`Resend code`}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: COLORS.WHITE, fontSize: scale(13), marginTop: verticalScale(5) }}>
              {`Resend code in ${timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : '00:00'}`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleVerification}
            style={{
              height: verticalScale(37),
              backgroundColor: COLORS.app_violete,
              justifyContent: 'center',
              borderRadius: moderateScale(5),
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: verticalScale(30)

            }}
          >
            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: scale(13) }}>Verify Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <View style={{ height: safeAreaInsets.bottom }} />
    </ImageBackground>
  );
};

export default AccountVerification

