import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user || 'Guest'} 👋</Text>
      
      <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/quiz')}>
        <Text style={styles.btnText}>▶️ Start Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitBtn} onPress={() => router.replace('/login')}>
        <Text style={styles.exitText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 50 },
  startBtn: { backgroundColor: '#00c853', width: '70%', padding: 20, borderRadius: 15, marginBottom: 20 },
  exitBtn: { marginTop: 20 },
  btnText: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  exitText: { color: 'red', fontSize: 16 }
});