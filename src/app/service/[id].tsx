import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Service Detail Screen
      </Text>
      <Text>
        Service ID: {id}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8 
  },

  title: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  
});