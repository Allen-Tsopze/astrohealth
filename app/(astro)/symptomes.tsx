import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, T, H, Btn } from '../../components/ui';
import { useStore } from '../../store';
import { useC, crit } from '../../theme';
import { analyzeSymptoms } from '../../services/api';
const SYM = ['Maux de tête', 'Vertiges', 'Nausées', 'Fatigue', 'Douleur thoracique', 'Essoufflement', 'Fièvre', 'Vision floue', 'Troubles du sommeil', 'Douleur musculaire'];
const SINCE = ['< 1 h', "Aujourd'hui", '2–3 jours', '> 1 semaine'];
const SEG = ['#16C784', '#5BCB6B', '#9BCF55', '#D4CE45', '#FFC93A', '#FFAA33', '#FF8C33', '#FF6E3D', '#FF5A45', '#FF4757'];
export default function Symptomes() {
  const r = useRouter(); const c = useC(); const setAnalysis = useStore((s: any) => s.setAnalysis);
  const [sel, setSel] = useState<string[]>([]); const [int, setInt] = useState(5); const [since, setSince] = useState("Aujourd'hui"); const [desc, setDesc] = useState(''); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const chip = (t: string, on: boolean, f: () => void) => <TouchableOpacity key={t} onPress={f} style={{ paddingHorizontal: 14, paddingVertical: 9, borderRadius: 99, backgroundColor: on ? c.pri : c.card, borderWidth: 1, borderColor: on ? c.pri : c.bd }}><T s={13} b col={on ? '#fff' : c.tx}>{t}</T></TouchableOpacity>;
  const go = async () => {
    if (!sel.length) return setErr('Choisis au moins un symptôme.');
    setErr(''); setBusy(true);
    try { setAnalysis(await analyzeSymptoms({ symptoms: sel, intensity: int + 1, since, description: desc })); r.navigate('/analyse'); }
    catch (e) { setErr("L'analyse a échoué. Vérifie la connexion à l'API."); } finally { setBusy(false); }
  };
  return (
    <Screen title="Mes symptômes" sub="Étape 1 sur 2" back onBack={() => r.navigate('/home')}>
      <H>Que ressens-tu ?</H>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{SYM.map(t => chip(t, sel.includes(t), () => setSel(sel.includes(t) ? sel.filter(x => x !== t) : [...sel, t])))}</View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><H>Intensité</H><T b col={SEG[int]}>{int + 1}/10</T></View>
      <View style={{ flexDirection: 'row', gap: 3 }}>{SEG.map((col, i) => <TouchableOpacity key={i} onPress={() => setInt(i)} style={{ flex: 1, height: 22, borderRadius: 5, backgroundColor: i <= int ? col : c.bd }} />)}</View>
      <H>Depuis quand ?</H>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{SINCE.map(t => chip(t, since === t, () => setSince(t)))}</View>
      <H>Description (facultatif)</H>
      <TextInput value={desc} onChangeText={setDesc} multiline placeholder="Pression derrière les yeux depuis l'exercice..." placeholderTextColor={c.mu} style={{ minHeight: 80, color: c.tx, backgroundColor: c.card, borderWidth: 1, borderColor: c.bd, borderRadius: 14, padding: 12, textAlignVertical: 'top' }} />
      {err ? <T s={12} col={crit}>{err}</T> : null}
      <Btn label={busy ? 'Analyse en cours…' : "Analyser avec l'IA"} onPress={busy ? () => {} : go} />
      <T s={11} col="#FFAA33" style={{ textAlign: 'center' }}>Ne remplace pas l'avis du médecin de vol</T>
    </Screen>
  );
}
