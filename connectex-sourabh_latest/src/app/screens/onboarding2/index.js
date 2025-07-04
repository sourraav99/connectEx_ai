import { View, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { IMAGES } from '../../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { VIDEOS } from '../../../assets/videos';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from '@react-navigation/elements';
import { COLORS } from '../../../assets/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Onboarding2 = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigation = useNavigation();
  // Callback function to restart the video when it ends
  const handleVideoEnd = () => {
    if (videoRef.current && isVideoPlaying) {
      videoRef.current.seek(0); // Restart the video from the beginning 
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // This runs when the screen comes into focus

  //     return () => {
  //       // This runs when the screen goes out of focus
  //       if (videoRef.current) {
  //         videoRef.current.pause();
  //       }
  //     };
  //   }, [])
  // );
  // Callback for video playback change (e.g., when the video starts playing)
  const handleVideoPlay = () => {
    setIsVideoPlaying(true); // Track if the video is playing
  };

  // Callback when video is paused
  const handleVideoPause = () => {
    setIsVideoPlaying(false); // Track if the video is paused
  };

  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <View style={{ height: safeAreaInsets.top }} />

      <Video
          source={{uri:'https://moodstv.in/movies/05b251a1ac75a5232483890078efd9a7.mp4'}}
        ref={videoRef}
        poster={IMAGES.wait}
        resizeMode="contain" // Avoid "stretch" as it may increase memory usage.
        style={{ width: "96%", height: verticalScale(300), marginTop: verticalScale(70) ,backgroundColor:'white',borderRadius:15,overflow:'hidden',alignSelf:'center'}}
        repeat={true} // Let video repeat
        muted
        paused={false}
        // paused={!isVideoPlaying} // Only play when needed
        onEnd={handleVideoEnd} // Restart video when it ends
        onPlay={handleVideoPlay} // Start tracking when video starts playing
        onPause={handleVideoPause} // Track when video pauses
          onError={(error) => {
            console.error('Video Error:', error); // Log errors for debugging.
          }}
        bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 30000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }} // Fine-tune buffering
      />

      <View>
        <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
          <Text style={{ color: COLORS.app_violete, fontSize: scale(25) }}>ConnectEx</Text>
          <Text style={{ color: COLORS.WHITE, fontSize: scale(25) }}>Shorts</Text>
        </View>
        <View style={{ marginTop: verticalScale(10) }}>
          <Text style={{ color: COLORS.WHITE, fontSize: scale(14) }}>
            Create, share and watch engaging 1:1 shorts and click next to dive into conversations you like.
          </Text>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: safeAreaInsets.bottom + verticalScale(20),
          alignSelf: 'center',
          backgroundColor: COLORS.app_violete,
          paddingVertical: verticalScale(11),
          paddingHorizontal: scale(30),
          borderRadius: 10,
          width: "97%",
          alignItems: "center",
        }}
        onPress={()=>{navigation.navigate('Login')}} // Replace 'NextScreen' with the actual screen name
      >
        <Text style={{ color: COLORS.WHITE, fontSize: scale(16) }}>Next</Text>
      </TouchableOpacity>

      <View style={{ height: safeAreaInsets.bottom }} />
    </ImageBackground>
  );
};

export default Onboarding2;
