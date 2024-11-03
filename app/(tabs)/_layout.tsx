import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="analytics" color={color}  size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="input"
        options={{
          title: 'Input',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="add-circle" color={color}  size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cog' : 'cog-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
