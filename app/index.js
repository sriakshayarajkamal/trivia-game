import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in text animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Navigate to the updated login page after 4 seconds
    const timer = setTimeout(() => {
      router.replace('/login'); 
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        // Updated to a reliable high-quality quiz animation URL
        source={{ uri: 'https://assets8.lottiefiles.com/packages/lf20_q5pk6p1k.json' }} 
      />
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>QuizBee</Text>
        <Text style={styles.subtitle}>Test Your Brain Power</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  lottie: { 
    width: width * 0.8, 
    height: width * 0.8 
  },
  title: { 
    fontSize: 42, 
    fontWeight: 'bold', 
    color: '#6200ee', 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#888', 
    textAlign: 'center',
    marginTop: 5 
  }
});