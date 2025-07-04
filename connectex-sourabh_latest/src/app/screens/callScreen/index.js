import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { ZegoUIKitPrebuiltCallService } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const CallScreen = () => {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');

    // Function to handle sending the call invitation
    const sendCallInvitation = (isVideoCall) => {
        if (!userID || !userName) {
            Alert.alert('Error', 'Please enter both User ID and User Name!');
            return;
        }

        ZegoUIKitPrebuiltCallService.sendCallInvitation({
            invitees: [{ userID, userName }],
            type: isVideoCall ? 1 : 2, // 1 for video call, 2 for audio call
            resourceID: 'ConnectEx_ai', // Replace with your actual resource ID
        })
            .then(() => {
                Alert.alert(
                    'Success',
                    isVideoCall ? 'Video call invitation sent!' : 'Voice call invitation sent!'
                );
            })
            .catch((error) => {
                console.error('Error sending call invitation:', error);
                Alert.alert('Error', 'Failed to send call invitation. Please try again.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Recipient User ID:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                value={userID}
                onChangeText={setUserID}
            />

            <Text style={styles.label}>Recipient User Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter User Name"
                value={userName}
                onChangeText={setUserName}
            />

            <View style={styles.buttonContainer}>
                {userID && userName ? (
                    <>
                        {/* Custom Button for Video Call */}
                        <TouchableOpacity
                            style={styles.customButton}
                            onPress={() => sendCallInvitation(true)}
                        >
                            <Text style={styles.buttonText}>Start Video Call</Text>
                        </TouchableOpacity>

                        {/* Custom Button for Voice Call */}
                        <TouchableOpacity
                            style={styles.customButton}
                            onPress={() => sendCallInvitation(false)}
                        >
                            <Text style={styles.buttonText}>Start Voice Call</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.disabledButton}
                        onPress={() =>
                            Alert.alert('Info', 'Please enter both User ID and User Name!')
                        }
                        disabled={true}
                    >
                        <Text style={styles.disabledButtonText}>
                            Enter details to enable calling
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 20,
    },
    customButton: {
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default CallScreen;
