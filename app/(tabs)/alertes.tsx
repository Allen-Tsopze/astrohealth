import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, Chips, Badge } from '../../components/ui';
import { useStore } from '../../store';
import { sevColor } from '../../theme';
export default function Alertes() {
  const r = useRouter(); const alerts = useStore((s: any) => s.alerts); const [f, setF] = useState('Toutes');
  const list = alerts.filter((a: any) => f === 'Toutes' || (f === 'Critiques' && a.sev === 'critique') || (f === 'Avertissements' && a.sev === 'avertissement') || (f === 'Résolues' && a.status === 'Résolue'));
  return (
    <Screen title="Alertes" sub={`${alerts.filter((a: any) => a.status !== 'Résolue').length} actives`}>
      <Chips items={['Toutes', 'Critiques', 'Avertissements', 'Résolues']} value={f} onChange={setF} />
      {list.map((a: any) => <Card key={a.id} color={sevColor[a.sev]} onPress={() => r.push('/alerte/' + a.id)} style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Badge label={a.sev[0].toUpperCase() + a.sev.slice(1)} color={sevColor[a.sev]} /><T mu s={12}>{a.time}</T></View>
        <T b>{a.who}</T><T mu s={12}>{a.text}</T>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T mu s={12}>{a.status}</T><T col="#00D9FF" s={12}>Détails →</T></View>
      </Card>)}
    </Screen>
  );
}
