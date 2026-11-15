import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useC } from '../../theme';
const I: any = { home: 'home-outline', symptomes: 'add-outline', analyse: 'pulse-outline', historique: 'time-outline', moi: 'person-outline' };
const L: any = { home: 'Accueil', symptomes: 'Symptômes', analyse: 'Analyse', historique: 'Historique', moi: 'Profil' };
export default function AstroTabs() {
  const c = useC();
  return <Tabs screenOptions={({ route }: any) => ({ headerShown: false, tabBarActiveTintColor: c.cy, tabBarInactiveTintColor: c.mu, tabBarStyle: { backgroundColor: c.card, borderTopColor: c.bd }, tabBarLabel: L[route.name], tabBarIcon: ({ color, size }: any) => <Ionicons name={I[route.name] || 'ellipse-outline'} size={size} color={color} /> })}>
    {Object.keys(I).map(n => <Tabs.Screen key={n} name={n} />)}
    <Tabs.Screen name="conseils" options={{ href: null }} />
  </Tabs>;
}
