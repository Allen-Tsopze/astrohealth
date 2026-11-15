import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Card, T, H, Badge, Avatar, Btn, Grid, Tile } from '../../components/ui';
import { useStore } from '../../store';
import { sevColor, crit } from '../../theme';
export default function Alerte() {
  const { id } = useLocalSearchParams(); const r = useRouter(); const { alerts, astronauts, setAlert } = useStore();
  const a = alerts.find((x: any) => x.id === id); if (!a) return <Screen title="Alerte" back><T mu>Alerte introuvable.</T></Screen>;
  const as = astronauts.find((x: any) => x.id === a.aid);
  return (
    <Screen title="Alerte" sub={a.id} back>
      <Card color={sevColor[a.sev]} style={{ gap: 6 }}><Badge label={a.sev} color={sevColor[a.sev]} /><T b s={18}>{a.title}</T><T mu s={12}>15 nov. 2026 · {a.time} · Catégorie : {a.cat}</T><T mu s={12}>Statut : {a.status}</T></Card>
      {as && <Card onPress={() => r.push('/profil/' + as.id)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Avatar name={as.name} color={as.color} /><View style={{ flex: 1 }}><T b>{as.name}</T><T mu s={12}>{as.role} · {as.id}</T></View><T col="#00D9FF">Profil</T></Card>}
      {as && <Grid><Tile label="SpO₂" value={as.spo2} unit="%" color={crit} /><Tile label="FC" value={as.hr} unit="BPM" /></Grid>}
      <H>Description</H><Card><T>{a.text}. Surveillance continue recommandée.</T></Card>
      {as && <Card style={{ borderStyle: 'dashed' }}><T b>🧠 Analyse IA</T><T mu s={12}>Score d'anomalie {as.anomaly.toFixed(2)} · emplacement du modèle Python</T></Card>}
      {a.status === 'Nouvelle' && <Btn label="Accuser réception" onPress={() => setAlert(a.id, 'Reçue')} />}
      {a.status !== 'Résolue' && <Btn variant="o" label="Marquer comme résolue" onPress={() => { setAlert(a.id, 'Résolue'); r.back(); }} />}
    </Screen>
  );
}
