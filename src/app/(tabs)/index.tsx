import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { services } from '../../data/services';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GovGuide LK</Text>
      <Text style={styles.subtitle}>Government services guide ({services.length} services)</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/service/[id]',
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.department}>{item.department}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50, 
    paddingHorizontal: 16, 
    backgroundColor: '#f4f6fa' 
  },

  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1e6fd9' 
  },

  subtitle: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 12 
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600' 
  },

  category: { 
    fontSize: 13, 
    color: '#1e6fd9', 
    marginTop: 4 
  },

  department: { 
    fontSize: 12, 
    color: '#777', 
    marginTop: 2 
  },
  
});