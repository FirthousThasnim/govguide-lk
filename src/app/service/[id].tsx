import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { services } from '../../data/services';
import { getFavourites, toggleFavourite } from '../../utils/storage';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((s) => s.id === id);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    getFavourites().then((list) => setIsFav(list.includes(String(id))));
  }, [id]);

  const onToggleFav = async () => {
    const updated = await toggleFavourite(String(id));
    setIsFav(updated.includes(String(id)));
  };

  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Service not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Stack.Screen options={{ title: service.category }} />

      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.badge}>{service.category}</Text>

      <TouchableOpacity
        style={[styles.favButton, isFav && styles.favButtonActive]}
        onPress={onToggleFav}
      >
        <Text style={[styles.favText, isFav && styles.favTextActive]}>
          {isFav ? '♥ Saved to Favourites' : '♡ Add to Favourites'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Department / Office</Text>
        <Text style={styles.text}>{service.department}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        {service.documents.map((doc, index) => (
          <Text key={index} style={styles.text}>
            • {doc}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fee</Text>
        <Text style={styles.text}>{service.fee}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Processing Time</Text>
        <Text style={styles.text}>{service.processingTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps</Text>
        {service.steps.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f4f6fa' 
  },

  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  notFound: { 
    fontSize: 16, 
    color: '#777' 
  },

  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#222' 
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6ecf7',
    color: '#1e6fd9',
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 8,
    overflow: 'hidden',
  },

  favButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0457b',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 12,
  },

  favButtonActive: { 
    backgroundColor: '#e0457b' 
  },

  favText: { 
    color: '#e0457b', 
    fontWeight: '600' 
  },

  favTextActive: { 
    color: '#fff' 
  },

  description: { 
    fontSize: 15, 
    color: '#444', 
    marginTop: 12, 
    lineHeight: 22 
  },

  section: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginTop: 14,
    elevation: 2,
  },

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1e6fd9', 
    marginBottom: 6 
  },

  text: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 4, 
    lineHeight: 20 
  },
  
});