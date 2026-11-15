import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Screen, Card, T, H, Bar, Badge, Btn, Demo } from '../components/ui';
import { Gauge } from '../components/charts';
import { useStore } from '../store';
import { api } from '../services/api';
import { ok, warn, crit } from '../theme';
const colr = (s: number) => (s > 0.7 ? crit : s > 0.4 ? warn : ok);
export default function IA() {
  const { astronauts, setScore } = useStore(); const [id, setId] = useState('AST-05'); const [busy, setBusy] = useState(false);
  const a = astronauts.find((x: any) => x.id === id);
  const run = async () => { setBusy(true); try { const { score } = await api.predict(a.id, a.anomaly); setScore(a.id, score); } finally { setBusy(false); } };
  return (
    <Screen title="IA anomalies" sub="Modèle Python" back>
      <Card style={{ alignItems: 'center', gap: 8 }}><Gauge value={a.anomaly} color={colr(a.anomaly)} label={a.anomaly.toFixed(2)} sub={a.name.split(' ')[1]} size={170} /><Badge label={a.anomaly > 0.7 ? 'Anomalie probable' : a.anomaly > 0.4 ? 'À surveiller' : 'Normal'} color={colr(a.anomaly)} /></Card>
      <H>Scores de l'équipage</H>
      <Card style={{ gap: 10 }}>{astronauts.map((x: any) => <TouchableOpacity key={x.id} onPress={() => setId(x.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><T b={x.id === id} style={{ width: 60 }}>{x.name.split(' ')[0]}</T><Bar v={x.anomaly} color={colr(x.anomaly)} /><T b>{x.anomaly.toFixed(2)}</T></TouchableOpacity>)}</Card>
      <Btn label={busy ? 'Analyse en cours…' : "Relancer l'analyse"} onPress={run} />
      <Card style={{ borderStyle: 'dashed' }}><T b>Branchement du modèle</T><T mu s={12}>App Expo → API Laravel → service Python (POST /predict) → score 0–1 stocké dans MySQL. Scores affichés : simulés.</T></Card>
      <Demo />
    </Screen>
  );
}
