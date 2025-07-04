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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';//chatbox-ellipses

import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getUsersByExpertiseArea } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../utils/config';


const IndustryExperts = ({ props }) => {
    const dispatch = useDispatch()
    const route = useRoute();
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();
    const { data } = route.params;
    const screenWidth = Dimensions.get('window').width; // Get the screen width
    const numDots = 12; // Number of dots
    const dotSize = screenWidth / (numDots * 2); // Calculate dot size and spacing
    const [profiles, setProfiles] = useState([])
    console.log('data----->>>>', data);



    const getData = async () => {
        try {
            const payload = { expertiseArea: data }

            dispatch(getUsersByExpertiseArea(payload, (res) => {
                const users = res?.data?.profiles || [];
                // setExpertise(expertiseData);

                // // Convert API response to dropdown format
                // const formattedItems = expertiseData.map((item) => ({
                //   label: item.title, // Display title in dropdown
                //   value: item._id, // Store expertise _id when selected
                // }));
                console.log('users------->>>>>', users);
                setProfiles(users)
                // setExpertise(expertiseData);
            }));;
        } catch (e) {
            console.error('Unexpected error:', e.message);
            // setError('Something went wrong. Please restart the app.');
            // setIsLoading(false);
        }
    }
    console.log('profiless----->>>', profiles);

    useEffect(() => {
        getData()
    }, []);
    const renderProfileCards = ({ item }) => (

        <LinearGradient
            colors={['rgba(255, 255, 255, .6)',   // Violete - fully opaque
                'rgba(255, 255, 255, 0.5)', // Violete - low opacity
                'rgba(6, 246, 239, 0.5)', // Brown - low opacity
                'rgba(6, 246, 239, 0.6)',]} // Blue to Transparent to Brown
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}
        >
            {item?.isVerified && (
                <View style={{ backgroundColor: COLORS.BLACK_OPACITY(0.3), flexDirection: 'row', alignItems: 'center', paddingLeft: moderateScale(4), width: moderateScale(95), borderBottomRightRadius: 10, padding: 5 }}>
                    <Image source={IMAGES.verifyIcon} style={{ height: moderateScale(13), width: moderateScale(13), marginTop: verticalScale(2) }} />
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(8) }}>ConnectEx_verified</Text>
                </View>
            )}
            <TouchableOpacity
                onPress={() => { navigation.navigate('ViewProfile', { details: item }) }}
                activeOpacity={0.9} style={styles.cardContainer}>
                {/* Top Section */}

                <View style={styles.topSection}>
                    <View style={{ alignItems: 'center', marginBottom: verticalScale(10) }}>
                        {/* 
                  <Image source={{ uri: item.profileImageUri }} style={styles.profileImage} /> */}
                        <TouchableOpacity
                        >
                            <Image source={{ uri: item?.basicInfo?.image?.trim() ? `${IMAGE_BASE_URL}/${item?.basicInfo?.image}` : `https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg` }} style={styles.profileImage} />

                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="star" size={16} color="orange" />
                            <Text style={styles.ratingText}>{`4`}</Text>
                        </View>
                    </View>
                    <View style={styles.infoSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.nameText}>{item?.basicInfo?.name || 'User'}</Text>
                            {/* {item?.isLogin && (
                      <>
                        <Image source={IMAGES.verifyIcon} style={{ height: moderateScale(20), width: moderateScale(20), marginTop: verticalScale(2) }} />
                      </>
                    )} */}

                            <TouchableOpacity
                                // onPress={() => { console.warn('clicked') }} 
                                hitSlop={{ right: 8, left: 8, top: 8, bottom: 8 }} style={{ backgroundColor: COLORS.BLACK_OPACITY(0.5), borderRadius: 100, position: 'absolute', right: moderateScale(13), height: verticalScale(30), width: verticalScale(30), alignItems: 'center', justifyContent: 'center', top: 1 }}>
                                <Ionicons name="person-add" size={18} color={'white'} style={{}} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.domainText}>{item?.basicInfo?.designation || 'No description available'}</Text>
                        <View style={{ marginTop: verticalScale(2) }}>
                            <Text numberOfLines={2} style={{ fontSize: scale(10), color: COLORS.BLACK, fontWeight: '400' }}>{item?.aboutMe?.describeYourself || 'No bio'}</Text>
                        </View>
                        <View style={styles.locationSection}>
                            <MaterialIcons name="location-on" size={12} color={COLORS.BLACK} style={{}} />
                            <Text style={styles.locationText}>{item?.aboutMe?.location || 'Location not provided'}</Text>
                        </View>
                    </View>

                </View>

                {/* Keywords */}
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ marginTop: verticalScale(6), }}>
                        <Text style={{ fontSize: scale(9), fontWeight: '500', marginTop: verticalScale(1), color: COLORS.BLACK }}>I can help with:</Text>
                    </View>
                    <View style={styles.tagsSection}>
                        {Array.isArray(item?.myExpertise?.skills) && item?.myExpertise?.skills.length > 0 ? (
                            <>
                                {item?.myExpertise?.skills.slice(0, 3).map((skill, index) => (
                                    <Text key={index} style={styles.tag}>
                                        {skill}
                                    </Text>
                                ))}
                                {item?.myExpertise?.skills.length > 3 && (
                                    <Text style={styles.tag}>+{item?.myExpertise?.skills.length - 3} More</Text>
                                )}
                            </>
                        ) : (
                            <Text style={{ fontSize: scale(11), color: 'black', fontStyle: 'italic' }}>
                                No skills available
                            </Text>
                        )}
                    </View>


                </View>
                {/* Pricing */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%', // Full screen width
                        overflow: 'hidden'
                    }}
                >
                    {Array.from({ length: numDots }).map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: dotSize, // Dot width
                                height: dotSize / 20, // Dot height
                                backgroundColor: COLORS.WHITE_OPACITY(0.8), // Dot color
                                borderRadius: dotSize / 2, // Make it circular
                            }}
                        />
                    ))}
                </View>

                <View style={styles.pricingSection}>
                    <TouchableOpacity
                        // onPress={() => {
                        //   console.log('data----->>>', item);
                        // }}
                        onPress={() => { navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Message' }) }}
                        style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                            color: COLORS.BLACK,
                            paddingVertical: verticalScale(3),
                            paddingHorizontal: scale(8),
                            borderRadius: 7,
                            elevation: 2,
                            fontWeight: 'bold',
                            marginHorizontal: 5
                        }}>
                        <View style={{}}>
                            <Ionicons name="chatbox-ellipses" size={15} color={COLORS.app_violete} />
                        </View>

                        <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item?.priceDetails?.chatCall}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('item------->>>>>', item);

                            navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Call' })
                        }}
                        //navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Call' })
                        style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                            color: COLORS.BLACK,
                            paddingVertical: verticalScale(3),
                            paddingHorizontal: scale(8),
                            borderRadius: 7,
                            elevation: 2,
                            fontWeight: 'bold',
                            marginHorizontal: 5
                        }}>
                        <View style={{ marginTop: verticalScale(1.5) }}>
                            <FontAwesome name="phone" size={15} color={COLORS.app_violete} />
                        </View>

                        <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item?.priceDetails?.audioCall}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Video Call' }) }}
                        style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                            color: COLORS.BLACK,
                            paddingVertical: verticalScale(3),
                            paddingHorizontal: scale(8),
                            borderRadius: 7,
                            elevation: 2,
                            fontWeight: 'bold',
                            marginHorizontal: 5
                        }}>
                        <View style={{}}>
                            <FontAwesome name="video-camera" size={14} color={COLORS.app_violete} />
                        </View>

                        <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item?.priceDetails?.videoCall}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </LinearGradient>


    );

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
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Industry Experts</Text>
                </View>
                {profiles.length ? (<>

                    <View style={{ marginTop: verticalScale(0), paddingHorizontal: moderateScale(5) }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={profiles}
                            renderItem={renderProfileCards}
                            ListFooterComponent={() => {
                                return (
                                    <>
                                        <View style={{ height: Platform.OS == 'ios' ? verticalScale(120) : verticalScale(60) }}></View>
                                    </>
                                )
                            }}
                            keyExtractor={(item) => item.id}
                            style={{ marginTop: verticalScale(10) }}
                        />
                    </View>
                </>) :
                    <>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>No Data</Text>
                        </View>
                    </>
                }


            </View>
        </ImageBackground>
    )
}

export default IndustryExperts
const styles = StyleSheet.create({
    gradientContainer: {
        borderRadius: 10,
        marginVertical: moderateScale(5),
        overflow: 'hidden', // Ensures the gradient doesn't spill outside the rounded corners
    },
    cardContainer: {
        backgroundColor: 'transparent',
        marginVertical: moderateScale(5),
        borderRadius: 10,
        padding: moderateScale(7),
        // elevation: 2,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    profileImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        marginRight: moderateScale(10),
        borderWidth: 1,
        padding: scale(1),
        borderColor: COLORS.WHITE,

    },
    infoSection: {
        flex: 1,
    },
    nameText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    domainText: {
        fontSize: scale(12),
        color: COLORS.GREY,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    locationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(2),
        backgroundColor: COLORS.WHITE_OPACITY(0.2),
        paddingVertical: verticalScale(0.5),
        borderRadius: scale(5),
        // width:'60%'
        alignSelf: 'flex-start',
        paddingHorizontal: moderateScale(10)
    },
    ratingText: {
        fontSize: scale(10),
        marginRight: scale(7),
        color: COLORS.BLACK
    },
    locationText: {
        fontSize: scale(9),
        color: COLORS.GREY,
        color: COLORS.BLACK
    },
    tagsSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: verticalScale(5),
        // backgroundColor:'red',
        width: '75%',
        marginLeft: moderateScale(2)
    },
    tagsSection2: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // marginTop: verticalScale(10),
        // backgroundColor:'red'
    },
    tag: {
        backgroundColor: COLORS.WHITE_OPACITY(0.5),
        color: COLORS.BLUE,
        fontSize: scale(10),
        paddingVertical: verticalScale(2),
        paddingHorizontal: scale(8),
        marginRight: scale(5),
        marginBottom: verticalScale(5),
        borderRadius: 5,
        color: COLORS.BLACK
    },
    pricingSection: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginTop: verticalScale(5),
        // borderStyle:'dotted'
    },
    priceTag: {
        backgroundColor: COLORS.WHITE,
        color: COLORS.BLACK,
        paddingVertical: verticalScale(5),
        paddingHorizontal: scale(12),
        borderRadius: 5,
        elevation: 2,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
});