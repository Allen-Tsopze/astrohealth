import React from 'react';
import { View } from 'react-native';
import { Screen, Card, T, H, Tile, Grid, Bar, Badge, Demo, warn, ok } from '../components/ui';
import { Gauge, Line, ShipRadar } from '../components/charts';
import { useStore } from '../store';
import { series } from '../data/mock';
export default function Radiations() {
  const astronauts = useStore((s: any) => s.astronauts);
  return (
    <Screen title="Radiations" sub="Surveillance de l'exposition" back>
      <Card style={{ alignItems: 'center', gap: 8 }}><Gauge value={0.47} max={1} color={warn} label="0,47" sub="mSv / jour" /><Badge label="Alerte niveau 2" color={warn} /></Card>
      <Grid><Tile label="Dose cumulée" value="88" unit="mSv" /><Tile label="Neutrons" value="0,18" unit="mSv/j" color={ok} /></Grid>
      <H>Autour du vaisseau</H><ShipRadar />
      <H>Évolution</H><Card><Line data={series(40, 0.4, 0.07)} color="#00D9FF" thr={0.5} /></Card>
      <H>Exposition individuelle</H>
      <Card style={{ gap: 8 }}>{astronauts.map((a: any) => <View key={a.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><T style={{ width: 60 }}>{a.name.split(' ')[0]}</T><Bar v={a.dose / 120} color={a.dose > 87 ? warn : '#00D9FF'} /><T mu s={12}>{a.dose}</T></View>)}</Card>
      <Card><T b>Spectromètre CANS</T><T mu s={12}>Instrument canadien de mesure des neutrons. Valeurs simulées.</T></Card>
      <Demo />
    </Screen>
  );
}
