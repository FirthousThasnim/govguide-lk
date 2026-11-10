import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { services } from '../../data/services';
import { getFavourites } from '../../utils/storage';

export default function FavouritesScreen() {
  const router = useRouter();
  const [favIds, setFavIds] = useState<string[]>([]);

  // indha tab open aagura ovvoru thadavaiyum thirumba load aagum
  useFocusEffect(
    useCallback(() => {
      getFavourites().then(setFavIds);
    }, [])
  );

  const favServices = services.filter((s) => favIds.includes(s.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <Text style={styles.subtitle}>{favServices.length} saved services</Text>

      <FlatList
        data={favServices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No favourites yet. Open a service and tap "Add to Favourites".
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: '/service/[id]', params: { id: item.id } })
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

  empty: { 
    textAlign: 'center', 
    marginTop: 40, 
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