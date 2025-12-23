import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// IMPORTANT: Ensure this IP matches your laptop's current IPv4
const BACKEND_URL = 'http://10.66.5.105:3000/api/questions';

export default function Quiz() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15); 

  // Fetch Questions from your Python Backend
  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Timer Countdown Logic
  useEffect(() => {
    if (loading || questions.length === 0 || currentQuestion >= questions.length) return;

    if (timeLeft === 0) {
      handleAnswer(null); // Automatically move forward if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval to prevent memory leaks
  }, [timeLeft, loading, currentQuestion]);

  const handleAnswer = (selectedOption) => {
    // Check answer using the 'answer' key from your main.py
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(15); // Reset timer for the next question
    } else {
      // Final Results Alert
      Alert.alert("Quiz Complete", `Well done ${user}! Your score: ${score}/${questions.length}`, [
        { text: "Finish", onPress: () => router.replace('/') }
      ]);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{marginTop: 10}}>Fetching Questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Visual Timer */}
      <View style={styles.timerBox}>
        <Text style={[styles.timerText, timeLeft <= 5 ? {color: 'red'} : {color: '#6200ee'}]}>
          ⏱️ {timeLeft}s
        </Text>
      </View>

      <Text style={styles.progress}>Question {currentQuestion + 1} of {questions.length}</Text>
      
      {/* Question Text using the 'question' key from your main.py */}
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>

      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionBtn} 
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timerBox: { alignSelf: 'center', marginBottom: 20, padding: 12, borderRadius: 15, backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#eee' },
  timerText: { fontSize: 24, fontWeight: 'bold' },
  progress: { fontSize: 14, color: '#888', marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
  question: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#333' },
  optionBtn: { backgroundColor: '#6200ee', padding: 18, borderRadius: 15, marginBottom: 15, elevation: 2 },
  optionText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600' }
});