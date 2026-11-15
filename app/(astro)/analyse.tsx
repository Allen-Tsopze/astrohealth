import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, H, Bar, Badge, Btn } from '../../components/ui';
import { Gauge } from '../../components/charts';
import { useStore } from '../../store';
import { ok, warn, crit } from '../../theme';
export default function Analyse() {
  const r = useRouter(); const a = useStore((s: any) => s.analysis);
  if (!a) return (
    <Screen title="Analyse" sub="Aucune analyse en cours">
      <Card style={{ gap: 10 }}><T b>Pas encore d'analyse</T><T mu s={13}>Déclare tes symptômes pour obtenir un score d'anomalie.</T><Btn label="Déclarer un symptôme" onPress={() => r.navigate('/symptomes')} /></Card>
    </Screen>);
  const col = a.score < 0.35 ? ok : a.score < 0.7 ? warn : crit;
  const txt = a.level === 'faible' ? 'Anomalie faible · niveau léger' : a.level === 'modéré' ? 'Anomalie possible · niveau modéré' : 'Anomalie probable · niveau élevé';
  return (
    <Screen title="Analyse" sub="Étape 2 sur 2" back onBack={() => r.navigate('/symptomes')}>
      <Card style={{ alignItems: 'center', gap: 10 }}><Gauge value={a.score} color={col} label={a.score.toFixed(2)} sub="score d'anomalie" size={170} /><Badge label={txt} color={col} /></Card>
      <H>Anomalie prédite</H>
      <Card><T b>{a.label}</T><T mu s={12}>Confiance du modèle : {a.confidence} %</T></Card>
      <H>Facteurs détectés</H>
      <Card style={{ gap: 10 }}>{a.factors.map((f: any) => <View key={f.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><T s={12} style={{ width: 120 }}>{f.name}</T><Bar v={f.v} color={warn} /></View>)}</Card>
      <Card style={{ borderStyle: 'dashed' }}><T b>🧠 Résultat du modèle Python</T><T mu s={12}>Zone alimentée par POST /predict (score, label, confiance). Valeurs simulées.</T></Card>
      <Btn label="Voir les conseils" onPress={() => r.navigate('/conseils')} />
    </Screen>
  );
}
