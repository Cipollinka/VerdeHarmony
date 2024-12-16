import { View, Text, SafeAreaView, Dimensions, ActivityIndicator, TouchableOpacity, Image, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';

const StartedChallengeScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isLoading, setIsLoading] = useState(true);
    const [pickedChallenge, setPickedChallenge] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');
    const [isChallengeFinished, setIsChallengeFinished] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [isChallengeVisible, setIsChallengeVisible] = useState(false);

    useEffect(() => {
        const fetchPickedChallenge = async () => {
            try {
                const picked = await AsyncStorage.getItem('pickedChallenge');
                if (picked !== null) {
                    const parsedPicked = JSON.parse(picked);
                    setPickedChallenge(parsedPicked);
                    calculateTimeLeft(parsedPicked.pickedAt);
                }
            } catch (error) {
                console.error('error while load picked', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPickedChallenge();
    }, []);

    const calculateTimeLeft = (pickedAt) => {
        const pickedTime = new Date(pickedAt).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = (pickedTime + 10 * 60 * 60 * 1000) - currentTime;
    
        if (timeDifference > 0) {
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);
    
            setTimeLeft(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
    
            setTimeout(() => calculateTimeLeft(pickedAt), 1000);
        } else {
            setTimeLeft('00:00:00');
            setIsChallengeFinished(true);
        }
    };

    const incrementChallengesTaken = async () => {
        try {
            const challengesTaken = await AsyncStorage.getItem('challengesTaken');
            const newChallengesTaken = challengesTaken ? parseInt(challengesTaken) + 1 : 1;
            await AsyncStorage.setItem('challengesTaken', newChallengesTaken.toString());
        } catch (error) {
            console.error('Error incrementing challenges taken:', error);
        }
    };

    const handleRating = async () => {
        try {
            const storedSumRatings = await AsyncStorage.getItem('sumRatings');
            const storedNumRatings = await AsyncStorage.getItem('numRatings');
    
            const sumRatings = storedSumRatings ? parseInt(storedSumRatings) : 0;
            const numRatings = storedNumRatings ? parseInt(storedNumRatings) : 0;
    
            const newSumRatings = sumRatings + userRating;
            const newNumRatings = numRatings + 1;
    
            const averageRating = Math.round(newSumRatings / newNumRatings);
    
            await AsyncStorage.setItem('sumRatings', newSumRatings.toString());
            await AsyncStorage.setItem('numRatings', newNumRatings.toString());
            await AsyncStorage.setItem('averageRating', JSON.stringify(averageRating));
            await AsyncStorage.removeItem('pickedChallenge');
            setPickedChallenge(null);
    
            // Перенесення виклику incrementChallengesTaken сюди
            incrementChallengesTaken();
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    const shareChallenge = async (title) => {
        try {
            if (!title) {
                Alert.alert('Error', 'There are no challenge share link');
                return;
            }
            await Share.share({
                message: `Be eco-friendly! I started a challenge in Verde Harmony! My challenge now is '${title}'`,
            });
        } catch (error) {
            console.error('Error sharing challenge:', error);
        }
    };

    if (isLoading) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#1A5932' }}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            {isChallengeVisible && (

                <Text
                    style={{
                        fontFamily: fontNunitoExtraBold,
                        textAlign: "left",
                        fontSize:  dimensions.width * 0.07,
                        fontWeight: 800,
                        color: 'white',
                        paddingBottom: 8
                    }}
                >
                    Your eco challenge today
                </Text>
            )}

            {pickedChallenge ? (
                <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                    <View style={{ width: '90%', backgroundColor: 'white', borderRadius: dimensions.width * 0.04 }}>
                        <View>
                            <Image
                                source={require('../assets/images/onboardingImagesVerde/verdeOnboarding2.png')}
                                style={{ width: '100%', alignSelf: 'center', height: dimensions.height * 0.2, borderTopLeftRadius: dimensions.width * 0.05, borderTopRightRadius: dimensions.width * 0.05 }}
                                resizeMode="cover"
                            />
                        </View>
                        <Text
                            style={{
                                paddingTop: dimensions.width * 0.02,
                                fontFamily: fontNunitoExtraBold,
                                textAlign: "left",
                                fontSize: dimensions.width * 0.044,
                                fontWeight: 800,
                                color: '#1A5932',
                                paddingBottom: dimensions.width * 0.005,
                                paddingHorizontal: dimensions.width * 0.04,
                            }}
                        >
                            {pickedChallenge?.title}
                        </Text>

                        <Text
                            style={{
                                fontFamily: fontNunitoRegular,
                                textAlign: "left",
                                fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                fontWeight: 500,
                                color: '#444444',
                                paddingHorizontal: dimensions.width * 0.04,
                            }}
                        >
                            {pickedChallenge?.challengeDecrip}
                        </Text>
                        <View style={{
                            width: '95%',
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: dimensions.width * 0.03
                        }}>
                            <View></View>
                            <TouchableOpacity
                                onPress={() => { shareChallenge(pickedChallenge?.title) }}
                                style={{
                                    alignItems: 'center',
                                    padding: 8,
                                }}
                            >
                                <View style={{ alignItems: 'center', backgroundColor: '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>
                                    <Image
                                        source={require('../assets/icons/homescreenIcons/shareIcon.png')}
                                        style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text
                        style={{
                            fontFamily: fontNunitoExtraBold,
                            textAlign: "center",
                            fontSize:  dimensions.width * 0.05,
                            fontWeight: 800,
                            color: 'white',
                            paddingBottom: 8,
                            paddingTop: dimensions.width * 0.05,
                            paddingHorizontal: dimensions.width * 0.05,
                        }}
                    >
                        Try to stick to this challenge throughout the day, and at the end of the day, mark the result.
                    </Text>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', borderRadius: dimensions.width * 0.04, marginTop: dimensions.height * 0.01 }}>

                        <View style={{ width: isChallengeFinished ? '60%' : '90%', marginLeft: !isChallengeFinished ? '5%' : 0,  backgroundColor: 'white', borderRadius: dimensions.width * 0.04, marginTop: dimensions.height * 0.01 }}>
                            {isChallengeFinished ? (
                                <View style={{ alignItems: 'center', paddingVertical: dimensions.width * 0.04, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                                                <Image
                                                    source={require('../assets/icons/listIcon.png')}
                                                    style={{
                                                        textAlign: 'center', width: dimensions.width * 0.07, height: dimensions.width * 0.07,
                                                        opacity: star <= userRating ? 1 : 0.3,
                                                    }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                </View>
                            ) : (
                                <Text
                                    style={{
                                        fontFamily: fontNunitoExtraBold,
                                        textAlign: "center",
                                        fontSize: dimensions.width < 380 ? dimensions.width * 0.07 : dimensions.width * 0.077,
                                        fontWeight: 800,
                                        color: '#1A5932',
                                        paddingVertical: dimensions.width * 0.04,
                                        paddingHorizontal: dimensions.width * 0.055,
                                    }}
                                >
                                    {timeLeft}
                                </Text>
                            )}
                        </View>
                        {isChallengeFinished && (

                            <TouchableOpacity
                                onPress={handleRating}
                                style={{
                                    marginTop: dimensions.width * 0.025,
                                    backgroundColor: '#A4DC07',
                                    paddingVertical: dimensions.width * 0.03,
                                    paddingHorizontal: dimensions.width * 0.1,
                                    borderRadius: dimensions.width * 0.03,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: fontNunitoExtraBold,
                                        textAlign: "center",
                                        fontSize:  dimensions.width * 0.04,
                                        fontWeight: 800,
                                        color: 'black',
                                    }}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

            ) : (
                <Text
                    style={{
                        fontFamily: fontNunitoExtraBold,
                        textAlign: "center",
                        fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                        fontWeight: 800,
                        color: 'white',
                        paddingBottom: 8,
                        width: '90%',
                        paddingTop: '50%',
                    }}
                >
                    You don’t pick any challenge yet
                </Text>)}


        </SafeAreaView>
    )
}

export default StartedChallengeScreen