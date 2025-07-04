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
import React, { useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Search from '../searchScreen';


const { height, width } = Dimensions.get('window'); // Screen dimensions
const screenWidth = Dimensions.get('window').width; // Get the screen width
const numDots = 12; // Number of dots
const dotSize = screenWidth / (numDots * 1.7); // Calculate dot size and spacing

const Help = ({ props }) => {
  const route = useRoute();
  const safeAreaInsets = useSafeAreaInsets()
  const navigation = useNavigation();


  const steps = [
    {
      title: 'Talk To Us:',
      description: 'Tell Us Your Query Or What You’re Looking For!',
      icon: <Ionicons name="call-outline" size={25} color={COLORS.WHITE} />,
    },
    {
      title: 'Get Matched:',
      description: 'We’ll Find & Connect You With Just The Right Expert.',
      icon: <FontAwesome5 name="handshake" size={25} color={COLORS.WHITE} />,
    },
    {
      title: 'Resolve Your Issue:',
      description: 'Talk To Them 1:1 To Get Personalised Solutions.',
      icon: <Ionicons name="checkmark-done-circle-outline" size={25} color={COLORS.WHITE} />,
    },
  ];
  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
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
            onPress={()=>navigation.navigate(Search)}
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
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={verticalScale(100)} // Adjusts scrolling height when the keyboard opens
        >
          <View style={{ marginTop: verticalScale(20) }}>
            <Text style={{ color: COLORS.WHITE, fontSize: scale(17), fontWeight: '500' }}>{`Looking for right expert to\nResolve your Query?`}</Text>
          </View>
          <Text style={{ color: COLORS.WHITE, fontSize: scale(17), fontWeight: '500', marginTop: verticalScale(15) }}>{`Give Us Call !`}</Text>
          <View style={{ marginTop: verticalScale(26) }}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.iconContainer}>{step.icon}</View>
                <View style={styles.textContainer}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={{ backgroundColor: COLORS.app_violete, alignItems: 'center', justifyContent: 'center', padding: scale(13), borderRadius: scale(10) }}>
            <Text style={{ color: COLORS.WHITE, fontSize: scale(15), fontWeight: '500' }}>Click To Call</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  headerText: {
    color: COLORS.WHITE,
    fontSize: scale(17),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  iconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 25,
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(15),
  },
  textContainer: {
    flex: 1,
  },
  stepTitle: {
    color: COLORS.WHITE,
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  stepDescription: {
    color: COLORS.WHITE_OPACITY(0.8),
    fontSize: scale(11),
    // marginTop: verticalScale(5),
  },
});
export default Help