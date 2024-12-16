import { View, Text, Dimensions, Switch, TouchableOpacity, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontNunitoExtraBold = 'Nunito-ExtraBold';

const SettingsScreen = ({isNotificationsEnabled, setIsNotificationsEnabled}) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    

    const saveSettings = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    };

    const toggleNotificationsSwitch = () => {
        const newNotifValue = !isNotificationsEnabled;
        setIsNotificationsEnabled(newNotifValue);
        saveSettings('isNotificationsEnabled', newNotifValue);
    };

    const shareVerdeApp = async () => {
        try {
            await Share.share({
                message: `Be eco-friendly with Verde Harmony!\n`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={{width: '100%'}}>
            <Text
                style={{
                    fontFamily: fontNunitoExtraBold,
                    textAlign: "center",
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingTop: dimensions.height * 0.05,
                    paddingBottom: 8,
                    width: '100%'
                }}
            >
                Settings
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 14,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: dimensions.width * 0.05,
                    fontFamily: 'Montserrat-Regular',
                    paddingHorizontal: 10,
                    paddingVertical: 5
                }}>Notifications</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#34C759' }}
                    thumbColor={isNotificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor="#3E3E3E"
                    onValueChange={toggleNotificationsSwitch}
                    value={isNotificationsEnabled}
                />
            </View>

            <TouchableOpacity onPress={shareVerdeApp} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 14,
                marginTop: dimensions.width * 0.03
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: dimensions.width * 0.05,
                    fontFamily: 'Montserrat-Regular',
                    paddingHorizontal: 10,
                    paddingVertical: 5
                }}>Share app</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen