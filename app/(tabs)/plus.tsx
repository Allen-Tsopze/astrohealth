import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Row, Demo } from '../../components/ui';
export default function Plus() {
  const r = useRouter();
  return (
    <Screen title="Plus" sub="Modules de la mission">
      <Row icon="nuclear-outline" title="Radiations" sub="Dose, neutrons, CANS" onPress={() => r.push('/radiations')} />
      <Row icon="planet-outline" title="Risques spatiaux" sub="5 dangers NASA" onPress={() => r.push('/risques')} />
      <Row icon="document-text-outline" title="Dossiers médicaux" sub="Examens, prescriptions, rapports" onPress={() => r.push('/dossiers')} />
      <Row icon="sparkles-outline" title="IA anomalies" sub="Modèle Python" onPress={() => r.push('/ia')} />
      <Row icon="settings-outline" title="Paramètres" onPress={() => r.push('/parametres')} />
      <Demo />
    </Screen>
  );
}
