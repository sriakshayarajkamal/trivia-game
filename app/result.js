import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Result() {
  const router = useRouter();
  const { score, total } = useLocalSearchParams();
  const isGood = score > (total / 2);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{isGood ? "🎉" : "🙂"}</Text>
      <Text style={styles.msg}>{isGood ? "Great Job!" : "Good Try!"}</Text>
      <Text style={styles.scoreText}>Your Score: {score} / {total}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/home')}>
        <Text style={styles.btnText}>🔁 Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={() => router.replace('/login')}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 80 },
  msg: { fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
  scoreText: { fontSize: 22, marginBottom: 40 },
  btn: { backgroundColor: '#6200ee', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  logout: { marginTop: 30 },
  logoutText: { color: 'red', fontSize: 16 }
});