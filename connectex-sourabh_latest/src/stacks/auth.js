import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen1 from '../app/screens/onboarding1';
import Onboarding2 from '../app/screens/onboarding2';
import Login from '../app/screens/login';
import Signup from '../app/screens/signup';
import AccountVerification from '../app/screens/accountVerificationScreen';

const Stack = createNativeStackNavigator();
const Auth = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
      <Stack.Screen name="OnboardingScreen2" component={Onboarding2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AccountVerification" component={AccountVerification} />
    </Stack.Navigator>
  )
}

export default Auth