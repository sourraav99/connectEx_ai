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
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { IMAGES, imageUris } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { IMAGE_BASE_URL } from '../../../utils/config';


const ChatScreen = ({ props }) => {
    const route = useRoute();
    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation();

    //firebaseId= this is logged in user fb id  
    //data.firebaseId = this is user fb id we want to chat  
    const { data, firebaseId,source } = route?.params || {};
    // console.log(data);
    console.log('source---->>>>',source);
    console.log("firebaseId====>>>", firebaseId);
    console.log('firebaseId---------->>>>>>', data.firebaseId);

    const [messages, setMessages] = useState([]);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const userName = source === 'home' ? data.name : data.basicInfo?.name;
    const onInputTextChanged = (text) => {
        setInputText(text);  // Update the inputText state when user types
    };

    useEffect(() => {
        const subscriber = firestore()
            .collection("chats")
            .doc(firebaseId + data.firebaseId)
            .collection('messages')
            .orderBy("createdAt", "desc")
            .onSnapshot(querySnapShot => {
                const allMessages = querySnapShot.docs.map(item => {
                    return {
                        ...item.data(),
                        createdAt: item.data().createdAt?.toDate() || new Date(),
                    };

                });
                console.log("Received messages: ", allMessages);  // Add this log
                setMessages(allMessages);
                setLoading(false);
            });

        // Return the unsubscribe function to remove the listener when the component unmounts
        return () => subscriber();
    }, []);


    const onSend = useCallback((newMessages = []) => {
        const msg = newMessages[0];
        const myMsg = {
            ...msg,
            sendby: firebaseId,
            sendTo: data.firebaseId,
            // createdAt: Date.parse(msg.createdAt)
            createdAt: msg.createdAt || new Date(),
        }
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, myMsg)
        );
        firestore().collection("chats").doc('' + firebaseId + data.firebaseId).collection('messages').add(myMsg)
        firestore().collection("chats").doc('' + data.firebaseId + firebaseId).collection('messages').add(myMsg)
    }, []);

    const renderSend = (props) => {
        const isSendDisabled = inputText.trim().length === 0; // Disable when input is empty
        return (
            <Send {...props}>
                <View
                    style={[
                        styles.sendButton,
                        {
                            backgroundColor: isSendDisabled ? COLORS.GREY : COLORS.app_violete,
                            marginBottom: keyboardVisible ? verticalScale(2) : verticalScale(2)
                        },
                    ]}
                >
                    <Entypo name="paper-plane" size={moderateScale(20)} color={COLORS.WHITE} />
                </View>
            </Send>
        );
    };
    // <View style={[styles.sendButton,{ marginBottom:keyboardVisible?verticalScale(24.5):verticalScale(2)}]}>
    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}

                containerStyle={{
                    backgroundColor: 'transparent',//COLORS.WHITE_OPACITY(0.5)
                    // marginBottom: keyboardVisible ? 0 : 0
                }}
            />

        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                        marginLeft: 0, // Adjust margins if needed
                        maxWidth: '75%',
                    },
                    left: {
                        backgroundColor: '#f0f0f0',
                        marginRight: 0,
                        maxWidth: '75%',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.app_violete} />
                <Text style={styles.loaderText}>Loading Chat...</Text>
            </View>
        );
    }


    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Replace 'Home' with your home screen name
        });
    };
    return (
        <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.38) }}>
                <View style={{ height: safeAreaInsets.top }} />
                <StatusBar backgroundColor={COLORS.BLACK} />
                {/* Search Header */}
                <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10), }}>
                    <TouchableOpacity onPress={navigateToHome} style={{ height: verticalScale(30), width: verticalScale(30), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <View style={{}}>
                        <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}>{`${userName}`}</Text>
                    </View>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{
                        _id: firebaseId, // Current user ID
                        avatar: data?.image?.trim() ? `${IMAGE_BASE_URL}/${data.image}` : IMAGES.userPNG, // User's avatar
                    }}
                    placeholder="Type your question here..."
                    renderSend={renderSend}
                    keyboardShouldPersistTaps='always'
                    renderInputToolbar={renderInputToolbar}
                    renderBubble={renderBubble}
                    renderAvatar={(avatarProps) => {
                        // const avatarUrl = avatarProps?.currentMessage?.user?.avatar || IMAGES.userPNG;
                        // Use the avatar from the message or fallback to default image
                        const avatarUrl = String(avatarProps?.currentMessage?.user?.avatar || IMAGES.userPNG);
                        console.log('data:', data);
                        console.log('currentMessage:', avatarProps?.currentMessage);
                        console.log('avatarUrl:', avatarUrl, 'Type:', typeof avatarUrl);
                        return <Image source={{ uri: IMAGES.userPNG }} style={{ width: 35, height: 35, borderRadius: 35 / 2 }} />;

                        // console.log(avatarUrl);

                        // return <Image source={{ uri: avatarUrl }} style={{ width: 35, height: 35, borderRadius: 35 / 2, }} />;
                    }}
                    alwaysShowSend
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                    textInputStyle={styles.textInput}
                    onInputTextChanged={onInputTextChanged} // Track the text input changes

                />
                <View style={{ height: safeAreaInsets.bottom }} />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(70),
        marginBottom: verticalScale(20),
    },
    headerImage: {
        width: '100%',
        height: verticalScale(100),
    },
    headerText: {
        color: COLORS.WHITE,
        textAlign: 'center',
        marginTop: verticalScale(20),
    },
    textInput: {
        backgroundColor: COLORS.WHITE_OPACITY(0.5),
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        color: COLORS.BLACK,
        // marginTop:verticalScale(50)

    },
    sendButton: {
        marginRight: moderateScale(10),
        marginLeft: moderateScale(7),
        // height: verticalScale(30),
        backgroundColor: COLORS.app_violete,
        borderRadius: moderateScale(15),
        padding: moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BLACK_OPACITY(0.5),
    },
    loaderText: {
        color: COLORS.WHITE,
        marginTop: moderateVerticalScale(10),
        fontSize: scale(16),
    },
});
export default ChatScreen