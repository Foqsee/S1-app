import { Stack } from 'expo-router/stack';
import { ThemeProvider } from '../context/ThemeContext';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AppLayout() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
  });

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
