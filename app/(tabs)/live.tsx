import React, { useState } from 'react';
import { Screen, Card, T, H, Chips, Tile, Grid } from '../../components/ui';
import { Line, Ecg } from '../../components/charts';
import { useStore } from '../../store';
import { series } from '../../data/mock';
import { ok, warn, crit } from '../../theme';
const N: any = { '1 h': 20, '6 h': 30, '24 h': 40, '7 j': 56 };
export default function Live() {
  const astronauts = useStore((s: any) => s.astronauts); const [id, setId] = useState('AST-05'); const [p, setP] = useState('1 h');
  const a = astronauts.find((x: any) => x.id === id); const bad = a.status === 'critique'; const ph = astronauts.indexOf(a);
  const col = (v: boolean) => (v ? crit : ok);
  return (
    <Screen title="Temps réel" sub={a.name}>
      <Chips items={astronauts.map((x: any) => x.name.split(' ')[0])} value={a.name.split(' ')[0]} onChange={(n: string) => setId(astronauts.find((x: any) => x.name.startsWith(n)).id)} />
      <Chips items={['1 h', '6 h', '24 h', '7 j']} value={p} onChange={setP} />
      <Grid>
        <Tile label="♥ Fréquence" value={a.hr} unit="BPM" color={a.hr > 100 ? crit : ok} />
        <Tile label="SpO₂" value={a.spo2} unit="%" color={col(a.spo2 < 92)} />
        <Tile label="Température" value={a.temp.toFixed(1)} unit="°C" color={a.temp > 37.8 ? warn : ok} />
        <Tile label="Pression" value={a.bp} unit="mmHg" color={bad ? warn : ok} />
        <Tile label="Respiration" value={a.rr} unit="/min" />
        <Tile label="Sommeil" value={a.sleep} />
      </Grid>
      <H>ECG {bad && '· Anormal'}</H><Card><Ecg abnormal={bad} /></Card>
      <H>Historique FC</H><Card><Line data={series(N[p], a.hr, 8, ph)} color={crit} thr={100} /></Card>
      <H>Historique SpO₂</H><Card><Line data={series(N[p], a.spo2, 1.5, ph)} color="#00D9FF" /></Card>
    </Screen>
  );
}
