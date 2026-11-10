import { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { services } from '../../data/services';
import { getMyDocuments, toggleMyDocument } from '../../utils/storage';

export default function ChecklistScreen() {
  const [myDocs, setMyDocs] = useState<string[]>([]);

  // ella services-layum irukkura unique documents
  const allDocs = useMemo(
    () => Array.from(new Set(services.flatMap((s) => s.documents))).sort(),
    []
  );

  useFocusEffect(
    useCallback(() => {
      getMyDocuments().then(setMyDocs);
    }, [])
  );

  const onToggle = async (name: string) => {
    const updated = await toggleMyDocument(name);
    setMyDocs(updated);
  };

  // oru service-ku thevaiyaana ella documents-um irundha "Ready"
  const readyServices = services.filter((s) =>
    s.documents.every((d) => myDocs.includes(d))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Documents</Text>
      <Text style={styles.subtitle}>
        {myDocs.length} of {allDocs.length} documents ready
      </Text>

      <View style={styles.readyBox}>
        <Text style={styles.readyTitle}>Services you can apply for now</Text>
        {readyServices.length === 0 ? (
          <Text style={styles.readyText}>None yet. Tick the documents you have.</Text>
        ) : (
          readyServices.map((s) => (
            <Text key={s.id} style={styles.readyText}>
              ✓ {s.name}
            </Text>
          ))
        )}
      </View>

      <FlatList
        data={allDocs}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const checked = myDocs.includes(item);
          return (
            <TouchableOpacity style={styles.row} onPress={() => onToggle(item)}>
              <Text style={styles.box}>{checked ? '☑' : '☐'}</Text>
              <Text style={[styles.rowText, checked && styles.rowTextDone]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
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

  readyBox: {
    backgroundColor: '#e8f6ec',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  readyTitle: { 
    fontWeight: '700', 
    color: '#1b7a3a', 
    marginBottom: 4 
},

  readyText: { 
    color: '#256b3a', 
    fontSize: 13 
},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },

  box: { 
    fontSize: 22, 
    marginRight: 10, 
    color: '#1e6fd9' 
},

  rowText: { 
    fontSize: 15, 
    color: '#333', 
    flex: 1 
},

  rowTextDone: { 
    color: '#888', 
    textDecorationLine: 'line-through' 
},

});