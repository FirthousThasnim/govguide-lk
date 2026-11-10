import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_KEY = 'favourites';
const DOC_KEY = 'myDocuments';

async function getList(key: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function toggleInList(key: string, value: string): Promise<string[]> {
  const list = await getList(key);
  const updated = list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
  await AsyncStorage.setItem(key, JSON.stringify(updated));
  return updated;
}

export const getFavourites = () => getList(FAV_KEY);
export const toggleFavourite = (id: string) => toggleInList(FAV_KEY, id);
export const getMyDocuments = () => getList(DOC_KEY);
export const toggleMyDocument = (name: string) => toggleInList(DOC_KEY, name);