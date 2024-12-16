import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform } from 'react-native';
import { styled } from 'nativewind';
import verdeOnboardingData from '../components/verdeOnboardingDataFile';
import { useNavigation } from '@react-navigation/native';


const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';
const fontNunitoSemBold = 'Nunito-SemiBold';

const OnboardingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
  
    const dimensionListener = Dimensions.addEventListener('change', onChange);
  
    return () => {
      dimensionListener.remove(); 
    };
  }, []);
  



  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToTheNextOnboard = () => {
    if (currentIndex < verdeOnboardingData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Home'); 
    }
  };


  const renderItem = ({ item }) => (
    <View style={{ width: dimensions.width, flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} >
      <Image
        resizeMode="stretch"
        source={item.image}
        style={{
          marginBottom: 16,
          height: '55%',
          width: '100%',
        }}
      />
      <View style={{alignItems: 'center', height: '55%',  zIndex: 0, width: '100%', alignSelf: 'center',  backgroundColor: 'white', marginTop: '-14%', borderTopLeftRadius: '8%', borderTopRightRadius: '8%'}}>
        <Text
        style={{ 
          fontSize: dimensions.width * 0.07, 
          fontFamily: fontNunitoExtraBold, 
          maxWidth: '70%',
          color: '#1A5932',
          marginTop: 21,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          {item.title}
        </Text>
        <Text 
          style={{ fontFamily: fontNunitoRegular, 
          fontSize: dimensions.width < 400 ? dimensions.width * 0.04 : dimensions.width * 0.045,
          paddingHorizontal: 21,
          color: '#000000',
          textAlign: 'center',
          marginTop: 8,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <StyledView 
      style={{justifyContent: 'space-between', flex: 1, backgroundColor: '#1A5932', alignItems: 'center',}}
    >
      <StyledView style={{display: 'flex'}}>
        <FlatList
          data={verdeOnboardingData}
          renderItem={renderItem}
          horizontal
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </StyledView>

      <StyledTouchableOpacity
        onPress={() => {
          if(currentIndex === verdeOnboardingData.length - 1) {
            navigation.navigate('Home');
          } else scrollToTheNextOnboard();
        }}
        style={{
          bottom: '16%',
          backgroundColor: '#1A5932',
          borderRadius: 9999,
          paddingVertical: 21,
          paddingHorizontal: 28,
          marginBottom: 40,
          alignSelf: 'center',
          width: '80%',
        }}
      >
        <Text
          style={{ fontFamily: fontNunitoExtraBold, color: '#A4DC07', fontSize: dimensions.width * 0.05, textAlign: 'center', fontWeight: 600 }}>
            {currentIndex === 0 ? 'Get Started' : currentIndex === verdeOnboardingData.length - 1 ? 'Let`s Go Green!' : 'Continue'}
        </Text>
      </StyledTouchableOpacity>

    </StyledView>
  );
};

export default OnboardingScreen;
