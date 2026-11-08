import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen(){
  const router = useRouter();

  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        GovGuide LK
      </Text>
      <Text>Home Screen</Text>

      <Button title="Open sample detail"
        onPress={() => router.push('/service/1' as any)}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  
});