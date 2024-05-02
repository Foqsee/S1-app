import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: '#111111',
        padding: 10,
      }}
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#111111'
        },
        headerTintColor: '#fff',
        tabBarItemStyle: {
          backgroundColor: '#111111',
        },
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
