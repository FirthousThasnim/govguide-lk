import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { services } from '../../data/services';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(services.map((s) => s.category)))],
    []
  );

  const filteredServices = useMemo(() => {
    const text = search.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory =
        selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(text) ||
        s.department.toLowerCase().includes(text) ||
        s.description.toLowerCase().includes(text);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GovGuide LK</Text>
      <Text style={styles.subtitle}>
        Showing {filteredServices.length} of {services.length} services
      </Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Search services..."
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />

      <View style={styles.chipRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No services found.</Text>
        }
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

  title: { fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1e6fd9' 
  },

  subtitle: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 10 
  },

  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dde3ee',
    marginBottom: 10,
  },

  chipRow: { 
    height: 44, 
    marginBottom: 8 
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e6ecf7',
    marginRight: 8,
    height: 36,
  },

  chipActive: { 
    backgroundColor: '#1e6fd9' 
  },

  chipText: { 
    color: '#1e6fd9', 
    fontWeight: '600' 
  },

  chipTextActive: { 
    color: '#fff' 
  },

  empty: { 
    textAlign: 'center', 
    marginTop: 30, 
    color: '#777', 
    fontSize: 15 
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