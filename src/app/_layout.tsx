import { Stack } from 'expo-router';
import { ThemeProvider, useThemeContext } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function RootNavigation() {

  const { theme } = useThemeContext();

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
          },
          headerTintColor: theme === 'dark' ? '#ffffff' : '#000000',
          contentStyle: {
            backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="service/[id]"
          options={{ title: 'Service Details' }}
        />

        <Stack.Screen
          name="new-application"
          options={{ title: 'New Application' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}