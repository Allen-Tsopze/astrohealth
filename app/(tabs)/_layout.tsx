import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useC } from '../../theme';
const I: any = { accueil: 'home-outline', equipe: 'people-outline', live: 'pulse-outline', alertes: 'notifications-outline', plus: 'menu-outline' };
const L: any = { accueil: 'Accueil', equipe: 'Équipe', live: 'Live', alertes: 'Alertes', plus: 'Plus' };
export default function TabsLayout() {
  const c = useC();
  return <Tabs screenOptions={({ route }: any) => ({ headerShown: false, tabBarActiveTintColor: c.cy, tabBarInactiveTintColor: c.mu, tabBarStyle: { backgroundColor: c.card, borderTopColor: c.bd }, tabBarLabel: L[route.name], tabBarIcon: ({ color, size }: any) => <Ionicons name={I[route.name]} size={size} color={color} /> })}>
    {Object.keys(I).map(n => <Tabs.Screen key={n} name={n} />)}
  </Tabs>;
}
