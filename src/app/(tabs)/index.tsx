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
import { useTheme } from '@/hooks/use-theme';
import { useThemeContext } from '@/context/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();

  // Get current theme colors
  const colors = useTheme();
  const { theme, toggleTheme } = useThemeContext();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(services.map((s) => s.category)))],
    []
  );

  // Search and category filtering
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
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            GovGuide LK
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Showing {filteredServices.length} of {services.length} services
          </Text>
        </View>

        {/* Theme Toggle Button */}
        <TouchableOpacity
          style={[
            styles.themeButton,
            { backgroundColor: colors.backgroundElement },
          ]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeButtonText, { color: colors.text }]}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.backgroundElement,
            color: colors.text,
            borderColor: colors.backgroundSelected,
          },
        ]}
        placeholder="Search services..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />

      {/* Category Filter */}
      <View style={styles.chipRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    selectedCategory === cat
                      ? '#1e6fd9'
                      : colors.backgroundSelected,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color:
                      selectedCategory === cat
                        ? '#ffffff'
                        : colors.text,
                  },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Service List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              { color: colors.textSecondary },
            ]}
          >
            No services found.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: colors.backgroundElement },
            ]}
            onPress={() =>
              router.push({
                pathname: '/service/[id]',
                params: { id: item.id },
              })
            }
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.name}
            </Text>

            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text
              style={[
                styles.department,
                { color: colors.textSecondary },
              ]}
            >
              {item.department}
            </Text>
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
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e6fd9',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 3,
  },

  themeButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },

  themeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },

  searchBox: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: 10,
  },

  chipRow: {
    height: 44,
    marginBottom: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    height: 36,
  },

  chipText: {
    fontWeight: '600',
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },

  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  category: {
    fontSize: 13,
    color: '#1e6fd9',
    marginTop: 4,
  },

  department: {
    fontSize: 12,
    marginTop: 2,
  },
});