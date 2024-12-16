import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

import BlogScreen from './BlogScreen';
import StartedChallengeScreen from './StartedChallengeScreen';



const challenges = [
  {
    id: 1, title: 'Plastic-Free Day',
    challengeDecrip: 'Spend a whole day without using any plastic.',

  },
  {
    id: 2, title: 'Zero-Waste Week',
    challengeDecrip: 'Try to generate as little waste as possible for an entire week.',

  },
  {
    id: 3, title: 'Meatless Monday', challengeDecrip: 'Commit to going meatless for one day a week.',
  },
  {
    id: 4, title: 'Turn Off the Lights', challengeDecrip: 'For one evening, turn off all lights in your home and use candles or natural light.',

  },
  {
    id: 5, title: 'Use Public Transport', challengeDecrip: 'Go car-free for a week and use public transportation instead.',
  },
  {
    id: 6, title: 'Composting Challenge', challengeDecrip: 'Start composting for a week and track how much waste you reduce.'
  },
  {
    id: 7, title: 'Upcycle It', challengeDecrip: 'Pick an old item at home and creatively upcycle it into something useful.',
  },
  {
    id: 8, title: 'Refuse Single-Use', challengeDecrip: 'Spend a day without using any single-use plastics, such as straws, bags, or bottles.',
  },
  {
    id: 9, title: 'Eco-Friendly Shopping', challengeDecrip: 'Only buy products with minimal or no packaging for a week.',
  },
  {
    id: 10, title: 'Sustainable Morning', challengeDecrip: 'Start your day with a zero-waste routine (e.g., reusable cup, natural skincare products).',
  },
  {
    id: 11, title: 'Digital Detox', challengeDecrip: 'Reduce energy consumption by turning off all non-essential electronic devices for a day.',

  },
  {
    id: 12, title: 'Eco-Gift Giving', challengeDecrip: 'Give only eco-friendly or second-hand gifts for the next event you attend.',
  },
  {
    id: 13, title: 'Water-Saving Week', challengeDecrip: 'Take shorter showers, fix leaks, and avoid wasting water for a full week.',
  },
  {
    id: 14, title: 'Sustainable Fashion Day', challengeDecrip: 'Wear only clothes that are second-hand or sustainably produced for an entire day.',
  },
  {
    id: 15, title: 'Local Produce Only', challengeDecrip: 'Buy only locally grown food for a week to support farmers and reduce your carbon footprint.',
  },
  {
    id: 16, title: 'Go Paperless', challengeDecrip: 'Avoid paper products (such as napkins, paper towels, etc.) for an entire week.',
  },
  {
    id: 17, title: 'Plant a Tree', challengeDecrip: 'Spend a weekend planting at least one tree or shrub in your community.',
  },
  {
    id: 18, title: 'DIY Eco-Cleaners', challengeDecrip: 'Make your own eco-friendly cleaning solutions and use them for the next week.',
  },
  {
    id: 19, title: 'Energy-Efficient Day', challengeDecrip: 'Track and minimize energy use by unplugging devices and reducing unnecessary heating or cooling.',
  },
  {
    id: 20, title: 'Green Office Week', challengeDecrip: 'Implement eco-friendly practices at work, like reducing waste, going paperless, and using energy-efficient equipment.',
  },
  {
    id: 21, title: 'Eco-Friendly Transport', challengeDecrip: 'Walk, bike, or use public transportation instead of driving for a week.',
  },
  {
    id: 22, title: 'Eco-Friendly Pet Care', challengeDecrip: 'Switch to eco-friendly pet products and reduce waste from pet care items.',
  },
  {
    id: 23, title: 'Eco-Friendly Gardening', challengeDecrip: 'Start a garden with native plants, compost, and rainwater collection.',
  }
];


const ecoFriendlyTips = [
  {
    id: 1, title: 'Start with One Reusable', ecoFriendlyTipsDescrip: 'Replace one disposable item (like plastic bottles) with a reusable alternative today.',
  },
  {
    id: 2, title: 'Unplug Devices', ecoFriendlyTipsDescrip: 'Turn off and unplug devices you\'re not using to save energy.',
  },
  {
    id: 3, title: 'Walk or Bike', ecoFriendlyTipsDescrip: 'Choose walking or biking instead of driving for short distances.',
  },
  {
    id: 4, title: 'Bring Your Bag', ecoFriendlyTipsDescrip: 'Use a reusable shopping bag for groceries.',
  },
  {
    id: 5, title: 'Turn Off the Tap', ecoFriendlyTipsDescrip: 'Save water by turning off the tap while brushing your teeth.',
  },
  {
    id: 6, title: 'Go Paperless', ecoFriendlyTipsDescrip: 'Opt for digital receipts and documents to reduce paper waste.',
  },
  {
    id: 7, title: 'Buy Local', ecoFriendlyTipsDescrip: 'Support local farmers and reduce your carbon footprint by choosing locally grown food.',
  },
  {
    id: 8, title: 'Upcycle an Item', ecoFriendlyTipsDescrip: 'Find a creative way to reuse or upcycle an old object at home.',
  },
  {
    id: 9, title: 'Ditch Single-Use', ecoFriendlyTipsDescrip: 'Avoid single-use plastics, like straws or cutlery, and bring your own.',
  },
  {
    id: 10, title: 'Compost Scraps', ecoFriendlyTipsDescrip: 'Start a small compost bin for fruit and vegetable scraps.',
  },
  {
    id: 11, title: 'Cold Wash', ecoFriendlyTipsDescrip: 'Wash clothes in cold water to save energy.',
  },
  {
    id: 12, title: 'Plant Something', ecoFriendlyTipsDescrip: 'Plant a tree, herb, or flower, and nurture it as a step toward greener living.',
  },
  {
    id: 13, title: 'Meal Prep', ecoFriendlyTipsDescrip: 'Reduce food waste by planning your meals and using leftovers creatively.',
  },
  {
    id: 14, title: 'Borrow, Don’t Buy', ecoFriendlyTipsDescrip: 'Borrow books, tools, or other items instead of buying new ones.',
  },
  {
    id: 15, title: 'Switch to LED', ecoFriendlyTipsDescrip: 'Replace an old bulb with an energy-saving LED light bulb.',
  },
  {
    id: 16, title: 'Eco-Friendly Commute', ecoFriendlyTipsDescrip: 'Use public transportation or carpool today to lower emissions.',
  },
  {
    id: 17, title: 'Avoid Over-Packaging', ecoFriendlyTipsDescrip: 'Buy products with minimal or no packaging.',
  },
  {
    id: 18, title: 'Use Eco-Cleaners', ecoFriendlyTipsDescrip: 'Switch to environmentally friendly cleaning products.',
  },
  {
    id: 19, title: 'Support Sustainable Brands', ecoFriendlyTipsDescrip: 'Choose products from companies that prioritize sustainability.',
  },
  {
    id: 20, title: 'Spend Time Outdoors', ecoFriendlyTipsDescrip: 'Appreciate nature by spending time in a park, forest, or garden, inspiring a deeper commitment to protect it.',
  },
  {
    id: 21, title: 'Reduce Food Waste', ecoFriendlyTipsDescrip: 'Plan meals, store food properly, and use leftovers to minimize food waste.',
  },
  {
    id: 22, title: 'Eco-Friendly Pet Care', ecoFriendlyTipsDescrip: 'Choose eco-friendly pet products and reduce waste from pet care items.',
  },
  {
    id: 23, title: 'Eco-Friendly Gardening', ecoFriendlyTipsDescrip: 'Start a garden with native plants, compost, and rainwater collection.',
  },
]


const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';
const fontNunitoSemBold = 'Nunito-SemiBold';



const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedPage, setSelectedPage] = useState('Home');
  const [entriedUser, setEntriedUser] = useState(null);

  const [thisDay, setThisDay] = useState(1);
  const [todayTip, setTodayTip] = useState(null);
  const [todayChallenge, setTodayChallenge] = useState(null);
  const [isAllTipsVisible, setIsAllTipsVisible] = useState(false);
  const [pickedChallenge, setPickedChallenge] = useState(null);

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [pinnedTips, setPinnedTips] = useState([]);

    useEffect(() => {
        const loadSettingsOfNotifications = async () => {
            try {
                const storedNotificationsEnabled = await AsyncStorage.getItem('isNotificationsEnabled');
                if (storedNotificationsEnabled !== null) {
                    setIsNotificationsEnabled(JSON.parse(storedNotificationsEnabled));
                }
            } catch (error) {
                console.error("Error loading settings:", error);
            }
        };

        loadSettingsOfNotifications();
    }, []);

  useEffect(() => {
    const fetchThisCurTodayDay = async () => {
      try {
        const savedDay = await AsyncStorage.getItem('thisDay');
        if (savedDay !== null) {
          setThisDay(parseInt(savedDay, 10));
        }
      } catch (error) {
        console.error('Помилка при завантаженні thisDay:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThisCurTodayDay();
  }, []);

  useEffect(() => {
    if (ecoFriendlyTips[thisDay]) {
      setTodayChallenge(challenges.find(challenge => challenge.id === thisDay));
    }
    setTodayTip(ecoFriendlyTips.find(tip => tip.id === thisDay));
  }, [thisDay, selectedPage]);

  useEffect(() => {
    setIsAllTipsVisible(false);
  }, [selectedPage]);

  const generateNewChallenge = () => {
    let newChallenge;
    do {
      newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    } while (newChallenge === todayChallenge);
    setTodayChallenge(newChallenge);
  }

  const pickChallenge = async (challenge) => {
    setSelectedPage("StartedChallenge");
    try {
        const challengeWithTimestamp = {
            ...challenge,
            pickedAt: new Date().toISOString()
        };
        const challengeString = JSON.stringify(challengeWithTimestamp);
        await AsyncStorage.setItem('pickedChallenge', challengeString);
        setPickedChallenge(challengeWithTimestamp);
    } catch (error) {
        console.error('Помилка при pick challenge:', error);
    } finally {
        setIsLoading(false);
    }
};

  useEffect(() => {
    const loadPinnedTips = async () => {
      try {
        const storedPinnedTips = await AsyncStorage.getItem('pinnedTips');
        if (storedPinnedTips !== null) {
          setPinnedTips(JSON.parse(storedPinnedTips));
        }
      } catch (error) {
        console.error("Error loading pinned tips:", error);
      }
    };

    loadPinnedTips();
  }, []);

  const togglePinTip = async (tip) => {
    let updatedPinnedTips;
    if (pinnedTips.some(pinnedTip => pinnedTip.id === tip.id)) {
      updatedPinnedTips = pinnedTips.filter(pinnedTip => pinnedTip.id !== tip.id);
    } else {
      updatedPinnedTips = [...pinnedTips, tip];
    }
    setPinnedTips(updatedPinnedTips);
    await AsyncStorage.setItem('pinnedTips', JSON.stringify(updatedPinnedTips));
  };

  const sortedTips = useMemo(() => {
    const pinnedTipIds = pinnedTips.map(tip => tip.id);
    const unpinnedTips = ecoFriendlyTips.filter(tip => !pinnedTipIds.includes(tip.id));
    return [...pinnedTips, ...unpinnedTips];
  }, [pinnedTips]);

  const shareTip = async (title) => {
    try {
      if (!title) {
        Alert.alert('Error', 'There are no tip`s share link');
        return;
      }
      await Share.share({
        message: `Be eco-friendly! I follow the tip with Verde Harmony! My today tip is '${title}'`,
      });
    } catch (error) {
      console.error('Error sharing tip:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1A5932' }}>
      <View
        style={{
          borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
          top: 0, width: '100%',
          paddingVertical: 4, paddingTop: 25, alignItems: 'center'
        }}
      >
        <View className="flex-row space-x-3 pt-5 mb-5"
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            paddintTop: 21,
            alignItems: 'center',
            marginBottom: 21
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedPage('Settings')}
          >
            <View
              style={{
                backgroundColor: selectedPage === 'Settings' ? '#A4DC07' : 'white',
                borderRadius: 12,
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',

              }}
            >

              <Image
                source={require('../assets/icons/homescreenIcons/settingsIcon.png')}
                style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <Image
            source={require('../assets/images/verdeLogo.png')}
            style={{ width: dimensions.width * 0.5, marginHorizontal: dimensions.width * 0.03, height: dimensions.width * 0.19, textAlign: 'center' }}
            resizeMode="stretch"
          />

          <TouchableOpacity
            onPress={() => setSelectedPage('Profile')}
            style={{ alignItems: 'center', padding: 8 }}
          >
            <View
              style={{
                backgroundColor: selectedPage === 'Profile' ? '#A4DC07' : 'white',
                borderRadius: 12,
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',

              }}
            >

              <Image
                source={require('../assets/icons/homescreenIcons/profileIcon.png')}
                style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>



      {selectedPage === 'Home' ? (
        <View style={{ width: '88%', flex: 1, paddingHorizontal: 4 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, maxHeight: dimensions.width < 380 ? '75%' : '80%', borderRadius: dimensions.width * 0.05, position: 'relative', marginBottom: dimensions.height * 0.16 }}>
              <Text
                style={{
                  fontFamily: fontNunitoExtraBold,
                  textAlign: "left",
                  fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                  fontWeight: 800,
                  color: 'white',
                  paddingBottom: 8

                }}
              >
                Eco-Friendly Tips
              </Text>

              {!isAllTipsVisible ? (
                <View style={{ width: '100%', backgroundColor: 'white', borderRadius: dimensions.width * 0.04 }}>
                  <View style={{ width: '90%', paddingHorizontal: dimensions.width * 0.04, paddingVertical: dimensions.width * 0.04 }}>
                    <Text
                      style={{
                        fontFamily: fontNunitoExtraBold,
                        textAlign: "left",
                        fontSize:  dimensions.width * 0.044,
                        fontWeight: 800,
                        color: '#1A5932',
                        paddingBottom: dimensions.width * 0.02,

                      }}
                    >
                      {todayTip?.title}
                    </Text>

                    <Text
                      style={{
                        fontFamily: fontNunitoRegular,
                        textAlign: "left",
                        fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                        fontWeight: 500,
                        color: '#444444',

                      }}
                    >
                      {todayTip?.ecoFriendlyTipsDescrip}
                    </Text>
                  </View>

                  <View style={{
                    width: '95%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: dimensions.width * 0.03
                  }}>

                    <TouchableOpacity
                      onPress={() => togglePinTip(todayTip)}
                      style={{ alignItems: 'center', padding: 8 }}
                    >
                      <View style={{ alignItems: 'center', backgroundColor: pinnedTips.some(tip => tip.id === todayTip?.id) ? '#A4DC07' : '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>
                        <Image
                          source={pinnedTips.some(pinnedTip => pinnedTip.id === todayTip.id) ? require('../assets/icons/homescreenIcons/pinGreenIcon.png') : require('../assets/icons/homescreenIcons/pinIcon.png') } 
                          style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => { shareTip(todayTip?.title) }}
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

              ) : (
                <View>

                  {sortedTips.map((tip) => (
                    <View key={tip.id} style={{ width: '100%', backgroundColor:'white', borderRadius: dimensions.width * 0.04, marginVertical: dimensions.width * 0.019 }}>
                      <View style={{ width: '90%', paddingHorizontal: dimensions.width * 0.04, paddingVertical: dimensions.width * 0.04 }}>
                        <Text
                          style={{
                            fontFamily: fontNunitoExtraBold,
                            textAlign: "left",
                            fontSize: dimensions.width * 0.044,
                            fontWeight: 800,
                            color: '#1A5932',
                            paddingBottom: dimensions.width * 0.02,

                          }}
                        >
                          {tip.title}
                        </Text>

                        <Text
                          style={{
                            fontFamily: fontNunitoRegular,
                            textAlign: "left",
                            fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                            fontWeight: 500,
                            color: '#444444',

                          }}
                        >
                          {tip.ecoFriendlyTipsDescrip}
                        </Text>
                      </View>

                      <View style={{
                        width: '95%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: dimensions.width * 0.03
                      }}>

                        <TouchableOpacity
                          onPress={() => togglePinTip(tip)}
                          style={{ alignItems: 'center', padding: 8 }}
                        >
                          <View style={{ alignItems: 'center', backgroundColor: pinnedTips.some(pinnedTip => pinnedTip.id === tip.id) ? '#A4DC07' : '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>
                            <Image
                              source={pinnedTips.some(pinnedTip => pinnedTip.id === tip.id) ? require('../assets/icons/homescreenIcons/pinGreenIcon.png') : require('../assets/icons/homescreenIcons/pinIcon.png') } 
                              style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                              resizeMode="contain"
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => { shareTip(tip?.title) }}
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

                  ))}
                </View>
              )}


              <TouchableOpacity
                onPress={() => { setIsAllTipsVisible(!isAllTipsVisible) }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: dimensions.width * 0.1,
                  paddingHorizontal: dimensions.width * 0.2,
                  paddingVertical: dimensions.width * 0.03,
                  marginVertical: dimensions.width * 0.03,
                  marginBottom: dimensions.width * 0.05,
                }}
              >
                <Text
                  style={{ fontFamily: fontNunitoExtraBold, color: '#1A5932', textAlign: 'center' }}>
                  {isAllTipsVisible ? 'Close' : 'Open all'}
                </Text>
              </TouchableOpacity>



              <View style={{
                height: 1,
                backgroundColor: 'white',
                width: '100%',
                opacity: 0.5,
              }}></View>

              <Text

                style={{
                  marginTop: dimensions.width * 0.05,
                  fontFamily: fontNunitoExtraBold,
                  textAlign: "left",
                  fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                  fontWeight: 800,
                  color: 'white',
                  paddingBottom: 8

                }}
              >
                Your eco challenge today
              </Text>


              <View style={{ width: '100%', backgroundColor: 'white', borderRadius: dimensions.width * 0.04, paddingBottom: dimensions.height * 0.07 }}>
                <Image
                  source={require('../assets/images/onboardingImagesVerde/verdeOnboarding2.png')}
                  style={{ width: '100%', alignSelf: 'center', height: dimensions.height * 0.2, borderTopLeftRadius: dimensions.width * 0.05, borderTopRightRadius: dimensions.width * 0.05 }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    paddingTop: dimensions.width * 0.02,
                    fontFamily: fontNunitoExtraBold,
                    textAlign: "left",
                    fontSize:  dimensions.width * 0.044,
                    fontWeight: 800,
                    color: '#1A5932',
                    paddingBottom: dimensions.width * 0.005,
                    paddingHorizontal: dimensions.width * 0.04,

                  }}
                >
                  {todayChallenge?.title}
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
                  {todayChallenge?.challengeDecrip}
                </Text>


                <View style={{
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginBottom: -40,
                }}>

                  <TouchableOpacity
                    onPress={() => { pickChallenge(todayChallenge) }}
                    style={{ alignItems: 'center', padding: 8 }}
                  >
                    <View style={{ alignItems: 'center', backgroundColor: '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>

                      <Text
                        style={{
                          fontFamily: fontNunitoRegular,
                          textAlign: "left",
                          fontSize: dimensions.width * 0.03,
                          fontWeight: 500,
                          color: 'white',
                          paddingHorizontal: dimensions.width * 0.04,
                          paddingVertical: dimensions.width * 0.016,

                        }}
                      >
                        Pick the challenge
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={generateNewChallenge}
                    style={{ alignItems: 'center', padding: 8 }}
                  >
                    <View style={{ alignItems: 'center', backgroundColor: '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>

                      <Text
                        style={{
                          fontFamily: fontNunitoRegular,
                          textAlign: "left",
                          fontSize: dimensions.width * 0.03,
                          fontWeight: 500,
                          color: 'white',
                          paddingHorizontal: dimensions.width * 0.04,
                          paddingVertical: dimensions.width * 0.016,

                        }}
                      >
                        Generate new
                      </Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </ScrollView>

          <View style={{ position: 'absolute', bottom: '10%', left: '50%', backgroundColor: '#A4DC07' }}>

          </View>
        </View>

      ) : selectedPage === 'Settings' ? (
        <SettingsScreen selectedPage={selectedPage} isNotificationsEnabled={isNotificationsEnabled} setIsNotificationsEnabled={setIsNotificationsEnabled} />
      ) : selectedPage === 'Profile' ? (
        <ProfileScreen ecoFriendlyTips={ecoFriendlyTips} />
      ) : selectedPage === 'Blog' ? (
        <BlogScreen />
      ) : selectedPage === 'StartedChallenge' ? (
        <StartedChallengeScreen />
      ) : null}


      <View
        style={{
          position: 'absolute', bottom: '3%', backgroundColor: '#A4DC07',
          width: '100%,', paddingHorizontal: dimensions.width * 0.05, borderRadius: dimensions.width * 0.1,
          height: '8%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          alignSelf: 'center', paddingVertical: dimensions.height * 0.03
        }}
      >

        <TouchableOpacity
          onPress={() => setSelectedPage('StartedChallenge')}
          style={{
            alignItems: 'center',
            padding: 8,
            backgroundColor: selectedPage === 'StartedChallenge' ? '#1A5932' : 'transparent',
            borderRadius: selectedPage === 'StartedChallenge' ? '50%' : 0
          }}
        >
          <Image
            source={selectedPage === 'StartedChallenge' ? require('../assets/icons/selectedIcons/messageIconSelected.png') : require('../assets/icons/simIcons/messageIconSim.png')}
            style={{ width: dimensions.width * 0.08, height: dimensions.width * 0.08, textAlign: 'center' }}
            resizeMode="contain"
          />
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => setSelectedPage('Home')}
          style={{
            alignItems: 'center',
            padding: 8,
            backgroundColor: selectedPage === 'Home' ? '#1A5932' : 'transparent',
            borderRadius: selectedPage === 'Home' ? '50%' : 0
          }}
        >
          <Image
            source={selectedPage === 'Home' ? require('../assets/icons/selectedIcons/homeIconSelected.png') : require('../assets/icons/simIcons/homeIconSim.png')}
            style={{ width: dimensions.width * 0.08, height: dimensions.width * 0.08, textAlign: 'center' }}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setSelectedPage('Blog')}
          style={{
            alignItems: 'center',
            padding: 8,
            backgroundColor: selectedPage === 'Blog' ? '#1A5932' : 'transparent',
            borderRadius: selectedPage === 'Blog' ? '50%' : 0
          }}
        >
          <Image
            source={selectedPage === 'Blog' ? require('../assets/icons/selectedIcons/bookIconSelected.png') : require('../assets/icons/simIcons/bookIconSim.png')}
            style={{ width: dimensions.width * 0.08, height: dimensions.width * 0.08, textAlign: 'center' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default HomeScreen;
