import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Platform, Image } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Icons, { icons } from '../app/components/icons'
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../assets/colors';
import { IMAGES } from '../assets/images';

const tabIcons = [
  { ico1: "home", ico2: "home-outline", type: icons.Ionicons, routeName: 'HomeScreen', name: 'Home' },
  { ico1: 'play-circle', ico2: 'play-circle', type: icons.FontAwesome5, routeName: 'ShortsScreen', name: 'Shorts' },
  { ico1: "grid", ico2: 'chatbox-ellipses-outline', type: icons.Ionicons, routeName: 'AI_searchScreen', name: 'Ai-Search' },
  { ico1: 'questioncircle', ico2: 'questioncircle', type: icons.AntDesign, routeName: 'HelpScreen', name: 'Help' },
  { ico1: 'circle-user', ico2: 'circle-user', type: icons.FontAwesome6, routeName: 'ProfileScreen', name: 'Profile' },
];

export const dynamicBottomTabHeight = () => {
  if (Platform.OS === "ios") {
    return verticalScale(65);
  } else {
    return verticalScale(50);
  }
};

const CONTAINER_HEIGHT = dynamicBottomTabHeight();

const BottomTab = ({ navigation, translateY, resetTranslateY }) => {
  //   const { cartItems } = useCart(); // Use the CartContext
  const [focused, setFocused] = useState('HomeScreen');

  const navigate = (routeName) => {
    if (routeName !== '') {
      navigation.navigate(routeName);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeIndex = navigation.getState().index; // Get the active route index
      const currentRoute = navigation.getState().routes[routeIndex]; // Get the active route from the state
      setFocused(currentRoute.name); // Set the focused tab based on the current route
      // Reset translateY if not on HomeScreen
      if (currentRoute.name !== 'Home') {
        resetTranslateY();  // Reset the tab bar's translateY when navigating to other screens
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <Animated.View style={[styles.tabContainer, { transform: [{ translateY }] }]}>
      <Surface style={[
        styles.rowContainer,
        focused === 'ShortsScreen' && { backgroundColor: 'black' },
      ]}>
        {tabIcons.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            hitSlop={{ left: 10, right: 10, top: 5, bottom: 5 }}
            key={index}
            onPress={() => navigate(item.routeName)}
            style={[
              styles.iconButton,
              item.routeName === 'AI_searchScreen' && styles.aiSearchButton, // Custom style for AI_search
            ]}
          >
            {item.routeName === 'AI_searchScreen' ? (
              <View style={styles.aiSearchCircle}>
                <Image
                  source={IMAGES.AI2} // Add your custom image here
                  style={styles.aiSearchImage}
                />
              </View>
            ) : (
              <Icons
                icon={item.type}
                size={scale(20)}
                name={item.ico1}
                color={
                  focused === 'ShortsScreen'
                    ? item.routeName === 'ShortsScreen'
                      ? 'white'
                      : 'grey'
                    : focused === item.routeName
                      ? COLORS.app_violete
                      : COLORS.GREY
                }
              />
            )}
            <Text
              style={[
                styles.label,
                focused === 'ShortsScreen'
                  ? {
                    color:
                      item.routeName === 'ShortsScreen' ? 'white' : 'grey',
                  }
                  : {
                    color:
                      focused === item.routeName
                        ? COLORS.app_violete
                        : COLORS.GREY,
                  },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </Surface>
    </Animated.View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabContainer: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: CONTAINER_HEIGHT,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    backgroundColor: COLORS.BLACK,
    // backgroundColor:
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  label: {
    fontSize: scale(10),  // Adjust font size for label
    marginTop: verticalScale(2),  // Space between icon and label
  },
  badgeContainer: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? -verticalScale(7) : -verticalScale(5),
    top: Platform.OS === 'ios' ? verticalScale(9) : -verticalScale(0),
    backgroundColor: COLORS.app_violete,
    borderRadius: 100,
    // paddingHorizontal: 5,
    // paddingVertical: 2,
    height: verticalScale(13),
    width: verticalScale(13),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: scale(10),
    fontWeight: 'bold',
  },
  aiSearchButton: {
    left: -1.9,
    position: 'relative', // Adjust for overlapping the circle
    bottom: Platform.OS === 'ios' ? verticalScale(11.5) : verticalScale(9.5), // Adjust the position of the big circle
  },
  aiSearchCircle: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(30),
    backgroundColor: 'white', // Customize the background color
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiSearchImage: {
    width: verticalScale(25), // Customize the size of the image
    height: verticalScale(30),
    // tintColor: COLORS.WHITE, // Optional: Tint the image
  },
  label: {
    fontSize: scale(10), // Adjust font size for label
    marginTop: verticalScale(2), // Space between icon and label
  },
});
