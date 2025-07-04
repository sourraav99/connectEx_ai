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
    ScrollView,
    Switch
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
// import Entypo from 'react-native-vector-icons/FontAwesome5Brands'



import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { getSelfProfileAction } from '../../../redux/action';
import { IMAGE_BASE_URL } from '../../../utils/config';
// import { Switch } from 'react-native-paper';


const { height, width } = Dimensions.get('window'); // Screen dimensions
const screenWidth = Dimensions.get('window').width; // Get the screen width
const numDots = 12; // Number of dots
const dotSize = screenWidth / (numDots * 1.7); // Calculate dot size and spacing


const ViewProfile = () => {
    const route = useRoute();
    const dispatch = useDispatch()
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();
    const { details } = route.params;
    console.log('details----->>>>');

    const [isEnabled, setIsEnabled] = useState(false);
    const [activeTab, setActiveTab] = useState('Shorts'); // Default active tab
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const profileImageUri = details?.image?.trim()
        ? `${IMAGE_BASE_URL}/${details.image}`
        : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg';
    console.log('Profile Image URI:', profileImageUri);
    console.log('details------------------->>>>>>>>>>>', details);

    const services = ['Web Development', 'App Development', 'UI/UX Design', 'Digital Marketing'];
    const iconArray = [
        {
            id: 1,
            title: 'Dashboard',
            iconName: 'dashboard',
            type: MaterialIcons,
            size: scale(17),
            color: COLORS.app_violete,
        },
        {
            id: 2,
            title: 'Wallet',
            iconName: 'wallet',
            type: Entypo,
            size: scale(17),
            color: COLORS.app_violete,
        },
        {
            id: 3,
            title: 'Services',
            iconName: 'pencil-square-o',
            type: FontAwesome,
            size: scale(17),
            color: COLORS.app_violete,
        },
        {
            id: 4,
            title: 'Sessions',
            iconName: 'photo-video',
            type: FontAwesome5,
            size: scale(17),
            color: COLORS.app_violete,
        },
        {
            id: 5,
            title: 'impressions',
            iconName: 'eye',
            type: Ionicons,
            size: scale(17),
            color: COLORS.app_violete,
        },
        {
            id: 6,
            title: 'Profile visits',
            iconName: 'user-circle',
            type: FontAwesome,
            size: scale(17),
            color: COLORS.app_violete,
        },
    ];

    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
                <View style={{ height: safeAreaInsets.top }} />
                <StatusBar backgroundColor={COLORS.BLACK} />
                <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
                    <Image
                        resizeMode="cover"
                        style={{ height: verticalScale(43), width: verticalScale(43), borderRadius: 100 }}
                        source={IMAGES.markleLogo}
                    />
                    <View
                        style={{
                            paddingVertical: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(0),
                            borderWidth: 1,
                            borderColor: COLORS.LIGHT_GREY,
                            paddingLeft: 5,
                            borderRadius: 17,
                            marginHorizontal: moderateScale(5),
                            width: Platform.OS === 'ios' ? moderateScale(235) : moderateScale(235),
                            height: Platform.OS === 'ios' ? verticalScale(37) : verticalScale(33),
                            justifyContent: 'center',
                        }}
                    >
                        <TextInput
                            style={{ color: COLORS.WHITE, height: verticalScale(37), fontSize: scale(11) }}
                            placeholderTextColor={COLORS.GREY}

                            placeholder="Search by name, skills and more...."
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => { navigation.navigate('NotificationList') }} hitSlop={{ right: 5, left: 5, top: 5, bottom: 5 }}>
                            <MaterialIcons name="notifications-active" size={24} color={COLORS.WHITE} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ChatList') }} hitSlop={{ right: 5, left: 5, top: 5, bottom: 5 }}>
                            <MaterialCommunityIcons name="message-bulleted" size={24} color={COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, flexGrow: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: verticalScale(10),
                            // backgroundColor: 'red',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: verticalScale(30), width: verticalScale(30), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                            <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity hitSlop={10} style={{ marginHorizontal: moderateScale(8), height: verticalScale(20), width: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome name={'share-alt'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(16)} />
                            </TouchableOpacity>

                            <TouchableOpacity hitSlop={10} style={{ marginHorizontal: moderateScale(8), height: verticalScale(20), width: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name={'dots-three-vertical'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(18)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "98%", backgroundColor: COLORS.WHITE_OPACITY(0.3), alignSelf: 'center', borderRadius: scale(10), marginTop: verticalScale(40) }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: moderateScale(10), marginTop: verticalScale(10) }}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <MaterialIcons name="star" size={16} color="orange" />
                                <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>{details.rating}</Text>
                            </View>
                            <View style={{ position: 'absolute', alignItems: 'center', width: '98%', top: verticalScale(-35), zIndex: 100, marginLeft: moderateScale(12), }}>

                                <View style={{ height: verticalScale(65), width: verticalScale(65), borderRadius: 100, borderWidth: 3, borderColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: verticalScale(59), width: verticalScale(59), borderRadius: 100, }} source={{ uri: profileImageUri }} />

                                </View>
                                <Text style={{ color: 'white', fontSize: scale(14) }}>{details.name}</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: scale(10), textAlign: "center" }}>{details.bio}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <FontAwesome6 name="pen" size={14} color={COLORS.app_violete} /> */}
                                <Text style={{ fontSize: scale(9), color: COLORS.WHITE_OPACITY(0.8) }}>{`     500+\nConnections`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '95%',
                                overflow: 'hidden',
                                alignSelf: 'center',
                                marginTop: verticalScale(48)
                            }}
                        >
                            {Array.from({ length: numDots }).map((_, index) => (
                                <View
                                    key={index}
                                    style={{
                                        width: dotSize, // Dot width
                                        height: dotSize / 20, // Dot height
                                        backgroundColor: COLORS.GREY, // Dot color
                                        borderRadius: dotSize / 2, // Make it circular
                                    }}
                                />
                            ))}

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: moderateScale(14), paddingVertical: verticalScale(5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.8), padding: scale(4), borderRadius: 100 }}>
                                    <MaterialIcons name="work" size={12} color={COLORS.app_violete} />
                                </View>
                                <Text style={{ color: COLORS.WHITE, fontSize: scale(11), fontWeight: '500', marginLeft: 5 }}>3Years+</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.8), padding: scale(4), borderRadius: 100 }}>
                                    <FontAwesome5 name="building" size={12} color={COLORS.app_violete} />
                                </View>
                                <Text style={{ color: COLORS.WHITE, fontSize: scale(11), fontWeight: '500', marginLeft: 5 }}>3Years+</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.8), padding: scale(4), borderRadius: 100 }}>
                                    <MaterialIcons name="location-on" size={12} color={COLORS.app_violete} />
                                </View>
                                <View style={{}}>
                                    <Text numberOfLines={1} style={{ color: COLORS.WHITE, fontSize: scale(11), fontWeight: '500', marginLeft: 5 }}>{details.location}</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '95%',
                                overflow: 'hidden',
                                alignSelf: 'center',
                                // marginTop: verticalScale(48)
                            }}
                        >
                            {Array.from({ length: numDots }).map((_, index) => (
                                <View
                                    key={index}
                                    style={{
                                        width: dotSize, // Dot width
                                        height: dotSize / 20, // Dot height
                                        backgroundColor: COLORS.GREY, // Dot color
                                        borderRadius: dotSize / 2, // Make it circular
                                    }}
                                />
                            ))}

                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: verticalScale(7), alignItems: 'center', paddingHorizontal: moderateScale(7) }}>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginTop: verticalScale(5),
                                // backgroundColor:'red',
                                width: '100%',
                                marginLeft: moderateScale(2)
                            }}>

                                {details.skills.map((keyword, index) => (
                                    <Text numberOfLines={1} key={index} style={styles.tag}>
                                        {keyword}
                                    </Text>
                                ))}
                            </View>

                        </View>
                        {/* <View style={{ marginBottom: verticalScale(3), alignItems: 'center', paddingHorizontal: moderateScale(7), backgroundColor:'red'}}>
                            <Text style={{ color: COLORS.WHITE, fontSize: scale(11) }}>{details.description}</Text>
                        </View> */}
                        {/* onPress={navigateToSetupProfile} */}

                        <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', marginBottom: verticalScale(7), alignItems: 'center', paddingHorizontal: moderateScale(7) }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                                color: COLORS.BLACK,
                                paddingVertical: verticalScale(2),
                                paddingHorizontal: scale(8),
                                borderRadius: 7,
                                elevation: 2,
                                fontWeight: 'bold',
                                marginHorizontal: 5
                            }}>
                                <View style={{}}>
                                    <Ionicons name="chatbox-ellipses" size={13} color={COLORS.app_violete} />
                                </View>

                                <Text style={{ marginLeft: 2, fontSize: scale(10), color: COLORS.BLACK }}>{`₹${details?.chatPrice || 50}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                                color: COLORS.BLACK,
                                paddingVertical: verticalScale(2),
                                paddingHorizontal: scale(8),
                                borderRadius: 7,
                                elevation: 2,
                                fontWeight: 'bold',
                                marginHorizontal: 5
                            }}>
                                <View style={{ marginTop: verticalScale(1.5) }}>
                                    <FontAwesome name="phone" size={13} color={COLORS.app_violete} />
                                </View>

                                <Text style={{ marginLeft: 2, fontSize: scale(10), color: COLORS.BLACK }}>{`₹${details?.chatPrice || 50}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.WHITE,
                                color: COLORS.BLACK,
                                paddingVertical: verticalScale(2),
                                paddingHorizontal: scale(8),
                                borderRadius: 7,
                                elevation: 2,
                                fontWeight: 'bold',
                                marginHorizontal: 5
                            }}>
                                <View style={{}}>
                                    <FontAwesome name="video-camera" size={12} color={COLORS.app_violete} />
                                </View>

                                <Text style={{ marginLeft: 2, fontSize: scale(10), color: COLORS.BLACK }}>{`₹${details?.chatPrice || 50}`}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', width: "97%", backgroundColor: COLORS.WHITE_OPACITY(0.3), paddingHorizontal: moderateScale(15), paddingVertical: verticalScale(10), margin: scale(5), alignSelf: 'center', borderRadius: scale(10), alignItems: 'center', marginVertical: verticalScale(7), justifyContent: 'space-between' }}>
                        <View style={{ marginLeft: moderateScale(7), }}>
                            <Text style={{ fontSize: scale(12), color: COLORS.WHITE }}>Next Availability</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: scale(10), color: COLORS.WHITE_OPACITY(0.5) }}>{`(9:00 pm Today)`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ color: COLORS.WHITE, fontSize: scale(11) }}>Book Now</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "98%", backgroundColor: COLORS.WHITE_OPACITY(0.3), borderRadius: scale(10), alignSelf: 'center', padding: scale(10), marginTop: verticalScale(5) }}>
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(12), }} >Social Media Links</Text>
                        <View style={{ flexDirection: 'row', marginTop: verticalScale(8), }}>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginRight: 3 }}>
                                <FontAwesome name={'youtube-play'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(14)} />
                            </View>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginHorizontal: 3 }}>
                                <EvilIcons name={'sc-telegram'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(17)} />
                            </View>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginHorizontal: 3 }}>
                                <FontAwesome name={'linkedin'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(16)} />
                            </View>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginHorizontal: 3 }}>
                                <FontAwesome name={'facebook-f'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(16)} />
                            </View>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginHorizontal: 3 }}>
                                <FontAwesome name={'instagram'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(15)} />
                            </View>
                            <View style={{ height: verticalScale(20), width: verticalScale(20), borderRadius: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: COLORS.WHITE_OPACITY(0.8), marginHorizontal: 3 }}>
                                <FontAwesome name={'twitter'} color={COLORS.WHITE_OPACITY(0.8)} size={scale(16)} />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            backgroundColor: COLORS.GREY, // Neutral background for the container
                            borderRadius: scale(10),
                            padding: scale(5),
                            width: moderateScale(200), // Adjust width as needed,
                            alignSelf: 'center',
                            marginTop: verticalScale(13)
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setActiveTab('Shorts')}
                            style={{
                                flex: 1,
                                paddingVertical: 8,
                                borderRadius: scale(8),
                                alignItems: 'center',
                                backgroundColor: activeTab === 'Shorts' ? COLORS.app_violete : COLORS.GREY, // Highlight active tab
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: activeTab === 'Shorts' ? COLORS.WHITE : COLORS.WHITE_OPACITY(0.5), // Highlight active text
                                    fontWeight: activeTab === 'Shorts' ? 'bold' : 'normal',
                                }}
                            >
                                Shorts
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('Services')}
                            style={{
                                flex: 1,
                                paddingVertical: 8,
                                borderRadius: scale(8),
                                alignItems: 'center',
                                backgroundColor: activeTab === 'Services' ? COLORS.app_violete : COLORS.GREY, // Highlight active tab
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: activeTab === 'Services' ? COLORS.WHITE : COLORS.WHITE_OPACITY(0.5), // Highlight active text
                                    fontWeight: activeTab === 'Services' ? 'bold' : 'normal',
                                }}
                            >
                                Services
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: verticalScale(20), alignItems: 'center' }}>
                        {activeTab === 'Shorts' ? (
                            <>
                                <View style={{ flexDirection: 'row', width: '100%', }}>
                                    {/* Example Images */}
                                    <ImageBackground
                                        source={{ uri: imageUris.model2 }}
                                        style={{
                                            width: scale(100),
                                            height: scale(120),
                                            borderRadius: scale(10),
                                            marginHorizontal: verticalScale(10),
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <View style={{ height: verticalScale(40), width: verticalScale(40), borderRadius: 100, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Entypo name="controller-play" size={35} color={COLORS.BLACK} />
                                        </View>
                                    </ImageBackground>
                                    <ImageBackground
                                        source={{ uri: imageUris.model5 }}
                                        style={{
                                            width: scale(100),
                                            height: scale(120),
                                            borderRadius: scale(10),
                                            marginHorizontal: verticalScale(10),
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <View style={{ height: verticalScale(40), width: verticalScale(40), borderRadius: 100, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Entypo name="controller-play" size={35} color={COLORS.BLACK} />
                                        </View>
                                    </ImageBackground>

                                </View>
                                <View style={{ height: verticalScale(20) }}>

                                </View>
                            </>

                        ) : (
                            <FlatList
                                data={details.skills}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                renderItem={({ item }) => (
                                    <>
                                        <View style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), margin: scale(10), paddingHorizontal: scale(8), borderRadius: scale(10), marginBottom: 70 }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: COLORS.WHITE,
                                                    marginVertical: verticalScale(5),
                                                }}
                                            >
                                                {item}
                                            </Text>

                                        </View>
                                        <View style={{ height: verticalScale(20) }}>

                                        </View>
                                    </>
                                )}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    tag: {
        backgroundColor: COLORS.WHITE_OPACITY(0.5),
        color: COLORS.BLUE,
        fontSize: scale(10),
        paddingVertical: verticalScale(2),
        paddingHorizontal: scale(8),
        marginRight: scale(5),
        marginBottom: verticalScale(5),
        borderRadius: 5,
        color: COLORS.WHITE
    },
})
export default ViewProfile