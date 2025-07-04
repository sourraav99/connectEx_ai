import { View, Text, Platform, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { verticalScale } from 'react-native-size-matters';
import BottomTab from './bottomTab';
import Home from '../app/screens/home';
import Shorts from '../app/screens/shorts';
import AI_search from '../app/screens/ai_search';
import Help from '../app/screens/help';
import Users from '../app/screens/user';

const BottomStack = ({navigation}) => {
    const Tab = createBottomTabNavigator();
    const dynamicBottomTabHeight = () => {
        if (Platform.OS === "ios") {
            return verticalScale(60);
        } else {
            return verticalScale(50);
        }
    };

    const CONTAINER_HEIGHT = dynamicBottomTabHeight();

    // Create scrollY only for HomeScreen
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const diffClamp = Animated.diffClamp(scrollY, 0, CONTAINER_HEIGHT);
    const translateY = diffClamp.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, CONTAINER_HEIGHT],
        extrapolate: 'clamp',  // Ensures the value stays within bounds
    });

      // Define resetTranslateY function
      const resetTranslateY = () => {
        scrollY.setValue(0); // Reset scrollY value to 0 when navigating between tabs
    };
    // Listen to navigation state changes
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            // When switching tabs, reset the tab bar to fully visible
            scrollY.setValue(0);  // Reset scrollY value to 0 when navigating between tabs
            resetTranslateY();  // Reset translateY when navigating between tabs
        });

        return () => unsubscribe();
    }, [navigation]);

    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTab {...props} translateY={translateY} resetTranslateY={resetTranslateY} />}
            screenOptions={{ headerShown: false }} // Optionally hide headers for all screens
        >
           <Tab.Screen name="HomeScreen" component={Home} />
                {/* {(props) => (
                    <HomeScreen
                        {...props}
                        scrollY={scrollY} // Pass scrollY to HomeScreen to handle scroll animations
                    />
                )}
            </Tab.Screen> */}
            <Tab.Screen name="ShortsScreen" component={Shorts} />
            <Tab.Screen name="AI_searchScreen" component={AI_search} />
            <Tab.Screen name="HelpScreen" component={Help} />
            <Tab.Screen name="ProfileScreen" component={Users} />
        </Tab.Navigator>
    );
};

export default BottomStack;