import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    sceneContainer: {
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      padding: 10,
    },
    header: {
      backgroundColor: theme === 'dark' ? '#111111' : '#fff',
    },
    tabBarItem: {
      backgroundColor: theme === 'dark' ? '#111111' : '#fff',
    },
  });

  return (
    <Tabs
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: theme === 'dark' ? '#0ea5e9' : '#000',
        tabBarInactiveTintColor: theme === 'dark' ? '#fff' : '#000',
        headerStyle: styles.header,
        headerTintColor: theme === 'dark' ? '#fff' : '#000',
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Feather size={20} name="mic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Feather size={20} name="sliders" color={color} />,
        }}
      />
    </Tabs>
  );
}
