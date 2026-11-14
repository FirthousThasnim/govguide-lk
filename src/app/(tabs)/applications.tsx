import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { services } from '../../data/services';
import {
  Application,
  APPLICATION_STATUSES,
  ApplicationStatus,
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from '../../utils/storage';
import { formatDateTime } from '../../utils/format';

export default function ApplicationsScreen() {
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);

  // reload every time this tab is opened
  useFocusEffect(
    useCallback(() => {
      getApplications().then((list) =>
        setApps([...list].sort((a, b) => a.appointment.localeCompare(b.appointment)))
      );
    }, [])
  );

  const nextStatus = async (app: Application) => {
    const index = APPLICATION_STATUSES.indexOf(app.status);
    const next = APPLICATION_STATUSES[(index + 1) % APPLICATION_STATUSES.length];
    const updated = await updateApplicationStatus(app.id, next);
    setApps([...updated].sort((a, b) => a.appointment.localeCompare(b.appointment)));
  };

  const onDelete = (app: Application) => {
    Alert.alert('Delete application', 'Remove this application from your tracker?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteApplication(app.id);
          setApps([...updated].sort((a, b) => a.appointment.localeCompare(b.appointment)));
        },
      },
    ]);
  };

  const upcoming = apps.filter(
    (a) => a.status === 'Planned' && new Date(a.appointment).getTime() >= Date.now()
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <Text style={styles.subtitle}>
        {apps.length} tracked · {upcoming} upcoming appointment{upcoming === 1 ? '' : 's'}
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/new-application')}>
        <Text style={styles.addText}>+ Plan a new application</Text>
      </TouchableOpacity>

      <FlatList
        data={apps}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No applications yet. Tap the button above to plan your first visit.
          </Text>
        }
        renderItem={({ item }) => {
          const service = services.find((s) => s.id === item.serviceId);
          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{service ? service.name : 'Unknown service'}</Text>
              <Text style={styles.line}>📅 {formatDateTime(new Date(item.appointment))}</Text>
              <Text style={styles.line}>Copies needed: {item.copies}</Text>
              {item.notes !== '' && <Text style={styles.notes}>{item.notes}</Text>}

              <View style={styles.actions}>
                <TouchableOpacity style={[styles.status, statusColors[item.status]]} onPress={() => nextStatus(item)}>
                  <Text style={styles.statusText}>{item.status} ›</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const statusColors: Record<ApplicationStatus, { backgroundColor: string }> = {
  Planned: { backgroundColor: '#1e6fd9' },
  Submitted: { backgroundColor: '#e08a1e' },
  Ready: { backgroundColor: '#1b9a4a' },
  Collected: { backgroundColor: '#777' },
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#f4f6fa' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e6fd9' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 12 },
  addButton: {
    backgroundColor: '#1e6fd9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  addText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  empty: { textAlign: 'center', marginTop: 30, color: '#777', fontSize: 15 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  line: { fontSize: 13, color: '#444', marginTop: 2 },
  notes: { fontSize: 13, color: '#777', marginTop: 6, fontStyle: 'italic' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  status: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statusText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  delete: { color: '#c0392b', fontWeight: '600' },
});
