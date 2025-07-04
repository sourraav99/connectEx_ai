import {
  View,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { IMAGES } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { CommonActions, useNavigation } from '@react-navigation/native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import firebase from "@react-native-firebase/app"
import firestore from "@react-native-firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/action';
// import { setLoggedIn } from '../../../redux/action';

const yourAppID = 1091612176; // Replace with your app ID from ZEGOCLOUD
const yourAppSign = "81706b86bcb8ebda3e28e4c3aa68eacb60c3452d802c5bcc7339de20f153506c"; // Replace with your app Sign from ZEGOCLOUD
// const userID = "8700172067"
// const userName = "sourabh"




const Login = () => {
  const safeAreaInsets = useSafeAreaInsets();
  // const [userID, setUserID] = useState('');
  // const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // For toggling password visibility
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch  

  const storeUserData = async (email, name, firebaeUserId) => {
    try {
      const userData = JSON.stringify({ email, name, firebaeUserId });
      await AsyncStorage.setItem('userData', userData); // Key: 'userData'
      console.log('User data stored successfully:', userData);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const initializeVideoAndAudioCall = async (userID, userName, firebaeUserId) => {

    if (Platform.OS === 'ios') {
      console.log('Skipping Zego Call Service initialization on iOS');
      await storeUserData(userID, userName, firebaeUserId);
      dispatch({
        type: `SET_LOGGED_IN`,
        payload: true
      })
      setLoading(false);
      // dispatch(setLoggedIn({ email: userID, name: userName, firebaeUserId })); // Dispatch the action to update Redux state
      Toast.show('Login Successful', Toast.SHORT);
      return;
    }

    try {
      console.log('Starting Zego Call Service...');
      console.log('AppID:', yourAppID);
      console.log('AppSign:', yourAppSign);
      console.log('UserID:', userID);
      console.log('UserName:', userName);
      console.log('FirebaeUserId:', firebaeUserId);
      console.log('platform:', Platform.OS);

      // Initialize ZegoUIKitPrebuiltCallService (Android only)
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
           notifyWhenAppRunningInBackgroundOrQuit: true,
        }
      ).then(()=>{
        ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
          message: 'We need your consent for the following permissions in order to use the offline call function properly',
          allow: 'Allow',
          deny: 'Deny',
        });
      });

      await storeUserData(userID, userName, firebaeUserId);


      // dispatch(loginAction({ email: email, password: password })); // Dispatch the action to update Redux state
      // navigateToHome();
      dispatch({
        type: `SET_LOGGED_IN`,
        payload: true
      })
      setLoading(false);
      Toast.show('Login Successful', Toast.SHORT);
    } catch (error) {
      console.error('Error initializing Zego service:', error);
      setLoading(false);
      Toast.show('Failed to start Zego Call Service. Please try again.', Toast.SHORT);
    }
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Toast.show('Please enter your email', Toast.SHORT);
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Toast.show('Please enter a valid email address', Toast.SHORT);

      return;
    }

    if (email.length > 255) {
      Toast.show('Email is too long', Toast.SHORT);
      return;
    }

    // Password validation
    if (!password.trim()) {
      Toast.show('Please enter your Password ', Toast.SHORT);
      return;
    }

    if (password.length < 6) {
      Toast.show('Password must be at least 6 characters long', Toast.SHORT);
      return;
    }

    if (password.length > 20) {
      Toast.show('Password cannot exceed 20 characters', Toast.SHORT);
      return;
    }

    Keyboard.dismiss()
    setLoading(true);
    const payload = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    dispatch(loginAction(payload, (response) => {
      // console.log("response=====>data", response.data);
      if (!response?.data?.success) {
        setLoading(false);
        Toast.show(response?.data?.message || 'Login failed. Please try again Later.', Toast.SHORT);

        return;

      } else {
        AsyncStorage.setItem('token', response?.data?.token).then(() => {
          console.log('Token stored successfully');
        })

        firestore()
          .collection('users')
          .where('email', '==', email.trim().toLowerCase(),)
          .get()
          .then((querySnapshot) => {
            setLoading(false);
            if (querySnapshot.empty) {
              Toast.show('No user exists with this email', Toast.SHORT);
              return;
            }

            // Fetch user data
            const userData = querySnapshot.docs[0].data();

            if (userData.password === password) {
              // Successful login
              const userName = userData.name;
              const userID = email.trim().toLowerCase();
              const firebaeUserId = userData.userId
              // Start ZegoCallService
              initializeVideoAndAudioCall(userID, userName, firebaeUserId)
            } else {
              Toast.show('Invalid password', Toast.SHORT);
            }
          })
          .catch((error) => {
            console.error('Error checking user:', error);
            setLoading(false);
            Toast.show('Something went wrong. Please try again.', Toast.LONG);
          });

      }

    }));


  };


  const _pressLogin = () => {
    if (!email || !password) {
      showToast('All fields are required')
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long');
      return;
    }
    // if (password !== confirmPassword) {
    //   showToast('Passwords do not match');
    //   return;
    // }
    const payload = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    setLoading(true)
    dispatch(loginAction(payload, (response) => {
      console.log("response=====>data", response.data);

    }));
    setLoading(false)
  };

  const loginWithFacebook = () => {
    // const userID = generateRandomUserId();
    // const userName = generateRandomUsername();
    // onUserLogin();
    // Toast.show('right now we cant perform this action ', Toast.SHORT);
    navigation.navigate('Home');
  };

  const loginWithGoogle = () => {
    // const userID = createdUserId; // Replace with the actual user ID
    // const userName = createdUsername; // Replace with the actual user Name
    // onUserLogin(userID, userName);
    Toast.show('right now we cant perform this action', Toast.SHORT);
    // navigation.navigate('Home')
  }

  const loginWithApple = () => {
    // const userID = createdUserId; // Replace with the actual user ID
    // const userName = createdUsername; // Replace with the actual user Name
    // onUserLogin(userID, userName);
    Toast.show('right now we cant perform this action', Toast.SHORT);
    // navigation.navigate('Home')
  }

  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <View style={{ height: safeAreaInsets.top }} />
      <Image source={IMAGES.loginPNG} style={{ width: '100%', height: verticalScale(220), marginTop: verticalScale(10), top: safeAreaInsets.top, position: 'absolute' }} resizeMode='contain' />
      {/* <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
        locations={[0, 0.2, 0.5, 0.8, 1]}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: verticalScale(600),
        }}
      /> */}

      {/* Keyboard Handling */}
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={verticalScale(100)} // Adjusts scrolling height when the keyboard opens
      >
        <View style={{ width: '97%', alignSelf: 'center', flex: 1, }}>
          <View style={{ marginTop: verticalScale(250) }}>
            <Text style={{ color: COLORS.WHITE, fontSize: scale(12) }}>Email</Text>
            <View
              style={{
                height: verticalScale(40),
                backgroundColor: COLORS.WHITE_OPACITY(0.5),
                justifyContent: 'center',
                borderRadius: moderateScale(5),
              }}
            >
              <TextInput
                style={{ paddingHorizontal: moderateScale(10), }}
                placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                // placeholder="Enter your email"
                placeholder="Enter your email "

                // keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              // value={userID}
              // onChangeText={setUserID}
              />
            </View>

            <Text style={{ color: COLORS.WHITE, marginTop: verticalScale(14), fontSize: scale(12) }}>Password</Text>
            <View
              style={{
                height: verticalScale(40),
                backgroundColor: COLORS.WHITE_OPACITY(0.5),
                justifyContent: 'space-between',
                borderRadius: moderateScale(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                secureTextEntry={!isPasswordVisible}
                onChangeText={setPassword}

                // value={userName}
                // onChangeText={setUserName}
                style={{ paddingHorizontal: moderateScale(10), alignItems: 'center', flex: 1 }}
                placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                placeholder="Enter your password"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={{ paddingRight: moderateScale(10), paddingLeft: moderateScale(10) }}
              >
                <Entypo
                  name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                  size={22}
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              // onPress={validateEmailAndNavigate}
              onPress={handleLogin}
              // onPress={loginWithFirebase}
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
              <Text style={{ color: COLORS.WHITE, fontWeight: '500', fontSize: scale(13) }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => { navigation.navigate('Signup') }}
              style={{
                height: verticalScale(37),
                backgroundColor: COLORS.app_violete,
                justifyContent: 'center',
                borderRadius: moderateScale(5),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: verticalScale(7)
              }}
            >
              <Text style={{ color: COLORS.WHITE, fontWeight: '500', fontSize: scale(13) }}>Signup</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: verticalScale(15) }}>
              <View style={{ width: moderateScale(100), height: verticalScale(2), backgroundColor: COLORS.WHITE, borderRadius: scale(5) }} />
              <Text style={{ color: COLORS.WHITE, paddingHorizontal: moderateScale(10) }}>Or login with</Text>
              <View style={{ width: moderateScale(100), height: verticalScale(2), backgroundColor: COLORS.WHITE, borderRadius: scale(5) }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(20) }}>
              <TouchableOpacity onPress={loginWithFacebook} activeOpacity={0.7} style={{ backgroundColor: COLORS.WHITE_OPACITY(0.7), padding: moderateScale(10), borderRadius: 100, marginHorizontal: moderateScale(10) }}>
                <Image style={{ height: verticalScale(23), width: verticalScale(23) }} source={IMAGES.fb} />
              </TouchableOpacity>
              <TouchableOpacity onPress={loginWithGoogle} activeOpacity={0.7} style={{ backgroundColor: COLORS.WHITE_OPACITY(0.7), padding: moderateScale(10), borderRadius: 100, marginHorizontal: moderateScale(10) }}>
                <Image style={{ height: verticalScale(22), width: verticalScale(22) }} source={IMAGES.google} />
              </TouchableOpacity>
              {Platform.OS === "ios" ? <TouchableOpacity onPress={loginWithApple} activeOpacity={0.7} style={{ backgroundColor: COLORS.WHITE_OPACITY(0.7), padding: moderateScale(10), borderRadius: 100, marginHorizontal: moderateScale(10) }}>
                <Image style={{ height: verticalScale(22), width: verticalScale(22) }} source={IMAGES.apple_logo} />
              </TouchableOpacity> : null}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal visible={loading} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.WHITE} />
          <Text style={{ color: COLORS.WHITE, marginTop: verticalScale(10) }}>Loading...</Text>
        </View>
      </Modal>
      <View style={{ height: safeAreaInsets.bottom }} />
    </ImageBackground>
  );
};

export default Login;