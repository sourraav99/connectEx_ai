import { View, Image, ImageBackground, Animated, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '../../../assets/images';
import { Text } from '@react-navigation/elements';
import { COLORS } from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen1 = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation()
    // Single Animated Value for all translations
    const animationValue = useRef(new Animated.Value(0)).current;

    const imageConfigs = [
        { size: 120, x: 0, y: 0 },
        { size: 60, x: 0, y: -150 },
        { size: 75, x: 150, y: -150 },
        { size: 75, x: -150, y: -150 },
        { size: 40, x: 150, y: 0 },
        { size: 55, x: -150, y: 0 },
        { size: 75, x: 0, y: 150 },
        { size: 75, x: 150, y: 150 },
        { size: 75, x: -150, y: 150 },

    ];

    useEffect(() => {
        const checkUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const token = await AsyncStorage.getItem('token');

                if (!userData || !token) {
                    console.log('Missing userData or token');
                    // Redirect to login screen if data is missing
                    // navigation.replace('Login');
                } else {
                    console.log('User data and token found');
                    // Proceed as normal
                    // Optionally load additional data here
                }
            } catch (error) {
                console.error('Error accessing AsyncStorage:', error);
            }
        };

        checkUserData();
    }, []); // Runs only once when the screen is mounted

    useEffect(() => {
        const animationSequence = Animated.loop(
            Animated.sequence([
                Animated.timing(animationValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(animationValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
            ])
        );
        animationSequence.start();

        return () => animationSequence.stop();
    }, []);

    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ height: safeAreaInsets.top }} />

            {/* Central Image */}
            <Animated.View
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    transform: [
                        {
                            translateX: animationValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0], // Central image remains in place
                            }),
                        },
                        {
                            translateY: animationValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0],
                            }),
                        },
                    ],
                }}
            >
                <Image
                    source={IMAGES.model1}
                    style={{
                        width: imageConfigs[0].size,
                        height: imageConfigs[0].size,
                        top: verticalScale(140),
                        left: moderateScale(130),
                        borderRadius: imageConfigs[0].size / 2,
                        borderWidth: 2,
                        borderColor: 'white',
                    }}
                />
            </Animated.View>

            {/* Surrounding Images */}
            {imageConfigs.slice(1).map((config, index) => (
                <Animated.View
                    key={index}
                    style={{
                        position: 'absolute',
                        top: verticalScale(160),
                        left: moderateScale(150),
                        transform: [
                            {
                                translateX: animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, config.x],
                                }),
                            },
                            {
                                translateY: animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, config.y],
                                }),
                            },
                        ],
                    }}
                >
                    <Image
                        source={IMAGES[`model${index + 2}`]}
                        style={{
                            width: config.size,
                            height: config.size,
                            borderRadius: config.size / 2,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                    />
                </Animated.View>
            ))}
            <View style={{ flex: 0.5 }} />
            <View style={{ flex: 0.5, width: '97%', alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: scale(13), marginTop: 8 }}>ConnectEx_</Text>
                    <Text style={{ color: COLORS.app_violete, fontSize: 15, marginTop: 8 }}>ai</Text>
                </View>
                <View style={{ marginTop: verticalScale(20) }}>
                    <Text style={{ color: 'white', fontSize: 30 }}>{`Access\nAnyone, Anytime,\nfor Anything`}</Text>
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 18 }}>Monetize your time and knowledge</Text>
                </View>
                <TouchableOpacity
                    // onPress={() => { navigation.navigate('OnboardingScreen2') }}Home
                    onPress={() => navigation.navigate('OnboardingScreen2')}
                    style={{
                        height: 50,
                        width: '100%',
                        backgroundColor: COLORS.app_violete,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: Platform.OS === 'ios' ? 25 : safeAreaInsets.bottom + 40, // Adjusted for Android
                        //Platform.OS === 'ios' ? safeAreaInsets.bottom + 20 : safeAreaInsets.bottom + 40, // Adjusted for Android
                        alignSelf: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: safeAreaInsets.bottom }} />
        </ImageBackground>
    );
};

export default OnboardingScreen1;
