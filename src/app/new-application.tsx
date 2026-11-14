import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { services } from '../data/services';
import { addApplication, APPLICATION_STATUSES, ApplicationStatus } from '../utils/storage';
import { Dropdown } from '../components/dropdown';
import { DateTimeField } from '../components/date-time-field';

const MAX_COPIES = 10;

export default function NewApplicationScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams<{ serviceId?: string }>();

  const [selectedService, setSelectedService] = useState<string | null>(serviceId ? String(serviceId) : null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [copies, setCopies] = useState('1');
  const [status, setStatus] = useState<ApplicationStatus>('Planned');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const serviceOptions = services.map((s) => ({ label: s.name, value: s.id }));
  const statusOptions = APPLICATION_STATUSES.map((s) => ({ label: s, value: s }));

  const onSave = async () => {
    const copiesNumber = parseInt(copies, 10);

    if (!selectedService) return setError('Please select a service.');
    if (isNaN(copiesNumber) || copiesNumber < 1 || copiesNumber > MAX_COPIES) {
      return setError(`Number of copies must be between 1 and ${MAX_COPIES}.`);
    }

    // merge the chosen date and the chosen time into one appointment date-time
    const appointment = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
      time.getHours(), time.getMinutes()
    );
    if (status === 'Planned' && appointment.getTime() < Date.now()) {
      return setError('A planned appointment must be in the future.');
    }

    await addApplication({
      serviceId: selectedService,
      appointment: appointment.toISOString(),
      copies: copiesNumber,
      status,
      notes: notes.trim(),
    });
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.intro}>
        Plan your visit to the government office and keep track of your application.
      </Text>

      <Dropdown
        label="Service"
        value={selectedService}
        options={serviceOptions}
        onChange={(v) => { setSelectedService(v); setError(''); }}
        placeholder="Select a service"
      />

      <DateTimeField label="Appointment date" mode="date" value={date} onChange={setDate} minimumDate={new Date()} />
      <DateTimeField label="Appointment time" mode="time" value={time} onChange={setTime} />

      <View style={styles.block}>
        <Text style={styles.label}>Number of copies needed</Text>
        <TextInput
          style={styles.input}
          value={copies}
          keyboardType="number-pad"
          maxLength={2}
          // keep digits only
          onChangeText={(t) => { setCopies(t.replace(/[^0-9]/g, '')); setError(''); }}
        />
      </View>

      <Dropdown
        label="Status"
        value={status}
        options={statusOptions}
        onChange={(v) => setStatus(v as ApplicationStatus)}
      />

      <View style={styles.block}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.notes]}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Take original birth certificate"
          multiline
        />
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>Save Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6fa' },
  intro: { fontSize: 14, color: '#555', lineHeight: 20 },
  block: { marginTop: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dde3ee',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  notes: { minHeight: 80, textAlignVertical: 'top' },
  error: { color: '#c0392b', marginTop: 14, fontSize: 14 },
  saveButton: {
    backgroundColor: '#1e6fd9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
