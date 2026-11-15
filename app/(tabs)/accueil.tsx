import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Card, T, H, Tile, Grid, Avatar, Bar, Demo, Badge, ok, warn, crit } from '../../components/ui';
import { useStore } from '../../store';
import { stColor, stLabel } from '../../theme';
export default function Home() {
  const r = useRouter(); const { astronauts, alerts } = useStore();
  const act = alerts.filter((a: any) => a.status !== 'Résolue'); const crits = act.filter((a: any) => a.sev === 'critique');
  return (
    <Screen title="ASTROHEALTH" sub="Vue d'ensemble · Expédition Mars 2026">
      <Card style={{ backgroundColor: '#0B3B8C' }}><T b s={20} col="#fff">EXPÉDITION MARS 2026</T><T s={12} col="#CFE0FF">Jour 187 sur 300 · Comm. délai 7 min 53 s</T><View style={{ marginTop: 10, flexDirection: 'row' }}><Bar v={0.62} color="#00D9FF" /></View></Card>
      <Grid>
        <Tile label="Astronautes" value={astronauts.length} onPress={() => r.push('/equipe')} />
        <Tile label="Stables" value={astronauts.filter((a: any) => a.status === 'stable').length} unit={`/ ${astronauts.length}`} color={ok} />
        <Tile label="Alertes" value={act.length} color={crit} />
        <Tile label="Radiations" value="MODÉRÉE" color={warn} style={{ minWidth: '45%' }} />
      </Grid>
      {crits[0] && <Card color={crit} onPress={() => r.push('/alerte/' + crits[0].id)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Ionicons name="warning" size={26} color={crit} /><View style={{ flex: 1 }}><T b>Alerte critique · {crits[0].who}</T><T mu s={12}>{crits[0].text} · {crits[0].time}</T></View></Card>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><H>État de l'équipage</H><T col="#00D9FF" s={13} style={{}} >Voir tout</T></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {astronauts.map((a: any) => <Card key={a.id} onPress={() => r.push('/profil/' + a.id)} style={{ width: 130, alignItems: 'center', gap: 4 }}><Avatar name={a.name} color={a.color} size={46} /><T b s={13}>{a.name.split(' ')[0]}</T><T mu s={11}>{a.role}</T><T s={12} col={stColor[a.status]}>♥ {a.hr} · {stLabel[a.status]}</T></Card>)}
      </ScrollView>
      <H>Détection d'anomalies IA</H>
      <Card onPress={() => r.push('/ia')} style={{ borderStyle: 'dashed', gap: 8 }}>
        {[...astronauts].sort((a: any, b: any) => b.anomaly - a.anomaly).slice(0, 3).map((a: any) => <View key={a.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><T style={{ width: 60 }}>{a.name.split(' ')[1]}</T><Bar v={a.anomaly} color={a.anomaly > 0.7 ? crit : a.anomaly > 0.4 ? warn : ok} /><T b>{a.anomaly.toFixed(2)}</T></View>)}
      </Card>
      <Demo />
    </Screen>
  );
}
