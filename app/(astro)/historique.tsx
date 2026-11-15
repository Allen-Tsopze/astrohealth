import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Card, T, Chips, Badge } from '../../components/ui';
import { useStore } from '../../store';
import { ok, warn, crit } from '../../theme';
export default function Historique() {
  const history = useStore((s: any) => s.history); const [f, setF] = useState('Tout');
  const list = history.filter((h: any) => f === 'Tout' || (f === 'Symptômes' && h.kind === 'symptome') || (f === 'Analyses IA' && h.kind === 'ia'));
  return (
    <Screen title="Historique" sub="Mes déclarations">
      <Chips items={['Tout', 'Symptômes', 'Analyses IA']} value={f} onChange={setF} />
      {list.map((h: any) => <Card key={h.id} style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T mu s={12}>{h.date}</T><Badge label={`Score ${h.score.toFixed(2)}`} color={h.score < 0.35 ? ok : h.score < 0.7 ? warn : crit} /></View>
        <T b>{h.title}</T><T mu s={12}>{h.note}</T>
      </Card>)}
      {list.length === 0 && <T mu style={{ textAlign: 'center' }}>Aucune déclaration.</T>}
    </Screen>
  );
}
