import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export type DropdownOption = { label: string; value: string };

type Props = {
  label: string;
  value: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

// Simple dropdown: tap the field, pick one option from the list.
export function Dropdown({ label, value, options, onChange, placeholder = 'Select...' }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Text style={selected ? styles.value : styles.placeholder} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, item.value === value && styles.optionActive]}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, item.value === value && styles.optionTextActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
  value: { fontSize: 15, color: '#222', flex: 1 },
  placeholder: { fontSize: 15, color: '#999', flex: 1 },
  arrow: { fontSize: 16, color: '#1e6fd9', marginLeft: 8 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '70%',
    paddingVertical: 8,
  },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#1e6fd9', padding: 14 },
  option: { paddingHorizontal: 16, paddingVertical: 12 },
  optionActive: { backgroundColor: '#e6ecf7' },
  optionText: { fontSize: 15, color: '#333' },
  optionTextActive: { color: '#1e6fd9', fontWeight: '700' },
});
