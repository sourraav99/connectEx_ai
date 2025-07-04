import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ZegoCallInvitationDialog, } from '@zegocloud/zego-uikit-prebuilt-call-rn'; // Import the dialog component
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../stacks/auth'
import Main from '../stacks/main'
import { setLoggedIn, setLoggedOut } from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IMAGES } from '../assets/images';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

const index = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(isLoggedIn);


    const yourAppID = 1091612176; // Replace with your app ID from ZEGOCLOUD
    const yourAppSign = "81706b86bcb8ebda3e28e4c3aa68eacb60c3452d802c5bcc7339de20f153506c"; // Replace with your app Sign from ZEGOCLOUD


    const initializeVideoAndAudioCall = async (userID, userName, firebaeUserId) => {

        if (Platform.OS === 'ios') {
            console.log('Skipping Zego Call Service initialization on iOS');
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
                }
            );
        } catch (error) {
            console.error('Error initializing Zego service:', error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    console.log('User data exists:', userData);
                    console.log('userData.email---->>>>>>>', userData.email);
                    console.log('userData.name---->>>>>>>', userData.name);
                    console.log('userData.firebaeUserId---->>>>>>>', userData.firebaeUserId);

                    dispatch({
                        type: `SET_LOGGED_IN`,
                        payload: userData ? true : false
                    });


                    initializeVideoAndAudioCall(userData.email, userData.name, userData.firebaeUserId)
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false); // Stop loading once the check is complete
            }
        };

        checkLoginStatus();
    }, [dispatch]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (

        <NavigationContainer>
            <ZegoCallInvitationDialog />
            {isLoggedIn ? <Main /> : <Auth />}
        </NavigationContainer>
    )
}

const LoadingScreen = () => {

    return (
        // Implement your loading screen UI here
        <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            source={IMAGES.appBackground}
        >
            <Text style={{ color: 'white' }}>Loading...</Text>
        </ImageBackground>
    );
}

export default index