import React, { useState } from 'react';
import { Screen, Card, Row, T, Search, Chips } from '../components/ui';
import { dossiers, astronauts } from '../data/mock';
export default function Dossiers() {
  const [q, setQ] = useState(''); const [f, setF] = useState('Tous'); const [open, setOpen] = useState<string | null>(null);
  const tabs: any = { Tous: '', Examens: 'Examens', Analyses: 'analyses', Prescriptions: 'Prescriptions' };
  const docs = (t: string, n: number) => Array.from({ length: n }, (_, i) => `${astronauts[i % 6].name} · J+${180 - i * 7}`).filter(d => d.toLowerCase().includes(q.toLowerCase()));
  const list = dossiers.filter(([t]) => t.toLowerCase().includes(tabs[f].toLowerCase()));
  return (
    <Screen title="Dossiers médicaux" back>
      <Search value={q} onChange={setQ} placeholder="Rechercher un dossier..." />
      <Chips items={Object.keys(tabs)} value={f} onChange={setF} />
      {list.map(([t, n]) => <React.Fragment key={t}><Row icon="document-text-outline" title={t} sub={`${n} documents`} onPress={() => setOpen(open === t ? null : t)} />
        {open === t && <Card style={{ gap: 6 }}>{docs(t, n).map(d => <T key={d} s={13}>• {d}</T>)}</Card>}</React.Fragment>)}
    </Screen>
  );
}
