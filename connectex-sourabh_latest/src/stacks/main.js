import { View, Text, } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn'; // Import the dialog component
import { NavigationContainer } from '@react-navigation/native';
import BottomStack from './bottomStack';
import KonnectionCategories from '../app/screens/konnectionCategories';
import ChatList from '../app/screens/chatList';
import NotificationList from '../app/screens/notificationList';
import IndustryExperts from '../app/screens/industryExperts';
import ViewProfile from '../app/screens/viewProfile';
import ServiceOptions from '../app/screens/serviceOptions';
import PaymentConfirmation from '../app/screens/paymentConfirmation';
import ProfileSetup from '../app/screens/profileSetupScreen';
import Settings from '../app/screens/settings';
import AddBankDetails from '../app/screens/addBankDetails';
import WithdrawMoney from '../app/screens/withdrawMoney';
import AddMoney from '../app/screens/addMoney';
import CallScreen from '../app/screens/callScreen';
import ChatScreen from '../app/screens/chatScreen';
import Search from '../app/screens/searchScreen';
// import BottomStack from './bottomStack';
// import KonnectionCategories from '../app/screens/konnectionCategories';
// import NotificationList from '../app/screens/notificationList';
// import IndustryExperts from '../app/screens/industryExperts';
// import ViewProfile from '../app/screens/viewProfile';
// import ServiceOptions from '../app/screens/serviceOptions';
// import PaymentConfirmation from '../app/screens/paymentConfirmation';
// import ProfileSetup from '../app/screens/profileSetupScreen';
// import AddBankDetails from '../app/screens/addBankDetails';
// import WithdrawMoney from '../app/screens/withdrawMoney';
// import AddMoney from '../app/screens/addMoney';


const Stack = createNativeStackNavigator();
const Main = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={BottomStack} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="KonnectionCategories" component={KonnectionCategories} />
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="NotificationList" component={NotificationList} />
            <Stack.Screen name="IndustryExperts" component={IndustryExperts} />
            <Stack.Screen name="ViewProfile" component={ViewProfile} />
            <Stack.Screen name="ServiceOptions" component={ServiceOptions} />
            <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
            <Stack.Screen name="WithdrawMoney" component={WithdrawMoney} />
            <Stack.Screen name="AddMoney" component={AddMoney} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
                options={{ headerShown: false }}
                // DO NOT change the name 
                name="ZegoUIKitPrebuiltCallWaitingScreen"
                component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                // DO NOT change the name
                name="ZegoUIKitPrebuiltCallInCallScreen"
                component={ZegoUIKitPrebuiltCallInCallScreen}
            />
            <Stack.Screen name="CallScreen" component={CallScreen} />
        </Stack.Navigator>
    )
}

export default Main