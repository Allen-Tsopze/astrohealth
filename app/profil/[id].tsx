import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Card, T, H, Tile, Grid, Avatar, StatusBadge } from '../../components/ui';
import { useStore } from '../../store';
export default function Profil() {
  const { id } = useLocalSearchParams(); const a = useStore((s: any) => s.astronauts).find((x: any) => x.id === id);
  if (!a) return <Screen title="Profil" back><T mu>Astronaute introuvable.</T></Screen>;
  return (
    <Screen title="Profil" back>
      <Card style={{ alignItems: 'center', gap: 6 }}><Avatar name={a.name} color={a.color} size={80} /><T b s={20}>{a.name}</T><T mu s={12}>{a.id} · {a.age} ans · {a.country} · {a.role}</T><StatusBadge st={a.status} /></Card>
      <Grid><Tile label="FC" value={a.hr} unit="BPM" /><Tile label="SpO₂" value={a.spo2} unit="%" /><Tile label="Temp." value={a.temp.toFixed(1)} unit="°C" /><Tile label="Tension" value={a.bp} /></Grid>
      <H>Antécédents</H><Card><T>{a.history}</T></Card>
      <H>Incidents précédents</H><Card style={{ gap: 6 }}>{a.incidents.length ? a.incidents.map((i: string) => <T key={i}>• {i}</T>) : <T mu>Aucun incident.</T>}</Card>
      <H>Médicaments et examens</H><Card><T>{a.meds}</T></Card>
    </Screen>
  );
}
