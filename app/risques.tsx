import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Card, T, Bar, Badge } from '../components/ui';
import { Line } from '../components/charts';
import { risks, series } from '../data/mock';
import { ok, warn, crit } from '../theme';
export default function Risques() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Screen title="Risques" sub="5 dangers NASA" back>
      {risks.map((k, i) => { const col = k.s >= 65 ? crit : k.s >= 45 ? warn : ok; return (
        <Card key={k.t} onPress={() => setOpen(open === i ? null : i)} style={{ gap: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T b>{k.t}</T><Badge label={`${k.s}/100`} color={col} /></View>
          <View style={{ flexDirection: 'row' }}><Bar v={k.s / 100} color={col} /></View>
          <T mu s={12}>{k.c}</T><T col="#00D9FF" s={12}>Suivi : {k.m}</T>
          {open === i && <View style={{ gap: 6, marginTop: 6 }}><T b s={13}>Mesures préventives</T><T s={13}>{k.p}</T><T b s={13}>Évolution (6 mois)</T><Line data={series(20, k.s, 6, i)} color={col} /></View>}
        </Card>); })}
    </Screen>
  );
}
