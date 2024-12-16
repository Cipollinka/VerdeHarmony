import { View, Text, Dimensions, TouchableOpacity, Image, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';
const fontNunitoSemBold = 'Nunito-SemiBold';

const ProfileScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [averageRating, setAverageRating] = useState(0);
    const [challengesTaken, setChallengesTaken] = useState(0);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const storedAverageRating = await AsyncStorage.getItem('averageRating');
                const storedChallengesTaken = await AsyncStorage.getItem('challengesTaken');

                if (storedAverageRating !== null) {
                    setAverageRating(JSON.parse(storedAverageRating));
                }

                if (storedChallengesTaken !== null) {
                    setChallengesTaken(parseInt(storedChallengesTaken));
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const shareResults = async () => {
        try {
            await Share.share({
                message: `I completed ${challengesTaken} eco-challenges in Verde Harmony!\n`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={{ width: '100%' }}>
            <Text
                style={{
                    fontFamily: fontNunitoExtraBold,
                    textAlign: "left",
                    fontSize:  dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    alignSelf: 'center',
                    width: '90%'
                }}
            >
                My profile and statistics
            </Text>

            <Text
                style={{
                    fontFamily: fontNunitoRegular,
                    textAlign: "left",
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.04 : dimensions.width * 0.05,
                    fontWeight: 'ultralight',
                    color: 'white',
                    paddingBottom: 8,
                    alignSelf: 'center',
                    width: '90%'
                }}
            >
                Average compliance with eco-challenges:
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'white',
                width: '90%',
                borderRadius: 25,
                paddingHorizontal: 40,
                paddingVertical: dimensions.width * 0.07,
                alignSelf: 'center',
                marginTop: dimensions.width * 0.03
            }}>
                {[1, 2, 3, 4, 5].map((star) => (
                        <Image
                            key={star} 
                            source={require('../assets/icons/listIcon.png')}
                            style={{
                                textAlign: 'center', width: dimensions.width * 0.07, height: dimensions.width * 0.07,
                                opacity: star <= averageRating ? 1 : 0.3,
                            }}
                            resizeMode="contain"
                        />
                ))}
            </View>

            <Text
                style={{
                    fontFamily: fontNunitoRegular,
                    textAlign: "left",
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.04 : dimensions.width * 0.044,
                    fontWeight: 'ultralight',
                    color: 'white',
                    paddingBottom: 8,
                    alignSelf: 'center',
                    width: '90%',
                    marginTop: dimensions.width * 0.07
                }}
            >
                Challenges taken
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'white',
                width: '90%',
                borderRadius: 25,
                alignItems: 'center',
                paddingVertical: dimensions.width * 0.025,
                alignSelf: 'center',
                marginTop: dimensions.width * 0.03
            }}>
                <Text
                    style={{
                        fontFamily: fontNunitoExtraBold,
                        textAlign: "center",
                        fontSize: dimensions.width < 380 ? dimensions.width * 0.07 : dimensions.width * 0.08,
                        color: '#1A5932',
                        alignSelf: 'center',
                        paddingVertical: 10,
                        width: '90%',
                        alignItems: 'center',
                    }}
                >
                    {challengesTaken}
                </Text>
            </View>

            <TouchableOpacity onPress={shareResults} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 14,
                marginTop: dimensions.width * 0.05
            }}>

                <Text style={{
                    color: 'black',
                    fontSize: dimensions.width * 0.04,
                    fontFamily: 'Montserrat-Regular',
                    paddingHorizontal: 10,
                    paddingVertical: 5
                }}>Share my results</Text>


            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen