import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../store';
import { useC } from '../theme';
export default function Root() {
  const c = useC(); const load = useStore((s: any) => s.load);
  useEffect(() => { load(); }, []);
  return <><StatusBar style={useStore((s: any) => s.dark) ? 'light' : 'dark'} /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }} /></>;
}
