import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, H, Tile, Grid, Btn } from '../../components/ui';
import { Line } from '../../components/charts';
import { useStore } from '../../store';
import { series } from '../../data/mock';
import { ok, warn, crit } from '../../theme';
export default function Home() {
  const r = useRouter(); const { astronauts, userId } = useStore(); const a = astronauts.find((x: any) => x.id === userId) || astronauts[0];
  const health = 100 - Math.round(a.anomaly * 60);
  const [label, bg] = health >= 85 ? ['Stable', '#0B3B8C'] : health >= 60 ? ['Surveillance', '#8A5A00'] : ['Attention', '#8C1D2B'];
  return (
    <Screen title={`Bonjour, ${a.name.split(' ')[0]}`} sub={`${a.role} · ${a.id} · Jour 187`}>
      <Card style={{ backgroundColor: bg, borderColor: bg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View><T s={12} col="#CFE0FF">Mon état aujourd'hui</T><T b s={24} col="#fff">{label}</T><T s={11} col="#CFE0FF">Dernière analyse IA : il y a 12 min</T></View>
        <T b s={40} col="#fff">{health}<T s={14} col="#CFE0FF">/100</T></T>
      </Card>
      <Grid>
        <Tile label="♥ Fréquence" value={a.hr} unit="BPM" /><Tile label="SpO₂" value={a.spo2} unit="%" />
        <Tile label="Température" value={a.temp.toFixed(1)} unit="°C" /><Tile label="Sommeil" value={a.sleep} />
      </Grid>
      <H>Fréquence cardiaque · 24 h</H>
      <Card><Line data={series(24, a.hr, 9, 1)} color="#00D9FF" /></Card>
      <Btn label="+ Déclarer un symptôme" onPress={() => r.navigate('/symptomes')} />
      <Card><T b>Rappel du jour</T><T mu s={12}>Exercice 2 h · hydratation · bilan 18:00</T></Card>
      <T s={11} col={warn} style={{ textAlign: 'center' }}>Données fictives · ne remplace pas l'avis du médecin de vol</T>
    </Screen>
  );
}
