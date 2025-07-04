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
  Alert,
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
import firestore from '@react-native-firebase/firestore';//chatbox-ellipses
import { ZegoUIKitPrebuiltCallService, ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { entrepreneurAndFundraisers, interviewSpeacialistProfiles, mentalHealthSpecialists, startupIdeaSpeacialist } from '../../../assets/data';
import { useDispatch } from 'react-redux';
import { getAllUsersAction, getExpertiseAction } from '../../../redux/action';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { EXPERISE_IMAGE_BASE_URL, IMAGE_BASE_URL } from '../../../utils/config';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Search from '../searchScreen';


const Home = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [firebaseId, setFirebaseId] = useState(null); // State to hold user data
  const [data, setData] = useState([]); // State for user data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const [expertise, setExpertise] = useState([]); // For error handling

  const screenWidth = Dimensions.get('window').width; // Get the screen width
  const numDots = 12; // Number of dots
  const dotSize = screenWidth / (numDots * 2); // Calculate dot size and spacing

  const cards = [
    {
      id: '1',
      image: IMAGES.interview,
      title: 'Interview Preparation',
      subTitle: 'Mock interview | CV Review | Body Language',
      data: interviewSpeacialistProfiles
    },
    {
      id: '2',
      image: IMAGES.startup,
      title: 'Startup Ideas',
      subTitle: 'Business concepts | Market research | Product validation',
      data: startupIdeaSpeacialist
    },
    {
      id: '3',
      image: IMAGES.Entrepreneurs,
      title: 'Entrepreneurship & Fundraising',
      subTitle: 'Pitch deck | Investor connections | Funding tips',
      data: entrepreneurAndFundraisers
    },
    {
      id: '4',
      image: IMAGES.mentalHealth,
      title: 'Mental Well-being',
      subTitle: 'Mindfulness | Stress relief | Work-life balance',
      data: mentalHealthSpecialists
    },
    {
      id: '5',
      image: IMAGES.professionals,
      title: 'Professional Growth',
      subTitle: 'Skill building | Career development | Promotions',
      data: interviewSpeacialistProfiles
    },
    {
      id: '6',
      image: IMAGES.relationships,
      title: 'Relationships & Loneliness',
      subTitle: 'Healthy relationships | Social connections | Mental health',
      data: interviewSpeacialistProfiles
    },
    {
      id: '7',
      image: IMAGES.fitness,
      title: 'Fitness & Health',
      subTitle: 'Workout plans | Nutrition tips | Healthy lifestyle',
      data: interviewSpeacialistProfiles
    },
    {
      id: '8',
      image: IMAGES.finance,
      title: 'Financial Planning',
      subTitle: 'Budgeting | Savings | Investment strategies',
      data: interviewSpeacialistProfiles
    },
    {
      id: '9',
      image: IMAGES.influencers,
      title: 'Time Management',
      subTitle: 'Prioritization | Productivity tools | Focus strategies',
      data: interviewSpeacialistProfiles
    },
    {
      id: '10',
      image: IMAGES.lifecoach,
      title: 'Career Guidance',
      subTitle: 'Job search | Career planning | Mentorship support',
      data: interviewSpeacialistProfiles
    },
  ];

  const visibleCards = expertise.slice(0, 6);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Missing token');

      dispatch(
        getAllUsersAction(
          (res) => {
            const profiles = res?.data?.profiles || [];
            const users = profiles.map((profile) => ({
              id: profile._id,
              image: profile.basicInfo?.image,
              name: profile.basicInfo?.name || 'No Name Provided',
              designation: profile.basicInfo?.designation || 'no designation provided',
              skills: profile.myExpertise?.skills || [],
              bio: profile.aboutMe?.describeYourself || 'no bio',
              location: profile.aboutMe?.location || 'Location not provided',
              email: profile.email,
              isLogin: profile.isLogin,
              verified:profile?.isVerified||false,
              firebaseId: profile.firebaseId,
              chatPrice: profile.priceDetails?.chatCall || '100',
              audioCallPrice: profile.priceDetails?.audioCall || '200',
              videoCallPrice: profile.priceDetails?.videoCall || '500',
            }));
            setData(users);
            console.log('data========>>>>>>', profiles);

            setIsLoading(false);
          },
          (err) => {
            console.error('Error fetching users:', err);
            setError('Failed to load user data. Please try again.');
            setIsLoading(false);
          }
        )
      );
    } catch (e) {
      console.error('Unexpected error:', e.message);
      setError('Something went wrong. Please restart the app.');
      setIsLoading(false);
    }
  };

const getCards=async()=>{
  try {
    // const token = await AsyncStorage.getItem('token');
    // if (!token) throw new Error('Missing token');

     dispatch(getExpertiseAction((res) => {
                const expertiseData = res?.data?.expertises|| [];
                // setExpertise(expertiseData);
            
                // // Convert API response to dropdown format
                // const formattedItems = expertiseData.map((item) => ({
                //   label: item.title, // Display title in dropdown
                //   value: item._id, // Store expertise _id when selected
                // }));
            console.log('expertiseData------->>>>>',expertiseData);
            
                setExpertise(expertiseData);
              }));;
  } catch (e) {
    console.error('Unexpected error:', e.message);
    setError('Something went wrong. Please restart the app.');
    setIsLoading(false);
  }
}

  useEffect(() => {
    getData();
    getCards()
  }, []);
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('black');
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.BLACK_OPACITY(0.7) }}>
        {/* First Shimmer */}
        <ShimmerPlaceholder
          autoRun={true}
          style={{
            width: '95%',
            height: 60,
            marginBottom: 16,
            borderRadius: 8,
          }}
          shimmerColors={[COLORS.WHITE_OPACITY(0.02), COLORS.WHITE_OPACITY(0.03)]}
          LinearGradient={LinearGradient}
        />

        {/* 3 Rows of 2 Cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              autoRun={true}
              style={{
                width: '47%',
                height: 100,
                marginBottom: 8,
                borderRadius: 8,
              }}
              shimmerColors={[COLORS.WHITE_OPACITY(0.02), COLORS.WHITE_OPACITY(0.03)]}
              LinearGradient={LinearGradient}
            />
          ))}
        </View>

        {/* Button Shimmer */}
        <ShimmerPlaceholder
          autoRun={true}
          style={{
            width: '50%',
            height: 40,
            marginBottom: 16,
            borderRadius: 8,
          }}
          shimmerColors={[COLORS.WHITE_OPACITY(0.02), COLORS.WHITE_OPACITY(0.03)]}
          LinearGradient={LinearGradient}
        />

        {/* Big Card Shimmer */}
        <ShimmerPlaceholder
          autoRun={true}
          style={{
            width: '90%',
            height: 150,
            borderRadius: 8,
          }}
          shimmerColors={[COLORS.WHITE_OPACITY(0.02), COLORS.WHITE_OPACITY(0.03)]}
          LinearGradient={LinearGradient}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  const navigateToCategories = () => {
    navigation.navigate('KonnectionCategories', { cards: expertise })
  }
  const handleViewAll = () => {
    navigation.navigate('AllCardsScreen', { cards }); // Pass all card data to the next screen
  };

  const sendCallInvitation = (isVideoCall, userID, userName) => {
    console.log('isvideocall----->>>>', isVideoCall);
    console.log('userID----->>>>', userID);
    console.log('userName----->>>>', userName);

    console.log(ZegoUIKitPrebuiltCallService);
    if (!userID || !userName) {
      Alert.alert('Error', 'Please enter both User ID and User Name!');
      return;
    }

    if (!ZegoUIKitPrebuiltCallService) {
      console.error('Zego SDK is not initialized yet!');
      Alert.alert('Error', 'Zego SDK is not initialized yet!');
      return;
    }

    ZegoUIKitPrebuiltCallService.sendCallInvitation({
      invitees: [{ userID, userName }],
      type: isVideoCall ? 1 : 2, // 1 for video call, 2 for audio call
      resourceID: 'ConnectEx_ai', // Replace with your actual resource ID
    })
      .then(() => {
        Alert.alert(
          'Success',
          isVideoCall ? 'Video call invitation sent!' : 'Voice call invitation sent!'
        );
      })
      .catch((error) => {
        console.error('Error sending call invitation:', error);
        Alert.alert('Error', 'Failed to send call invitation. Please try again.');
      });
  };

  const RenderProfileCards = ({ item }) => {

    console.log('RenderProfileCards received item:', JSON.stringify(item, null, 2));
    const navigateToServiceOptions = ({ item }) => {
      navigation.navigate('ServiceOptions', { data: cards.data })

    }
    return (
      <LinearGradient
        colors={['rgba(255, 255, 255, .6)',   // Violete - fully opaque
          'rgba(255, 255, 255, 0.5)', // Violete - low opacity
          'rgba(6, 246, 239, 0.5)', // Brown - low opacity
          'rgba(6, 246, 239, 0.6)',]} // Blue to Transparent to Brown
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
       {item?.verified&&(
         <View style={{ backgroundColor: COLORS.BLACK_OPACITY(0.3), flexDirection: 'row', alignItems: 'center',paddingLeft:moderateScale(4),width:moderateScale(95),borderBottomRightRadius:10,padding:5 }}>
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
              //  onPress={() => {
              //   const imageUri = item?.image?.trim()
              //     ? `${IMAGE_BASE_URL}/${item.image}`
              //     : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg';
              //   console.log('Image URI:', imageUri);
              // }}
              >
                {/* <Image source={{ uri: item?.image?.trim() == '' && item?.image?.trim() ? `${IMAGE_BASE_URL}/${item.image}` : `https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg` }} style={styles.profileImage} /> */}
                <Image source={{ uri: item?.image?.trim() ? `${IMAGE_BASE_URL}/${item.image}` : `https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg` }} style={styles.profileImage} />

              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="star" size={16} color="orange" />
                <Text style={styles.ratingText}>{`4`}</Text>
              </View>
            </View>
            <View style={styles.infoSection}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.nameText}>{item?.name || 'User'}</Text>
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
              <Text style={styles.domainText}>{item?.designation || 'No description available'}</Text>
              <View style={{ marginTop: verticalScale(2) }}>
                <Text numberOfLines={2} style={{ fontSize: scale(10), color: COLORS.BLACK, fontWeight: '400' }}>{item.bio || 'No bio'}</Text>
              </View>
              <View style={styles.locationSection}>
                <MaterialIcons name="location-on" size={12} color={COLORS.BLACK} style={{}} />
                <Text style={styles.locationText}>{item?.location || 'Location not provided'}</Text>
              </View>
            </View>

          </View>

          {/* Keywords */}
          <View style={{ flexDirection: 'row', }}>
            <View style={{ marginTop: verticalScale(6), }}>
              <Text style={{ fontSize: scale(9), fontWeight: '500', marginTop: verticalScale(1), color: COLORS.BLACK }}>I can help with:</Text>
            </View>
            <View style={styles.tagsSection}>

              {Array.isArray(item.skills) && item.skills.length > 0 ? (
                <>
                  {item.skills.slice(0, 3).map((skill, index) => (
                    <Text key={index} style={[styles.tag,]}>
                      {skill}
                    </Text>
                  ))}
                  {item.skills.length > 3 && (
                    <Text style={styles.tag}>+{item.skills.length - 3} More</Text>
                  )}
                </>
              ) : (
                <Text style={{
                  fontSize: scale(11),
                  color: 'black',
                  fontStyle: 'italic',
                }}>
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
              onPress={() => { navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Message',source:'Home' }) }}
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item.chatPrice}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('item------->>>>>', item);

                navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Call',source:'Home' })
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item.audioCallPrice}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ServiceOptions', { data: item, ServiceType: 'Video Call' ,source:'Home'}) }}
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹{item.videoCallPrice}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </LinearGradient>


    )
  };

  const listHeaderComponent = () => {
    
    return (
      <>
        <View style={{ marginVertical: moderateScale(10), width: '100%', alignSelf: 'center' }}>
          <Text style={{ fontSize: scale(18), color: COLORS.WHITE, fontWeight: 'bold' }}>
            {/* Find the Best Person to Help You with Your Query */}
            {/* Get Instant Solutions with ConnectEx 😊 */}
            {/* 😊 Get Instant Solutions – ConnectEx_ai */}
           {/* Instant Solutions, Expert Guidance! */}
           Expert Guidance, Anytime, Anywhere!
          </Text>
          <Text style={{ fontSize: scale(14), color: COLORS.GREY, marginTop: moderateVerticalScale(10) }}>
            Discover professionals by expertise
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', }}>
          {visibleCards.map((item, index) => (
            <>
              <TouchableOpacity
              // onPress={() => { console.log(`id------>>>`,item._id) }}
                onPress={() => { navigation.navigate('IndustryExperts', { data: item._id }) }}
                // onPress={()=>{console.log(`${EXPERISE_IMAGE_BASE_URL}/${item.image}`);
                // }}
                // onPress={() => { navigation.navigate('CallScreen',) }}
                activeOpacity={0.7}
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? COLORS.WHITE : COLORS.app_violete, // Apply violet for 1, 3, 5 (even index), white for 2, 4, 6 (odd index)
                  borderRadius: 10,
                  // flex: 1, // Flexible width within row
                  margin: moderateScale(5), // Add spacing between cards
                  // padding: 10,
                  alignItems: 'center',
                  // justifyContent: 'center',
                  height: verticalScale(130),
                  width: '30%',

                }}
              >
                <Image source={{uri:`${EXPERISE_IMAGE_BASE_URL}/${item.image}`}} style={{ height: verticalScale(60), width: verticalScale(60), }} resizeMode='contain' />
                <View style={{ width: '100%', paddingHorizontal: 5 }}>
                  <Text numberOfLines={2} style={{ fontSize: scale(11), textAlign: 'center', fontWeight: 'bold', color: index % 2 === 0 ? COLORS.app_violete : COLORS.WHITE, }}>{item.title}</Text>
                </View>
                <View style={{ width: '100%', bottom: verticalScale(3), position: 'absolute', alignSelf: 'center', paddingHorizontal: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: scale(8), color: index % 2 === 0 ? COLORS.BLACK : COLORS.WHITE, fontWeight: "500" }}>{item.expertiseKeyword}</Text>
                </View>
              </TouchableOpacity></>
          ))}
        </View>
        <TouchableOpacity
          onPress={navigateToCategories}
          // onPress={() => { navigation.navigate('CallScreen',) }}
          activeOpacity={0.7} style={{ height: verticalScale(33), backgroundColor: COLORS.app_violete, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', borderRadius: scale(10), marginVertical: verticalScale(8) }}>
          <Text style={{ color: COLORS.WHITE, fontWeight: '500' }}>View All</Text>
          <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 100, marginHorizontal: 5 }}>
            <Feather name="arrow-up-right" size={24} color={COLORS.app_violete} />
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const ListFooterComponent = () => {
    return (
      <>{users.map(user => (
        <View key={user.id} style={[styles.cardContainer, { backgroundColor: 'red', justifyContent: 'space-between' }]}>
          <View>
            <Text style={styles.nameText}>Name: {user.name}</Text>
            <Text style={styles.nameText}>Email: {user.email}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <ZegoSendCallInvitationButton

              invitees={[{ userID: user.email, userName: user.name }]}
              isVideoCall={true}
              resourceID={"zego_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
            />
            <ZegoSendCallInvitationButton
              invitees={[{ userID: user.email, userName: user.name }]}
              isVideoCall={false}
              resourceID={"zego_call"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
            />
          </View>
          <View style={styles.pricingSection}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ChatScreen', { data: user, ServiceType: 'Message', firebaseId: firebaseId }) }}
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => { navigation.navigate('ChatScreen', { data: user, ServiceType: 'Call', }) }}
              onPress={() => sendCallInvitation(false, user.email, user.name)} // Video call
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹1000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => { navigation.navigate('ChatScreen', { data: user, ServiceType: 'Video Call' }) }}
              onPress={() => {
                console.log('Custom Call Button Pressed');
                sendCallInvitation(true, user.email, user.name); // Video Call
              }}
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

              <Text style={{ marginLeft: 2, fontSize: scale(12), color: COLORS.BLACK }}>₹2000</Text>
            </TouchableOpacity>
            {/* <Text style={styles.priceTag}>₹1000</Text> <Text style={styles.priceTag}>₹2000</Text> */}
          </View>
        </View>
      ))}
        {/* <TouchableOpacity onPress={getdata}>
          <Text style={{ color: 'white' }}>get</Text>
        </TouchableOpacity> */}
        <View style={{ height: Platform.OS == 'ios' ? verticalScale(100) : verticalScale(60) }}></View>
      </>
    )
  }

  return (

    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0} // Adjust this value as per your header height
      >
        <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
          <View style={{ height: safeAreaInsets.top }} />
          <StatusBar backgroundColor={COLORS.BLACK} />
          {/* Search Header */}
          <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10), }}>
            <Image
              resizeMode='cover'
              style={{ height: verticalScale(43), width: verticalScale(43), borderRadius: 100, }}
              source={IMAGES.markleLogo}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Search)}
              activeOpacity={0.7}
              style={{
                paddingVertical: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(0),
                borderWidth: 1,
                borderColor: COLORS.LIGHT_GREY,
                // paddingLeft: 3,
                borderRadius: 17,
                marginHorizontal: moderateScale(5),
                width: Platform.OS === 'ios' ? moderateScale(235) : moderateScale(235),
                height: Platform.OS === 'ios' ? verticalScale(37) : verticalScale(33),
                justifyContent: 'center',
                alignItems: "center"
              }}
            >
              <Text style={{ color: COLORS.GREY, fontSize: scale(11), }}>
                Find people by name, skills, or industry...
              </Text>
            </TouchableOpacity>
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

          {/* Additional Data List Section */}
          <View style={{ marginTop: verticalScale(0), paddingHorizontal: moderateScale(5) }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeaderComponent}
              data={data}
              // data={profiles}

              renderItem={({ item }) => <RenderProfileCards item={item} />}
              // renderItem={({ item }) => <UserItem user={item} />}
              ListFooterComponent={ListFooterComponent}
              keyExtractor={(item) => item.id}
              style={{ marginTop: verticalScale(10) }}
            />
            <TouchableOpacity onPress={() => {
              console.log('data------>>>>', data);
            }}>
              <Text style={{ color: COLORS.WHITE }}>get</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: safeAreaInsets.bottom }} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Home;

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
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'green'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE
  },
  email: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    color: 'green',
  },
});