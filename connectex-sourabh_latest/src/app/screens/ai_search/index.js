import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/colors';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AI_search = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Listener for when the keyboard is shown
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    // Listener for when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onInputTextChanged = (text) => {
    setInputText(text);  // Update the inputText state when user types
  };

  useEffect(() => {
    // Initialize with a welcome message
    setMessages([
      {
        _id: 1,
        text: "Hi, I am your AI Assistant.\nGot a Query or need Advice? Ask Away, and I'll suggest the best match for you.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
          avatar: IMAGES.AI2_no_bg,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
              marginBottom: keyboardVisible ? verticalScale(24.5) : verticalScale(2)
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
          marginBottom: keyboardVisible ? verticalScale(-22) : 0
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
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  return (
    <ImageBackground source={IMAGES.appBackground} style={{ flex: 1 }}>
      <View style={{ height: safeAreaInsets.top }} />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // Current user ID
        }}
        placeholder="Type your question here..."
        renderSend={renderSend}
        keyboardShouldPersistTaps='never'
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        alwaysShowSend
        scrollToBottom
        bottomOffset={20} // Adjust based on safe area
        scrollToBottomComponent={scrollToBottomComponent}
        textInputStyle={styles.textInput}
        onInputTextChanged={onInputTextChanged} // Track the text input changes

      />
    </ImageBackground>
  );
};

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
    height: verticalScale(30),
    backgroundColor: COLORS.app_violete,
    borderRadius: moderateScale(15),
    padding: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AI_search;
