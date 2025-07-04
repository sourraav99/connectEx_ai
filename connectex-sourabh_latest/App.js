// import { View, Text, LogBox } from 'react-native'
// import React, { useEffect } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn'; // Import the dialog component
// import Onboarding1 from './src/app/screens/onboarding1';
// import Onboarding2 from './src/app/screens/onboarding2';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './src/app/screens/login';
// import Signup from './src/app/screens/signup';
// import AccountVerification from './src/app/screens/accountVerificationScreen';
// import BottomStack from './src/stacks/bottomStack';
// import KonnectionCategories from './src/app/screens/konnectionCategories';
// import ChatList from './src/app/screens/chatList';
// import NotificationList from './src/app/screens/notificationList';
// import IndustryExperts from './src/app/screens/industryExperts';
// import ViewProfile from './src/app/screens/viewProfile';
// import ServiceOptions from './src/app/screens/serviceOptions';
// import PaymentConfirmation from './src/app/screens/paymentConfirmation';
// import ProfileSetup from './src/app/screens/profileSetupScreen';
// import Settings from './src/app/screens/settings';
// import AddBankDetails from './src/app/screens/addBankDetails';
// import WithdrawMoney from './src/app/screens/withdrawMoney';
// import AddMoney from './src/app/screens/addMoney';
// import CallScreen from './src/app/screens/callScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ChatScreen from './src/app/screens/chatScreen';


// const Stack = createNativeStackNavigator();
// const App = () => {
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         // Get user data from AsyncStorage
//         const userData = await AsyncStorage.getItem('userData');

//         if (userData) {
//           // Parse and log the user data
//           const parsedData = JSON.parse(userData);
//           console.log('User data from AsyncStorage:', parsedData);

//           // (Optional) Dispatch action to set user as logged in
//           // dispatch(setLoggedIn(parsedData));
//         } else {
//           console.log('No user data found in AsyncStorage.');
//         }
//       } catch (error) {
//         console.error('Error reading user data from AsyncStorage:', error);
//       }
//     };

//     loadUserData();

//     // Suppress unnecessary warnings (optional)
//     LogBox.ignoreLogs(['AsyncStorage has been extracted']);
//   }, []);
//   return (
//     <NavigationContainer>
//       <ZegoCallInvitationDialog />
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="OnboardingScreen1" component={Onboarding1} />
//         <Stack.Screen name="OnboardingScreen2" component={Onboarding2} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="AccountVerification" component={AccountVerification} />
//         <Stack.Screen name="Home" component={BottomStack} />
//         <Stack.Screen name="KonnectionCategories" component={KonnectionCategories} />
//         <Stack.Screen name="ChatList" component={ChatList} />
//         <Stack.Screen name="NotificationList" component={NotificationList} />
//         <Stack.Screen name="IndustryExperts" component={IndustryExperts} />
//         <Stack.Screen name="ViewProfile" component={ViewProfile} />
//         <Stack.Screen name="ServiceOptions" component={ServiceOptions} />
//         <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
//         <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
//         <Stack.Screen name="Settings" component={Settings} />
//         <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
//         <Stack.Screen name="WithdrawMoney" component={WithdrawMoney} />
//         <Stack.Screen name="AddMoney" component={AddMoney} />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           // DO NOT change the name 
//           name="ZegoUIKitPrebuiltCallWaitingScreen"
//           component={ZegoUIKitPrebuiltCallWaitingScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           // DO NOT change the name
//           name="ZegoUIKitPrebuiltCallInCallScreen"
//           component={ZegoUIKitPrebuiltCallInCallScreen}
//         />
//         <Stack.Screen name="CallScreen" component={CallScreen} />
//         <Stack.Screen name="ChatScreen" component={ChatScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Routes from './src/routes/index'
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('translucent');
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App
