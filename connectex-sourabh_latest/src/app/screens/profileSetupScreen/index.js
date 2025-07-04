import {
    View,
    ImageBackground,
    TextInput,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IMAGE_BASE_URL } from '../../../utils/config';
import { useDispatch } from 'react-redux';
import { editProfileAction, fetchKeywordAction, getExpertiseAction } from '../../../redux/action';
import Toast from 'react-native-simple-toast';
import { GET_EXPERTISE_ACTION } from '../../../redux/action/types';



const screenWidth = Dimensions.get('window').width; // Get the screen width
const numDots = 12; // Number of dots
const dotSize = screenWidth / (numDots * 1.7); // Calculate dot size and spacing


const ProfileSetup = ({ props }) => {
    const route = useRoute();
    const { profileData } = route?.params || {}
    const preSelectedSkills = profileData?.myExpertise?.skills; // Skills from the previous screen
    const expertiseArea = profileData?.expertiseArea || null;
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const fullImageBaseUrl = `${IMAGE_BASE_URL}/public/profileImage`
    const DEFAULT_IMAGE = 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg';

    const [imageUri, setImageUri] = useState(profileData?.basicInfo?.image ? `${IMAGE_BASE_URL}/${profileData.basicInfo.image}` : DEFAULT_IMAGE);
    const [imageFile, setImageFile] = useState(null)
    const [email, setEmail] = useState(profileData?.email); // Set initial email state
    const [firstNameState, setFirstNameState] = useState(profileData?.basicInfo?.name.split(" ")[0] || ""); // Default empty string
    const [lastNameState, setLastNameState] = useState(profileData?.basicInfo?.name.split(" ")[1] || ""); // Default empty string
    const [designation, setDesignation] = useState(profileData?.basicInfo?.designation || ''); // Set initial value
    const [dob, setDob] = useState(profileData?.basicInfo?.dob || 'Choose Date'); // Set initial value
    const [phone, setPhone] = useState(profileData?.basicInfo?.phone || ''); // Set initial value
    const [experienceInYears, setExperienceInYears] = useState(profileData?.aboutMe?.experienceInYear || 0); // Set initial value
    const [currentOrganization, setCurrentOrganization] = useState(profileData?.aboutMe?.organization || ''); // Set initial value
    const [location, setLocation] = useState(profileData?.aboutMe?.location || ''); // Set initial value   profileData?.aboutMe?.describeYourself
    const [describeYourself, setDescribeYourself] = useState(profileData?.aboutMe?.describeYourself || ''); // Set initial value
    const [audioCallPrice, setAudioCallPrice] = useState(profileData?.priceDetails?.audioCall || ''); // Set initial value
    const [videoCallPrice, setvideoCallPrice] = useState(profileData?.priceDetails?.videoCall || ''); // Set initial value
    const [chatPrice, setChatPrice] = useState(profileData?.priceDetails?.chatCall || ''); // Set initial value
    const [linkedin, setlinkedin] = useState(profileData?.socialLinks?.linkedin || ''); // Set initial value
    const [instagram, setInstagram] = useState(profileData?.socialLinks?.instagram || ''); // Set initial value
    const [youtube, setYoutube] = useState(profileData?.socialLinks?.youtube || '');
    const [twitter, setTwitter] = useState(profileData?.socialLinks?.twitter || '');
    const [facebook, setFacebook] = useState(profileData?.socialLinks?.facebook || '');
    const [fetchKeywords, setFetchKeywords] = useState([]);
    const [filteredKeywords, setFilteredKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]); // For selected/custom skills
    const [inputValue, setInputValue] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sectionsState, setSectionsState] = useState({ basicInfo: false, aboutMe: false, myExpertise: false, pricingDetails: false, socialMediaLinks: false, });
    const [loading, setLoading] = useState(false); // Loader state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(expertiseArea); // Set initial value from params
    const [items, setItems] = useState([]);
    const [expertise, setExpertise] = useState([]);


    const firstName = profileData?.basicInfo?.name?.split(" ")[0] || "";
    const lastName = profileData?.basicInfo?.name?.split(" ")[1] || "";
    const fullName = firstNameState + " " + lastNameState

    useEffect(() => {
        // Fetch all available keywords from backend

        dispatch(getExpertiseAction((res) => {
            const expertiseData = res?.data?.expertises || [];
            setExpertise(expertiseData);
        
            // Convert API response to dropdown format
            const formattedItems = expertiseData.map((item) => ({
              label: item.title, // Display title in dropdown
              value: item._id, // Store expertise _id when selected
            }));
        console.log('formattedItems------->>>>>',formattedItems);
        
            setItems(formattedItems);
          }));

        dispatch(fetchKeywordAction((res) => {
            setFetchKeywords(res?.data?.keywords?.map((k) => k.keyWordName) || []);

            // Update selectedKeywords with pre-selected skills
            setSelectedKeywords(preSelectedSkills);
            // console.log("bsbsjjsbbskj", preSelectedSkills);

        }));
    }, []);

    useEffect(() => {
        if (expertiseArea) {
          setValue(expertiseArea); // Update value if expertiseArea exists
        }
      }, [expertiseArea]);

    // console.log('fetchKeywords-------->>>>>', fetchKeywords);
    // console.log('profileData------->>>>', profileData); 
    console.log('value------>>>',value);
    
    const payload = {
        image: imageFile,
        // email: email,
        name: fullName,
        designation: designation,
        ...(dob !== 'Choose Date' && { dob }),
        phone: phone,
        experienceInYear: experienceInYears,
        organization: currentOrganization,
        location: location,
        describeYourself: describeYourself,
        skills: selectedKeywords,
        expertiseArea: value,
        chatCall: chatPrice,
        audioCall: audioCallPrice,
        videoCall: videoCallPrice,
        linkedin: linkedin,
        instagram: instagram,
        youtube: youtube,
        twitter: twitter,
        facebook: facebook
    }

    const handleUpdate = () => {
        setLoading(true);
        // console.log('selectedKeywords1------>>>>', selectedKeywords); // true

        dispatch(editProfileAction(payload, (res) => {
            setLoading(false);

            if (res?.data?.success) {
                Toast.show(res?.data?.message || 'Profile updated successfully!', Toast.SHORT);
                navigation.goBack();
            } else {
                Toast.show(res?.data?.message || 'Failed to update profile!', Toast.SHORT);
            }
        }));
    };
    const handleInputChange = (text) => {
        setInputValue(text); // Update the input value

        // Filter the keywords based on the text input
        if (text.trim() !== '') {
            const filtered = fetchKeywords.filter((keyword) =>
                keyword.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredKeywords(filtered);
        } else {
            setFilteredKeywords([]); // Clear dropdown if input is empty
        }
    };


    const handleCustomKeyword = () => {
        if (
            inputValue.trim() &&
            !selectedKeywords.includes(inputValue) &&
            selectedKeywords.length < 5
        ) {
            setSelectedKeywords([...selectedKeywords, inputValue.trim()]);
            setInputValue("");
            setFilteredKeywords([]);
        }
    };

    const handleAddKeyword = (keyword) => {
        // Check if the keyword is already in the selected list
        if (!selectedKeywords.includes(keyword)) {
            setSelectedKeywords([...selectedKeywords, keyword]); // Add to selected keywords
        }
    };
    ;

    const handleRemoveKeyword = (keyword) => {
        setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword));
    };

    const handleFirstNameChange = (text) => setFirstNameState(text);
    const handleLastNameChange = (text) => setLastNameState(text);


    const handleSectionClick = (section) => {
        setSectionsState((prevState) => ({
            ...prevState,
            [section]: !prevState[section], // Toggle the clicked section
        }));
    };


    // console.log("experienceInYears=======>>>>", payload);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); // Close the date picker

        if (selectedDate) {
            // Format the selected date as DD/MM/YYYY
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
            const year = selectedDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            setDob(formattedDate); // Update the DOB state
        }
        // If `selectedDate` is null (user canceled the picker), keep the existing `dob`
    };

    const openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then((image) => {
                // Update displayed image
                setImageUri(image.path);

                // Prepare the image file for uploading
                setImageFile({
                    uri: image.path,
                    type: image.mime,
                    name: image.path.split('/').pop(), // Extract file name
                });
            })
            .catch((error) => {
                console.log('ImagePicker Error:', error);
            });
    };


    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
                <View style={{ height: safeAreaInsets.top }} />
                <StatusBar backgroundColor={COLORS.BLACK} />
                {/* back Header */}
                <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: verticalScale(30), width: verticalScale(30), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>Set up your profile</Text>
                </View>


                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={verticalScale(100)}>
                    {/* <ScrollView> */}
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(35) }}>
                        <View style={{ height: verticalScale(90), width: verticalScale(90), borderRadius: 100, }}>
                            {/* <Image source={IMAGES.model6} style={{ height: verticalScale(90), width: verticalScale(90), borderRadius: 100, borderWidth: 1, borderColor: COLORS.WHITE, }} /> */}
                            <Image resizeMode='cover' source={{ uri: imageUri }} style={{ height: verticalScale(90), width: verticalScale(90), borderRadius: 100, borderWidth: 1, borderColor: COLORS.WHITE, }} />
                            <TouchableOpacity onPress={openPicker} style={{ borderWidth: 0.8, borderColor: COLORS.WHITE, backgroundColor: '#1877F2', position: 'absolute', right: moderateScale(5), bottom: verticalScale(9), height: verticalScale(15), width: verticalScale(15), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome6 name="plus" color={COLORS.WHITE} size={scale(13)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={{ width: '98%', alignSelf: 'center', height: verticalScale(70), backgroundColor: COLORS.WHITE_OPACITY(0.3), borderRadius: 10, marginVertical: verticalScale(15) }}>

                    </View> */}
                    <View style={{ width: '98%', alignSelf: 'center', marginTop: verticalScale(25) }}>
                        {/* Basic Info Section */}
                        <TouchableOpacity style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), height: verticalScale(33), borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(8), marginVertical: verticalScale(7) }}
                            onPress={() => handleSectionClick('basicInfo')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="infocirlce" size={15} color={COLORS.WHITE_OPACITY(0.7)} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: COLORS.WHITE_OPACITY(0.7) }}>Basic Info</Text>
                            </View>
                            <Entypo name={sectionsState.basicInfo ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.WHITE_OPACITY(0.7)} />
                        </TouchableOpacity>
                        <Collapsible collapsed={!sectionsState.basicInfo}>
                            <View>
                                <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>What should we call you?</Text>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={firstNameState} onChangeText={(text) => handleFirstNameChange(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="First Name" />
                                    </View>
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginLeft: moderateScale(5) }} >
                                        <TextInput value={lastNameState} onChangeText={(text) => handleLastNameChange(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Last Name" />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>What is your current designation?</Text>
                                    <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={designation} onChangeText={(text) => setDesignation(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="E.g., product manager,analyst or student.... " />
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>When is your birthday?</Text>
                                    {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={
                                                dob !== 'Choose Date'
                                                    ? new Date(dob.split('/').reverse().join('-')) // Parse existing dob to Date
                                                    : new Date() // Fallback to today's date
                                            }
                                            mode="date" // Date selection only
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Different display for iOS/Android
                                            onChange={handleDateChange} // Handle date selection
                                            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 6))} // Maximum date: 6 years ago
                                            minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 100))} // Minimum date: 100 years ago
                                        />
                                    )}

                                    <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.7} style={{ height: verticalScale(35), borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, alignItems: 'center', justifyContent: 'space-between', borderRadius: 8, marginRight: moderateScale(5), flexDirection: 'row', paddingHorizontal: moderateScale(8) }} >
                                        <Text style={{ paddingHorizontal: moderateScale(5), color: dob !== 'Choose Date' ? COLORS.WHITE : COLORS.WHITE_OPACITY(0.5), }} >{`${dob}`}</Text>
                                        <AntDesign name="calendar" size={scale(15)} color={COLORS.WHITE_OPACITY(0.7)} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>
                                        Phone number
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* Fixed text for +91 */}
                                    <View
                                        style={{ height: Platform.OS === 'ios' ? verticalScale(35) : verticalScale(40), borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(10), borderRadius: 8, marginRight: moderateScale(5), }} >
                                        <Text style={{ color: COLORS.WHITE, fontSize: moderateScale(14) }}>+91</Text>
                                    </View>

                                    {/* TextInput */}
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : verticalScale(40), borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8 }} >
                                        <TextInput value={phone} onChangeText={(text) => setPhone(text)} style={{ paddingHorizontal: moderateScale(10), color: COLORS.WHITE }}
                                            placeholderTextColor={COLORS.WHITE_OPACITY(0.6)}
                                            placeholder="Enter your phone number"
                                            keyboardType="phone-pad" />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{}}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>Email ID</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: verticalScale(35), flex: 1, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), borderRadius: 8, justifyContent: 'center', }} >
                                        {/* <TextInput value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Enter a valid email ID" /> */}
                                        <Text style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE }} >{`${email}`}</Text>
                                    </View>

                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '98%',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginTop: verticalScale(10),
                                    marginBottom: verticalScale(5),
                                }}
                            >
                                {Array.from({ length: numDots }).map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: dotSize, // Dot width
                                            height: dotSize / 20, // Dot height
                                            backgroundColor: COLORS.GREY_OPACITY(0.5), // Dot color
                                            borderRadius: dotSize / 2, // Make it circular
                                        }}
                                    />
                                ))}

                            </View>

                        </Collapsible>

                        {/* About Me Section */}
                        <TouchableOpacity style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), height: verticalScale(33), borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(8), marginVertical: verticalScale(7) }}
                            onPress={() => handleSectionClick('aboutMe')}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="form" size={15} color={COLORS.WHITE_OPACITY(0.7)} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: COLORS.WHITE_OPACITY(0.7) }}>About me</Text>
                            </View>
                            <Entypo name={sectionsState.aboutMe ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.WHITE_OPACITY(0.7)} />
                        </TouchableOpacity>
                        <Collapsible collapsed={!sectionsState.aboutMe}>
                            <View style={{}}>
                                <View style={{}}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>What is your total work experience?</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={experienceInYears.toString()} onChangeText={(text) => setExperienceInYears(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} maxLength={2} keyboardType='number-pad' placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="Experience in years" />
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>What is your current organization?</Text>
                                    <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={currentOrganization} onChangeText={(text) => setCurrentOrganization(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="E.g., Google,Microsoft,etc. " />
                                    </View>

                                </View>
                            </View>

                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{}}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>Where are you based?</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={location} onChangeText={(text) => setLocation(text)} style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="E.g. New Delhi, Banglore, Mumbai ....." />
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>How would you describe yourself?</Text>
                                    <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 110 chars</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, justifyContent: 'center', borderRadius: 8, marginRight: moderateScale(5) }} >
                                        <TextInput value={describeYourself} onChangeText={(text) => setDescribeYourself(text)} defaultValue='I can help with' style={{ paddingHorizontal: moderateScale(5), color: COLORS.WHITE, }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder="E.g. I am driven ales proffessional with 3+ years of experience inB2B and B2C sales " />
                                    </View>

                                </View>
                            </View>
                            {/* ****************** */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '98%',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginTop: verticalScale(10),
                                    marginBottom: verticalScale(5),
                                }}
                            >
                                {Array.from({ length: numDots }).map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: dotSize, // Dot width
                                            height: dotSize / 20, // Dot height
                                            backgroundColor: COLORS.GREY_OPACITY(0.5), // Dot color
                                            borderRadius: dotSize / 2, // Make it circular
                                        }}
                                    />
                                ))}

                            </View>
                        </Collapsible>

                        {/* My Expertise Section */}
                        <TouchableOpacity style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), height: verticalScale(33), borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(8), marginVertical: verticalScale(7) }}
                            onPress={() => handleSectionClick('myExpertise')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Foundation name="lightbulb" size={15} color={COLORS.WHITE_OPACITY(0.7)} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: COLORS.WHITE_OPACITY(0.7) }}>My Expertise</Text>
                            </View>
                            <Entypo name={sectionsState.myExpertise ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.WHITE_OPACITY(0.7)} />
                        </TouchableOpacity>
                        <Collapsible collapsed={!sectionsState.myExpertise}>
                            <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>Please select your expertise area</Text>
                            {/* <DropDownPicker
                               open={open}
                               placeholder="Select your expertise"
                               value={value}
                               items={items}
                               setOpen={setOpen}
                               setValue={setValue}
                               setItems={setItems}
                                style={{
                                    backgroundColor: COLORS.WHITE_OPACITY(0.3), // Dropdown box background color
                                    borderWidth: 0, // Remove border if needed
                                }}
                                placeholderStyle={{
                                    color: COLORS.WHITE_OPACITY(0.7), // Placeholder text color
                                    fontWeight: "bold",
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: COLORS.WHITE, // Dropdown list background color
                                    // maxHeight: 200, // Make dropdown scrollable when items exceed this height
                                  }}
                                  flatListProps={{
                                    nestedScrollEnabled: true, // Fix nested FlatList issue
                                  }}
                                arrowIconStyle={{
                                    tintColor: COLORS.WHITE, // Change dropdown arrow icon to white
                                }}
                                textStyle={{
                                    color: COLORS.WHITE, // Make selected text white
                                }}
                                listItemLabelStyle={{
                                    color: COLORS.BLACK, // Dropdown list items text color
                                }}
                            /> */}



                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: COLORS.LIGHT_GREY_OPACITY(0.7), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}> In what areas you can help others?</Text>
                                {/* <Text style={{ color: COLORS.GREY_OPACITY(0.4), marginTop: verticalScale(5), fontSize: scale(11) }}>Max: 5</Text> */}
                            </View>
                            <TextInput
                                value={inputValue}
                                onChangeText={handleInputChange}
                                onSubmitEditing={handleCustomKeyword}
                                style={{ paddingHorizontal: moderateScale(5), backgroundColor: COLORS.WHITE_OPACITY(0.3), borderRadius: 8, width: '99%', alignSelf: 'center' }}
                                placeholderTextColor={COLORS.WHITE_OPACITY(0.6)}
                                placeholder="Entrepreneurship/Design/Coding/Marketing etc."
                            />

                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                                {selectedKeywords.map((keyword, index) => (
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>{keyword}</Text>
                                        <TouchableOpacity onPress={() => handleRemoveKeyword(keyword)}>
                                            <AntDesign name="closecircle" size={16} color={COLORS.WHITE_OPACITY(0.5)} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            {filteredKeywords.length > 0 && (
                                <ScrollView style={styles.dropdown}>
                                    {filteredKeywords.map((keyword, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleAddKeyword(keyword)}
                                            style={styles.dropdownItem}
                                        >
                                            <Text>{keyword}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}





                            {/* ****************** */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '98%',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginTop: verticalScale(10),
                                    marginBottom: verticalScale(5),
                                }}
                            >
                                {Array.from({ length: numDots }).map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: dotSize, // Dot width
                                            height: dotSize / 20, // Dot height
                                            backgroundColor: COLORS.GREY_OPACITY(0.5), // Dot color
                                            borderRadius: dotSize / 2, // Make it circular
                                        }}
                                    />
                                ))}

                            </View>
                        </Collapsible>

                        {/* Pricing Details Section */}
                        <TouchableOpacity style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), height: verticalScale(33), borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(8), marginVertical: verticalScale(7) }}
                            onPress={() => handleSectionClick('pricingDetails')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={15} color={COLORS.WHITE_OPACITY(0.7)} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: COLORS.WHITE_OPACITY(0.7) }}>Pricing Details</Text>
                            </View>
                            <Entypo name={sectionsState.pricingDetails ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.WHITE_OPACITY(0.7)} />
                        </TouchableOpacity>
                        <Collapsible collapsed={!sectionsState.pricingDetails}>
                            <View style={{}}>
                                <Text style={{ color: COLORS.WHITE_OPACITY(0.9), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5) }}>A 20% platform fee will be deducted to enhance your ConnectEx_ai experience.</Text>
                            </View>
                            <View style={{ marginTop: verticalScale(7) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: verticalScale(18), width: verticalScale(18), borderWidth: scale(2), borderColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                        <FontAwesome name="phone" size={13} color={COLORS.WHITE} />
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5), fontWeight: 'bold' }}>Audio Call</Text>
                                        <Text style={{ color: COLORS.WHITE_OPACITY(0.9), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), }}>Set your hourly prices , users will pay per minute</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name="rupee" size={13} color={COLORS.WHITE} />
                                            <TextInput keyboardType='numeric' value={audioCallPrice.toString()} onChangeText={(text) => setAudioCallPrice(text)} style={{ color: COLORS.WHITE, flex: 0.9 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} />
                                        </View>
                                        <Text style={{ color: COLORS.WHITE }}>/hr</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(7) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: verticalScale(18), width: verticalScale(18), borderWidth: scale(2), borderColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                        <FontAwesome name="video-camera" size={12} color={COLORS.WHITE} />
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5), fontWeight: 'bold' }}>Video Call</Text>
                                        <Text style={{ color: COLORS.WHITE_OPACITY(0.9), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), }}>Set your hourly prices , users will pay per minute</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name="rupee" size={13} color={COLORS.WHITE} />
                                            <TextInput keyboardType='numeric' value={videoCallPrice.toString()} onChangeText={(text) => setvideoCallPrice(text)} style={{ color: COLORS.WHITE, flex: 0.9 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} />
                                        </View>
                                        <Text style={{ color: COLORS.WHITE }}>/hr</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(7) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: verticalScale(18), width: verticalScale(18), borderWidth: scale(2), borderColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>

                                        <Ionicons name="chatbox-ellipses" size={13} color={COLORS.WHITE} />
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), marginBottom: verticalScale(2), marginTop: verticalScale(5), fontWeight: 'bold' }}>Chat</Text>
                                        <Text style={{ color: COLORS.WHITE_OPACITY(0.9), paddingLeft: moderateScale(5), marginBottom: verticalScale(2), }}>Set price for users to initiate chat</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name="rupee" size={13} color={COLORS.WHITE} />
                                            <TextInput keyboardType='number-pad' value={chatPrice.toString()} onChangeText={(text) => setChatPrice(text)} style={{ color: COLORS.WHITE, flex: 0.9 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} />
                                        </View>
                                        <Text style={{ color: COLORS.WHITE }}>/hr</Text>
                                    </View>

                                </View>
                            </View>
                            {/* ****************** */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '98%',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginTop: verticalScale(10),
                                    marginBottom: verticalScale(5),
                                }}
                            >
                                {Array.from({ length: numDots }).map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: dotSize, // Dot width
                                            height: dotSize / 20, // Dot height
                                            backgroundColor: COLORS.GREY_OPACITY(0.5), // Dot color
                                            borderRadius: dotSize / 2, // Make it circular
                                        }}
                                    />
                                ))}

                            </View>
                        </Collapsible>

                        {/* Social Media Links Section */}
                        <TouchableOpacity style={{ backgroundColor: COLORS.WHITE_OPACITY(0.3), height: verticalScale(33), borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: moderateScale(8), marginVertical: verticalScale(7) }}
                            onPress={() => handleSectionClick('socialMediaLinks')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="link" size={15} color={COLORS.WHITE_OPACITY(0.7)} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: COLORS.WHITE_OPACITY(0.7) }}>Social Media Links</Text>
                            </View>
                            <Entypo name={sectionsState.socialMediaLinks ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.WHITE_OPACITY(0.7)} />
                        </TouchableOpacity>
                        <Collapsible collapsed={!sectionsState.socialMediaLinks}>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(5) }}>
                                    <Ionicons name="logo-linkedin" size={18} color={COLORS.WHITE} />
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), fontWeight: 'bold' }}>Linkedin</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput value={linkedin} onChangeText={(text) => setlinkedin(text)} style={{ color: COLORS.WHITE, flex: 0.95 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Add link' />
                                        </View>
                                        <FontAwesome name="pencil" size={13} color={COLORS.WHITE} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(5) }}>
                                    <Ionicons name="logo-instagram" size={18} color={COLORS.WHITE} />
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), fontWeight: 'bold' }}>Instagram</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput value={instagram} onChangeText={(text) => setInstagram(text)} style={{ color: COLORS.WHITE, flex: 0.95 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Add link' />
                                        </View>
                                        <FontAwesome name="pencil" size={13} color={COLORS.WHITE} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(5) }}>
                                    <Ionicons name="logo-youtube" size={18} color={COLORS.WHITE} />
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), fontWeight: 'bold' }}>Youtube</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput value={youtube} onChangeText={(text) => setYoutube(text)} style={{ color: COLORS.WHITE, flex: 0.95 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Add link' />
                                        </View>
                                        <FontAwesome name="pencil" size={13} color={COLORS.WHITE} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(5) }}>
                                    <Ionicons name="logo-twitter" size={18} color={COLORS.WHITE} />
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), fontWeight: 'bold' }}>twitter</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput value={twitter} onChangeText={(text) => setTwitter(text)} style={{ color: COLORS.WHITE, flex: 0.95 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Add link' />
                                        </View>
                                        <FontAwesome name="pencil" size={13} color={COLORS.WHITE} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: verticalScale(10) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(5) }}>
                                    <Ionicons name="logo-facebook" size={18} color={COLORS.WHITE} />
                                    <View>
                                        <Text style={{ color: COLORS.WHITE, paddingLeft: moderateScale(5), fontWeight: 'bold' }}>Facebook</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ height: Platform.OS === 'ios' ? verticalScale(35) : undefined, borderWidth: 1, backgroundColor: COLORS.WHITE_OPACITY(0.3), flex: 1, borderRadius: 8, alignItems: 'center', paddingLeft: moderateScale(5), flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput value={facebook} onChangeText={(text) => setFacebook(text)} style={{ color: COLORS.WHITE, flex: 0.95 }} placeholderTextColor={COLORS.WHITE_OPACITY(0.6)} placeholder='Add link' />
                                        </View>
                                        <FontAwesome name="pencil" size={13} color={COLORS.WHITE} />
                                    </View>
                                </View>
                            </View>
                            {/* ****************** */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '98%',
                                    overflow: 'hidden',
                                    alignSelf: 'center',
                                    marginTop: verticalScale(10),
                                    marginBottom: verticalScale(5),
                                }}
                            >
                                {Array.from({ length: numDots }).map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: dotSize, // Dot width
                                            height: dotSize / 20, // Dot height
                                            backgroundColor: COLORS.GREY_OPACITY(0.5), // Dot color
                                            borderRadius: dotSize / 2, // Make it circular
                                        }}
                                    />
                                ))}

                            </View>
                        </Collapsible>
                    </View>



                    <View style={{ width: '98%', alignSelf: 'center', height: verticalScale(70), borderRadius: 10, marginVertical: verticalScale(15) }}>
                    </View>
                    {/* </ScrollView> */}
                </KeyboardAwareScrollView>
                <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: COLORS.app_violete, width: '98%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingVertical: verticalScale(12), borderRadius: scale(10), bottom: verticalScale(5) }}>
                    <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: 'bold' }}>{loading ? <ActivityIndicator size={'small'} color={COLORS.WHITE} /> : `Update`}</Text>
                </TouchableOpacity>
                <View style={{ height: safeAreaInsets.bottom, }} />
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionContent: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    textInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    dropdown: {
        // position: "absolute",
        // top: 45,
        // left: 0,
        // right: 0,
        paddingTop: 5,
        // height: verticalScale(200),
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownItem: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        // height: verticalScale(30)
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.WHITE_OPACITY(0.3),
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        marginBottom: 8,
        // borderWidth: 0.5,
        borderColor: COLORS.WHITE
    },
    tagText: {
        marginRight: 5,
        color: COLORS.WHITE,
        fontSize: scale(10)
    },
});

export default ProfileSetup


