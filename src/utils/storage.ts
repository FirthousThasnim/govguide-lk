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

// ---------- Application tracker ----------
export type ApplicationStatus = 'Planned' | 'Submitted' | 'Ready' | 'Collected';
export const APPLICATION_STATUSES: ApplicationStatus[] = ['Planned', 'Submitted', 'Ready', 'Collected'];

export type Application = {
  id: string;
  serviceId: string;
  appointment: string; // ISO date-time string
  copies: number;
  status: ApplicationStatus;
  notes: string;
};

const APP_KEY = 'applications';

export async function getApplications(): Promise<Application[]> {
  try {
    const raw = await AsyncStorage.getItem(APP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function saveApplications(list: Application[]) {
  await AsyncStorage.setItem(APP_KEY, JSON.stringify(list));
}

export async function addApplication(data: Omit<Application, 'id'>): Promise<Application[]> {
  const list = await getApplications();
  const updated = [...list, { ...data, id: `${Date.now()}` }];
  await saveApplications(updated);
  return updated;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus): Promise<Application[]> {
  const list = await getApplications();
  const updated = list.map((a) => (a.id === id ? { ...a, status } : a));
  await saveApplications(updated);
  return updated;
}

export async function deleteApplication(id: string): Promise<Application[]> {
  const list = await getApplications();
  const updated = list.filter((a) => a.id !== id);
  await saveApplications(updated);
  return updated;
}
