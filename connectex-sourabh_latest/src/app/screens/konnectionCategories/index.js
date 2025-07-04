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
import { EXPERISE_IMAGE_BASE_URL } from '../../../utils/config';


const KonnectionCategories = ({ props }) => {
  const [data, setData] = useState(cards||[])
  const route = useRoute();
  const safeAreaInsets = useSafeAreaInsets()
  const navigation = useNavigation();
  const { cards } = route.params;
  console.log('expertise----->>>',cards);
// console.log('expertise---->,');

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
          <Text style={{ color: COLORS.WHITE, fontSize: scale(17), marginLeft: moderateScale(10) }}> Discover professionals by expertise</Text>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginTop: verticalScale(10) }}>
            {cards.map((item, index) => (
              <>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('IndustryExperts', { data: item._id}) }}
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
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

export default KonnectionCategories