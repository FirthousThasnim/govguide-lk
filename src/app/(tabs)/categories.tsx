import { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { services } from '../../data/services';

export default function CategoriesScreen() {
  const router = useRouter();

  const sections = useMemo(() => {
    const cats = Array.from(new Set(services.map((s) => s.category))).sort();
    return cats.map((cat) => ({
      title: cat,
      data: services.filter((s) => s.category === cat),
    }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <Text style={styles.subtitle}>{sections.length} categories</Text>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>
            {section.title} ({section.data.length})
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: '/service/[id]', params: { id: item.id } })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
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
    marginBottom: 8 
},

  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e6fd9',
    marginTop: 14,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },

  cardTitle: { 
    fontSize: 15, 
    fontWeight: '600' 
},

  department: { 
    fontSize: 12, 
    color: '#777', 
    marginTop: 3 
},

});