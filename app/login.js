import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [name, setName] = useState('');
  const router = useRouter();
  const slideUp = useRef(new Animated.Value(100)).current; 

  useEffect(() => {
    Animated.spring(slideUp, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    if (name.length > 2) {
      router.push({ pathname: '/home', params: { user: name } });
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideUp }] }]}>
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.label}>Username</Text>
      
      {/* FIXED: Added placeholderTextColor and updated style to 
          ensure text is not white on a white background.
      */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter Name" 
        placeholderTextColor="#888" // Sets visible placeholder color
        onChangeText={setName}
        value={name}
      />
      
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#6200ee' },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    color: '#000',           // FORCES typed text to be BLACK
    backgroundColor: '#fff'  // Ensures background is white
  },
  btn: { backgroundColor: '#6200ee', padding: 18, borderRadius: 12, elevation: 3 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }
});