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
import React, { useState } from 'react';
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

const ChatList = () => {
  const safeAreaInsets = useSafeAreaInsets()
  const navigation = useNavigation();

  const [chats, setChats] = useState([
    { id: '1', name: 'John Doe', message: 'Hey there!', seen: true, profilePic: imageUris.model1 },
    { id: '2', name: 'Jane Smith', message: 'Are we still on for tonight?', seen: false, profilePic: imageUris.model3 },
    { id: '3', name: 'Mike Johnson', message: 'Thanks for the update!', seen: true, profilePic: imageUris.model5 },
    { id: '4', name: 'Emily Davis', message: `let me know when you’re free.let me know when you’re free.let me know when you’re free.let me know when you’re free.`, seen: false, profilePic: imageUris.model7 },
    { id: '5', name: 'Emily Davis', message: `let me know when you’re free.let me know when you’re free.let me know when you’re free.let me know when you’re free.`, seen: true, profilePic: imageUris.model4 },
    // { id: '6', name: 'Emily Davis', message: `let me know when you’re free.let me know when you’re free.let me know when you’re free.let me know when you’re free.`, seen: false, profilePic: imageUris.model2 },

  ]);

  // Function to handle chat click
  const handleChatClick = (chatId) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, seen: true } : chat
      )
    );
    // Navigate to the chat screen or handle the click event
  };
  const sortedChats = [...chats].sort((a, b) => a.seen - b.seen);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleChatClick(item.id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(10),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.WHITE_OPACITY(0.2),
      }}
    >
      {/* Profile Picture */}
      <Image
        source={{ uri: item.profilePic }}
        style={{
          width: moderateScale(40),
          height: moderateScale(40),
          borderRadius: moderateScale(20),
          marginRight: moderateScale(10),
          borderWidth: 1,
          borderColor: COLORS.WHITE_OPACITY(0.6),
        }}
      />
      <View style={{ flex: 1 }}>
        {/* Chat Details */}
        <Text style={{ fontWeight: 'bold', fontSize: scale(16), color: !item.seen ? COLORS.WHITE : COLORS.WHITE_OPACITY(0.6) }}>{item.name}</Text>
        <Text numberOfLines={1} style={{ color: !item.seen ? COLORS.WHITE_OPACITY(1) : COLORS.WHITE_OPACITY(0.6), fontSize: scale(14), }}>{item.message}</Text>
      </View>
      {/* Unseen Indicator */}
      {!item.seen && (
        <View
          style={{
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
            backgroundColor: COLORS.app_violete,
            position: 'absolute',
            right: moderateScale(10),
          }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.5) }}>
        <View style={{ height: safeAreaInsets.top }} />
        <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center', alignItems: 'center', marginTop: verticalScale(10) }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: verticalScale(25), width: verticalScale(25), borderRadius: 100, backgroundColor: COLORS.WHITE, alignItems: 'center', justifyContent: 'center', marginVertical: verticalScale(5) }}>
            <Ionicons name="caret-back-outline" size={24} color={COLORS.BLACK} style={{ marginRight: 5 }} />
          </TouchableOpacity>
          <Text style={{ color: COLORS.WHITE, fontSize: scale(20), marginLeft: moderateScale(10), fontWeight: '500' }}>Chat</Text>
        </View>
        <FlatList
          data={sortedChats}
          contentContainerStyle={{ marginTop: verticalScale(5) }}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
        />
      </View>
    </ImageBackground>

  );
};

export default ChatList;
