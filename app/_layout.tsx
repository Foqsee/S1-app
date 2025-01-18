import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '../context/ThemeContext';

export default function AppLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
