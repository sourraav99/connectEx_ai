import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, { useState } from 'react';
  import { IMAGES } from '../../../assets/images';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
  import { COLORS } from '../../../assets/colors';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';
  
  const NotificationList = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();
  
    const [notifications, setNotifications] = useState([
      { id: '1', title: 'New Update Available', message: 'Check out the latest features!', seen: true },
      { id: '2', title: 'Meeting Reminder', message: 'You have a meeting scheduled at 3 PM.', seen: false },
      { id: '3', title: 'Welcome!', message: 'Thank you for joining us!', seen: true },
      { id: '4', title: 'Sale Alert!', message: 'Don’t miss out on our exclusive offers.', seen: false },
      { id: '5', title: 'System Maintenance', message: 'Scheduled maintenance at midnight.', seen: true },
    ]);
  
    const handleNotificationClick = (notificationId) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, seen: true }
            : notification
        )
      );
    };
  
    const sortedNotifications = [...notifications].sort((a, b) => a.seen - b.seen);
  
    const renderNotificationItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => handleNotificationClick(item.id)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: moderateScale(10),
          borderBottomWidth: 1,
          borderBottomColor: COLORS.WHITE_OPACITY(0.2),
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: scale(13), color: !item.seen ? COLORS.WHITE : COLORS.WHITE_OPACITY(0.6) }}>
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: !item.seen ? COLORS.WHITE_OPACITY(1) : COLORS.WHITE_OPACITY(0.6), fontSize: scale(10) }}
          >
            {item.message}
          </Text>
        </View>
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
        <View style={{ flex: 1, backgroundColor: COLORS.BLACK_OPACITY(0.8) }}>
          <View style={{ height: safeAreaInsets.top }} />
          <View
            style={{
              flexDirection: 'row',
              width: '98%',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: verticalScale(10),
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: verticalScale(25),
                width: verticalScale(25),
                borderRadius: 100,
                backgroundColor: COLORS.WHITE,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: verticalScale(5),
              }}
            >
              <Ionicons
                name="caret-back-outline"
                size={24}
                color={COLORS.BLACK}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: scale(20),
                marginLeft: moderateScale(10),
                fontWeight: '500',
              }}
            >
              Notifications
            </Text>
          </View>
          <FlatList
            data={sortedNotifications}
            contentContainerStyle={{ marginTop: verticalScale(5) }}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
          />
        </View>
      </ImageBackground>
    );
  };
  
  export default NotificationList;
  