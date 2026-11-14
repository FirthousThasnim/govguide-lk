import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../utils/format';

type Props = {
  label: string;
  mode: 'date' | 'time';
  value: Date;
  onChange: (value: Date) => void;
  minimumDate?: Date;
};

// Native date / time picker. Android shows a dialog, iOS shows a spinner with a Done button.
export function DateTimeField({ label, mode, value, onChange, minimumDate }: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (event.type !== 'dismissed' && selected) onChange(selected);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.field} onPress={() => setShow(true)}>
        <Text style={styles.value}>{mode === 'date' ? formatDate(value) : formatTime(value)}</Text>
        <Text style={styles.icon}>{mode === 'date' ? '📅' : '🕒'}</Text>
      </Pressable>

      {show && (
        <View>
          <DateTimePicker
            value={value}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={minimumDate}
            onChange={handleChange}
          />
          {Platform.OS === 'ios' && (
            <Pressable style={styles.done} onPress={() => setShow(false)}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dde3ee',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  value: { fontSize: 15, color: '#222' },
  icon: { fontSize: 16 },
  done: { alignSelf: 'flex-end', paddingHorizontal: 14, paddingVertical: 6 },
  doneText: { color: '#1e6fd9', fontWeight: '700', fontSize: 15 },
});
