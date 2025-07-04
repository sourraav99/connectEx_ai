import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { dynamicBottomTabHeight } from '../../../stacks/bottomTab';
import { IMAGES } from '../../../assets/images';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import { ShortsData } from '../../../assets/data';
import { useIsFocused } from '@react-navigation/native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const { height, width } = Dimensions.get('window');
const ITEMS_PER_BATCH = 5;

const bottomHeight = dynamicBottomTabHeight()
const totalHeight = height ;
const dynamicShortsHeight = () => {
  if (Platform.OS === "ios") {
    return totalHeight;
  } else {
    return totalHeight * 0.926
  }
};


const Shorts = () => {
  const insets = useSafeAreaInsets();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current visible item 
  const [pausedStates, setPausedStates] = useState({}); // Store paused state for each video
  const [currentData, setCurrentData] = useState([]); // This will hold the current loaded videos
  const [videoDurations, setVideoDurations] = useState({}); // Store video durations
  const [videoProgress, setVideoProgress] = useState({}); // Track slider values for each video
  const [isMuted, setIsMuted] = useState(false); // Global mute state
  const [likeDislikeStates, setLikeDislikeStates] = useState({}); // Track like/dislike for each item
  const [showControlIcon, setShowControlIcon] = useState(false); // New state for control icon visibility
  const [controlIcon, setControlIcon] = useState(null); // New state for control icon type (play/pause)
  const [controlIconStates, setControlIconStates] = useState({}); // Track control icons for specific items
  const [isLoading, setIsLoading] = useState(true); // Simulate loading state
  const flatListRef = useRef(null);
  const videoRefs = useRef([]);
  const isFocused = useIsFocused();
  const participants = ShortsData

  const togglePause = (index) => {
    const isPaused = !pausedStates[index];

    setPausedStates((prev) => ({
      ...prev,
      [index]: isPaused,
    }));

    // Update control icon states for the specific index
    setControlIconStates((prev) => ({
      ...prev,
      [index]: {
        icon: isPaused ? 'pause' : 'play',
        visible: true,
      },
    }));

    // Hide the icon after 2 seconds for the specific index
    setTimeout(() => {
      setControlIconStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          visible: false,
        },
      }));
    }, 2000);
  };
  useEffect(() => {
    // Simulate a loading timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFocused) {
      // Ensure the current video resumes playing
      setPausedStates((prev) => ({
        ...prev,
        [currentIndex]: false, // Resume current video
      }));
    } else {
      // Pause all videos when navigating away
      videoRefs.current.forEach((ref) => {
        if (ref && ref.pause) {
          ref.pause(); // Pause each video individually
        }
      });

      // Update paused states for all videos
      setPausedStates((prev) => {
        const updatedStates = {};
        Object.keys(prev).forEach((key) => {
          updatedStates[key] = true; // Set all videos to paused
        });
        return updatedStates;
      });
    }
  }, [isFocused, currentIndex]);



  // Function to load initial 5 items
  const loadInitialData = () => {
    setCurrentData(participants.slice(0, ITEMS_PER_BATCH));
  };


  React.useEffect(() => {
    loadInitialData();
  }, []);


  const toggleMute = () => {
    setIsMuted((prev) => !prev); // Toggle the mute state
  };

  const onLoad = (data, index) => {
    // Store the video duration when the video loads
    setVideoDurations((prev) => ({
      ...prev,
      [index]: data.duration,
    }));
  };

  // Function to load the next batch of data
  const loadNextBatch = () => {
    const nextBatch = participants.slice(currentData.length, currentData.length + ITEMS_PER_BATCH);
    if (nextBatch.length > 0) {
      setCurrentData((prevData) => [...prevData, ...nextBatch]);
    }
  };

  const onProgress = (data, index) => {
    if (index === currentIndex && !pausedStates[index]) {
      setVideoProgress((prev) => ({
        ...prev,
        [index]: data.currentTime / videoDurations[index],
      }));
    }
  };

  const onSlidingComplete = (value) => {
    if (currentIndex !== null) {
      const duration = videoDurations[currentIndex];
      if (videoRefs.current[currentIndex] && duration) {
        const seekTime = value * duration; // Calculate seek time
        videoRefs.current[currentIndex].seek(seekTime); // Seek to time
      }
    }
  };

  const handleLike = (itemId) => {
    setLikeDislikeStates((prevStates) => ({
      ...prevStates,
      [itemId]: prevStates[itemId] === 'liked' ? null : 'liked', // Toggle like state
    }));
  };

  const handleDislike = (itemId) => {
    setLikeDislikeStates((prevStates) => ({
      ...prevStates,
      [itemId]: prevStates[itemId] === 'disliked' ? null : 'disliked', // Toggle dislike state
    }));
  };

  const renderItem = ({ item, index }) => {
    const likeStatus = likeDislikeStates[item.id] === 'liked';
    const dislikeStatus = likeDislikeStates[item.id] === 'disliked';
    const controlIconState = controlIconStates[index] || { icon: 'play', visible: false };

    if (isLoading) {
      return (
        <View style={styles.videoContainer}>
          <ShimmerPlaceholder shimmerColors={[COLORS.GREY_OPACITY(0.5), COLORS.GREY_OPACITY(0.5)]} style={styles.video} />
          {/* <ShimmerPlaceholder style={{ position: 'absolute',bottom: 0,left: 0,width: '100%', height: "20%" }}/> */}
          <ShimmerPlaceholder style={styles.shimmerOverlay} />

          <ShimmerPlaceholder style={[styles.shimmerOverlay, { bottom: height * 0.05, }]} />
        </View>
      );
    }
    return (
      <View style={styles.videoContainer}>
        <View style={styles.videoHeader}>
          <View style={{ flexDirection: 'row', backgroundColor: COLORS.BLACK_OPACITY(0.7), padding: scale(7), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Entypo style={{}} name="eye" color={COLORS.WHITE} size={16} />
            <Text style={{ color: COLORS.WHITE, marginLeft: 4, fontSize: scale(12) }}>1.5k</Text>
          </View>
          <TouchableOpacity onPress={toggleMute} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
            <Foundation name={isMuted ? "volume-strike" : "volume"} color={!isMuted ? COLORS.app_violete : COLORS.WHITE} size={22} />
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback
          style={{}}
          onPress={() => {
            if (currentIndex === index) {
              togglePause(index); // Toggle pause/play
            } else {
              setCurrentIndex(index);
              setPausedStates({ [index]: false }); // Ensure the new video plays
            }
          }}
        >

          <Video
            source={{ uri: item.videoUri }}
            ref={(ref) => (videoRefs.current[index] = ref)}
            style={styles.video}
            resizeMode="cover"
            repeat
            muted={isMuted}
            onLoad={(data) => onLoad(data, index)} // Get video duration
            paused={pausedStates[index] || currentIndex !== index} // Control individual pause states
            onProgress={(data) => onProgress(data, index)} // Update progress only for visible and playing video
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />

        </TouchableWithoutFeedback>
        {controlIconState.visible && (
          <View style={styles.controlIcon}>
            <View>
              <FontAwesome
                name={controlIconState.icon}
                size={22}
                color="white"
              />
            </View>
          </View>
        )}
        <View style={{ borderRadius: 20, position: 'absolute', right: 0, bottom: verticalScale(85) }}>
          <TouchableOpacity
            style={[
              styles.actionButton,
            ]}
            onPress={() => handleLike(item.id)}
          >
            <FontAwesome name="thumbs-up" size={24} color={likeStatus ? COLORS.app_violete : COLORS.WHITE} />

          </TouchableOpacity>

          {/* Dislike Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
            ]}
            onPress={() => handleDislike(item.id)}
          >
            <FontAwesome name="thumbs-down" size={24} color={dislikeStatus ? COLORS.app_violete : COLORS.WHITE} />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: 'transparent' }]} // Always transparent
            onPress={() => console.log('shared')}>
            <FontAwesome name="share" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']} // Gradient colors
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: "20%", // Adjust the gradient height here
          }}
        > */}
        <View style={styles.overlay}>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: width - height * 0.05, height: height * 0.062 }}>
            <View>
              <Image style={{ height: height * 0.05, width: height * 0.05, borderRadius: 100, borderWidth: 1, borderColor: COLORS.WHITE }} resizeMode='cover' source={item.ProfilePic} />
            </View>
            <View style={{ width: '80%', marginLeft: moderateScale(5) }}>
              <Text style={styles.videoTitle}>{item.name}</Text>
              <Text numberOfLines={1} style={{ color: COLORS.WHITE, fontWeight: '500' }} >{item.bio}</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: width * 0.9, height: Platform.OS === 'ios' ? height * 0.038 : height * 0.038 }}>
            <Text style={{ fontSize: scale(11), color: COLORS.WHITE, fontWeight: '500' }}>{item.caption}</Text>
          </ScrollView>
        </View>

        <Slider
          style={{ width: '100%', height: verticalScale(10), position: 'absolute', bottom: Platform.OS === 'ios' ? verticalScale(-13) : 0 }}
          minimumValue={0}
          maximumValue={1}  // Use normalized range 0-1 for the video progress
          value={videoProgress[currentIndex] || 0} // Current progress
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor={COLORS.WHITE}
          // onEndReached={loadNextBatch} // Load more videos as you scroll
          // onEndReachedThreshold={0.5}
          maximumTrackTintColor={COLORS.WHITE_OPACITY(0.7)}
          thumbTintColor="transparent" // Hide the thumb by making it transparent
        />
        {/* </LinearGradient> */}
      </View>
    )
  }

  const onViewableItemsChanged = ({ viewableItems }) => {
    const visibleIndex = viewableItems[0]?.index;
    if (visibleIndex !== currentIndex) {
      setCurrentIndex(visibleIndex);
      setPausedStates({ [visibleIndex]: false }); // Reset paused states for the new video
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 90, // Trigger when 90% of the item is visible
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={currentData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={loadNextBatch}
        onEndReachedThreshold={0.5}
        bounces={false}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        initialNumToRender={5} // Render the first 5 items initially
        maxToRenderPerBatch={10} // Render 10 items per batch
        windowSize={5} // Number of items outside the visible area to keep in memory
        onViewableItemsChanged={onViewableItemsChanged} // Attach the handler
        viewabilityConfig={viewabilityConfig} // Attach the config
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    height: dynamicShortsHeight(),
    // backgroundColor: 'red',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: '100%',
    width: '100%',
    // backgroundColor:'red'
  },
  overlay: {
    position: 'absolute',
    bottom: height * 0.02,
    left: width * 0.02,
    width: width * 0.6,
    // backgroundColor: 'red',

  },
  shimmerOverlay: {
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.02,
    width: width * 0.6,
    // backgroundColor: 'red',

  },
  videoTitle: {
    color: 'white',
    fontSize: scale(15),
    fontWeight: 'bold',

  },
  videoHeader: {
    position: 'absolute', // Fixed at the top of the video
    top: Platform.OS === 'ios' ? verticalScale(45) : verticalScale(13), // Adjust for SafeArea
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(7),
    paddingRight: moderateScale(15),
    alignItems: 'center',
    zIndex: 10, // Make sure it's on top of the video
  },
  actionBarContainer: {
    position: 'absolute',
    right: scale(1), // Adjust as per your layout
    bottom: verticalScale(100), // Adjust to position relative to the video
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(200), // Adjust the height based on the number of buttons
    backgroundColor: 'red',
  },
  actionButton: {
    marginVertical: verticalScale(10),
    height: verticalScale(35),
    width: scale(40),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 100,
    height: verticalScale(50),
    width: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  shimmerContainer: {
    marginBottom: 20,
    width: width,
    height: dynamicShortsHeight(),
  },
  shimmerVideo: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginBottom: 10,
  },
  shimmerText: {
    width: '60%',
    height: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default Shorts;
