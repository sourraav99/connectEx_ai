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
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
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
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import uuid from 'react-native-uuid';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signupAction } from '../../../redux/action';

const Signup = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Modal Loading state

    const fullName = firstName.trim() + ' ' + lastName.trim();

    // console.log(fullName);
    // console.log(firestore());
    useFocusEffect(
        React.useCallback(() => {
            // Reset the form fields when the screen is focused
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }, [])
    );


    const validateFields = () => {
        if (!firstName.trim()) {
            Toast.show('First name is required.');
            return false;
        }
        if (!lastName.trim()) {
            Toast.show('Last name is required.');
            return false;
        }
        if (!email.trim()) {
            Toast.show('Email is required.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show('Enter a valid email address.');
            return false;
        }
        if (!password.trim()) {
            Toast.show('Password is required.');
            return false;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            Toast.show(
                'Password must be 8+ chars, uppercase, lowercase, number, special char.'
            );
            return false;
        }
        if (password.length < 6) {
            Toast.show('Password must be at least 6 characters long.');
            return false;
        }
        if (!confirmPassword.trim()) {
            Toast.show('Confirm password is required.');
            return false;
        }
        if (password !== confirmPassword) {
            Toast.show('Passwords do not match.');
            return false;
        }


        return true;
    };

    const checkUserExists = async (email) => {
        try {
            console.log(`Checking if user exists with email: ${email}`);
            const snapshot = await firestore()
                .collection('users')
                .where('email', '==', email)
                .get();

            // Log for debugging
            console.log(`Snapshot empty: ${snapshot.empty}`);

            return !snapshot.empty; // If the snapshot is not empty, the user exists
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false; // In case of error, assume user does not exist
        }
    };

    const registerUserWithFireBase = async () => {
        const userId = uuid.v4();
        try {
            console.log(`Registering user with ID: ${userId}`);

            // Register the new user in Firebase
            await firestore()
                .collection('users')
                .doc(userId)
                .set({
                    name: fullName,
                    email: email.trim().toLowerCase(),
                    password: password,
                    userId: userId,
                });

            console.log('User created successfully');
            // Toast.show('User created successfully', Toast.SHORT);
            return userId; // Indicate success
        } catch (error) {
            console.error('Error creating user:', error);
            Toast.show(error.message, Toast.SHORT);
            return false; // Indicate failure
        }
    };

    const handleSignup = async () => {
        Keyboard.dismiss();

        if (validateFields()) {
            setLoading(true); // Show loading modal



            try {
                // Check if the user already exists
                const userExists = await checkUserExists(email.trim());
                if (userExists) {
                    console.log('User already exists. Show login prompt');
                    Toast.show('User already exists with this email. Please log in.', Toast.LONG);
                    setLoading(false);
                    return; // Prevent further execution if the user exists
                }

                // Register the user in Firebase
                const userID = await registerUserWithFireBase();
                if (userID) {
                    // Clear input fields after successful registration
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    // Save user data locally
                    const userData = {
                        fullName: fullName,
                        email: email.trim(),
                        firebaeUserId: userID,
                    };
                    const payload = {
                        email: email.trim().toLowerCase(),
                        password: password.trim(),
                        name: fullName,
                        authMethod: 'email',
                        firebaseId: userID
                    };

                    // Optional: Dispatch an action or navigate to another screen
                    dispatch(
                        signupAction(payload, (response) => {
                            console.log('Signup response:', response.data);
                            if (response?.data?.success) {
                                Toast.show(response?.data?.message, Toast.SHORT);
                            }
                        })
                    );

                    // Navigate to Home screen or any other screen
                    navigation.navigate('AccountVerification', { payload: payload, userData: userData });
                } else {
                    Toast.show('User registration failed. Please try again.', Toast.LONG);
                }
            } catch (error) {
                console.error('Signup Error:', error);
                Toast.show('An error occurred. Please try again.', Toast.SHORT);
            } finally {
                setLoading(false); // Hide loading modal in both success and error cases
            }
        }
    };




    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ height: safeAreaInsets.top }} />

            {/* Gradient Overlay */}
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
                locations={[0, 0.2, 0.5, 0.8, 1]}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: verticalScale(600), }} />
            {/* Keyboard Handling */}

            <Modal visible={loading} transparent animationType="fade">
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.WHITE} />
                    <Text style={{ color: COLORS.WHITE, marginTop: verticalScale(10) }}>Loading...</Text>
                </View>
            </Modal>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={verticalScale(100)} // Adjusts scrolling height when the keyboard opens
            >
                <View style={{ width: '97%', alignSelf: 'center', flex: 1 }}>
                    {/* Image at the top */}
                    <View style={{ alignSelf: 'center' }}>
                        <Image source={IMAGES.signup_png}
                            style={{ height: verticalScale(170), width: verticalScale(170), }}
                        />
                    </View>

                    {/* Input fields for first and last name */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(20), }} >
                        {/* First Name */}
                        <View style={{ flex: 1, marginRight: moderateScale(10) }}>
                            <Text style={{ color: COLORS.WHITE, marginBottom: verticalScale(5), fontSize: scale(12), }}>
                                First Name
                            </Text>
                            <View
                                style={{ height: verticalScale(40), backgroundColor: COLORS.WHITE_OPACITY(0.5), borderRadius: moderateScale(5), flexDirection: 'row', alignItems: 'center', }} >
                                <TextInput
                                    style={{
                                        paddingHorizontal: moderateScale(10),
                                        flex: 1,
                                        color: COLORS.BLACK, // Text color inside input
                                    }}
                                    placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                                    placeholder="Enter your first name"
                                    onChangeText={(text) => {
                                        setFirstName(text);
                                        // console.log('First Name:', text);
                                    }}
                                />
                            </View>
                        </View>

                        {/* Last Name */}
                        <View style={{ flex: 1, marginLeft: moderateScale(10) }}>
                            <Text
                                style={{
                                    color: COLORS.WHITE,
                                    marginBottom: verticalScale(5), // Adds spacing between label and input
                                    fontSize: scale(12),
                                }}
                            >
                                Last Name
                            </Text>
                            <View
                                style={{
                                    height: verticalScale(40),
                                    backgroundColor: COLORS.WHITE_OPACITY(0.5),
                                    borderRadius: moderateScale(5),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <TextInput
                                    style={{
                                        paddingHorizontal: moderateScale(10),
                                        flex: 1,
                                        color: COLORS.BLACK, // Text color inside input
                                    }}
                                    placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                                    placeholder="Enter your last name"
                                    onChangeText={(text) => {
                                        setLastName(text);
                                        // console.log('First Name:', text);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(7) }}>
                        <Text style={{
                            color: COLORS.WHITE,
                            marginBottom: verticalScale(5), // Adds spacing between label and input
                            fontSize: scale(12),

                        }}
                        >
                            Email
                        </Text>
                        <View style={{
                            height: verticalScale(40),
                            backgroundColor: COLORS.WHITE_OPACITY(0.5),
                            borderRadius: moderateScale(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TextInput style={{
                                paddingHorizontal: moderateScale(10),
                                flex: 1,
                                color: COLORS.BLACK, // Text color inside input
                            }}

                                placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                                keyboardType='email-address'
                                onChangeText={(text) => {
                                    setEmail(text);
                                    // console.log('First Name:', text);
                                }}
                                placeholder='Enter your email' />
                        </View>
                    </View>

                    <View style={{ marginTop: verticalScale(7) }}>
                        <Text style={{
                            color: COLORS.WHITE,
                            marginBottom: verticalScale(5), // Adds spacing between label and input
                            fontSize: scale(12),

                        }}
                        >
                            Password
                        </Text>
                        <View style={{
                            height: verticalScale(40),
                            backgroundColor: COLORS.WHITE_OPACITY(0.5),
                            borderRadius: moderateScale(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TextInput style={{
                                paddingHorizontal: moderateScale(10),
                                flex: 1,
                                color: COLORS.BLACK, // Text color inside input
                            }}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    // console.log('First Name:', text);
                                }}
                                secureTextEntry={!passwordVisible}
                                placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                                placeholder='Enter your password' />

                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={{ paddingRight: moderateScale(10) }}
                            >
                                <Entypo
                                    name={passwordVisible ? 'eye' : 'eye-with-line'}
                                    size={22}
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ marginTop: verticalScale(7) }}>
                        <Text style={{
                            color: COLORS.WHITE,
                            marginBottom: verticalScale(5), // Adds spacing between label and input
                            fontSize: scale(12),

                        }}
                        >
                            Confirm password
                        </Text>
                        <View style={{
                            height: verticalScale(40),
                            backgroundColor: COLORS.WHITE_OPACITY(0.5),
                            borderRadius: moderateScale(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TextInput style={{
                                paddingHorizontal: moderateScale(10),
                                flex: 1,
                                color: COLORS.BLACK, // Text color inside input
                            }}
                                placeholderTextColor={COLORS.BLACK_OPACITY(0.7)}
                                secureTextEntry={!confirmPasswordVisible}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    // console.log('First Name:', text);
                                }}
                                placeholder='Enter your  confirm password' />
                            <TouchableOpacity
                                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                style={{ paddingRight: moderateScale(10) }}
                            >
                                <Entypo
                                    name={confirmPasswordVisible ? 'eye' : 'eye-with-line'}
                                    size={22}
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() ? 1 : 0.7}
                        onPress={handleSignup}
                        // onPress={() => registerUserWithFireBase()}
                        style={{
                            height: verticalScale(37),
                            backgroundColor: !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()
                                ? COLORS.GREY // Use grey if fields are empty
                                : COLORS.app_violete, // Use violet when all fields are filled
                            justifyContent: 'center',
                            borderRadius: moderateScale(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: verticalScale(60),
                        }}
                    >
                        <Text style={{ color: COLORS.WHITE, fontWeight: '500', fontSize: scale(13) }}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: verticalScale(20), paddingHorizontal: moderateScale(20) }}>
                        <Text style={{ color: COLORS.WHITE_OPACITY(0.5), fontSize: scale(12), textAlign: 'center' }}>
                            By continuing, you agree to our{' '}
                            <Text
                                style={{
                                    color: COLORS.app_violete, // Replace with your violet color
                                    textDecorationLine: 'underline',
                                }}
                                onPress={() => {
                                    // Navigate to Terms of Service or open link
                                    console.log('Terms of Service pressed');
                                }}
                            >
                                Terms of Service
                            </Text>{' '}
                            and
                            {'\n'}
                            <Text
                                style={{
                                    color: COLORS.app_violete, // Replace with your violet color
                                    textDecorationLine: 'underline',
                                }}
                                onPress={() => {
                                    // Navigate to Privacy Policy or open link
                                    console.log('Privacy and Policy pressed');
                                }}
                            >
                                Privacy and Policy
                            </Text>
                        </Text>
                    </View>

                </View>

            </KeyboardAwareScrollView>

            <View style={{ height: safeAreaInsets.bottom }} />
        </ImageBackground>
    )
}

export default Signup