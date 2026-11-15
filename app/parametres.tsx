import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, Row, Toggle, Btn, Avatar, crit } from '../components/ui';
import { useStore } from '../store';
import { useC } from '../theme';
import { API_URL, USE_MOCK } from '../services/api';
const INFO: any = {
  "Seuils d'alerte": 'SpO₂ critique < 92 %\nFC critique > 100 BPM\nTempérature > 37,8 °C\nRadiation > 0,50 mSv/jour\n(valeurs fictives)',
  Capteurs: '6 bracelets biométriques · 1 CANS · 4 dosimètres\n(simulés)',
  'Configuration de la mission': 'Expédition Mars 2026 · 300 jours · 6 astronautes',
  "URL du modèle IA": `API : ${API_URL}\nMode démo : ${USE_MOCK ? 'oui' : 'non'}\nRoute : POST /astronauts/{id}/predict`,
  'Sécurité et accès': 'Authentification par jeton · rôles : médecin, contrôle sol, admin',
};
export default function Parametres() {
  const r = useRouter(); const c = useC(); const { dark, setDark, toggles, toggle } = useStore(); const [m, setM] = useState<string | null>(null);
  return (
    <Screen title="Paramètres" back>
      <Card style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Avatar name="Élise Martin" color="#1769FF" /><View><T b>Dr Élise Martin</T><T mu s={12}>Médecin de vol · Sol</T></View></Card>
      <Card><Toggle label="Notifications critiques" value={toggles.critiques} onChange={() => toggle('critiques')} /><Toggle label="Alertes d'avertissement" value={toggles.avert} onChange={() => toggle('avert')} /><Toggle label="Mode sombre" value={dark} onChange={setDark} /><Toggle label="Authentification biométrique" value={toggles.bio} onChange={() => toggle('bio')} /></Card>
      {Object.keys(INFO).map(k => <Row key={k} icon="chevron-forward" title={k} onPress={() => setM(k)} />)}
      <Btn variant="o" label="Se déconnecter" onPress={() => r.replace('/')} />
      <Modal visible={!!m} transparent animationType="fade" onRequestClose={() => setM(null)}>
        <View style={{ flex: 1, backgroundColor: '#000A', justifyContent: 'center', padding: 24 }}><Card style={{ gap: 12 }}><T b s={18}>{m}</T><T mu>{m ? INFO[m] : ''}</T><Btn label="Fermer" onPress={() => setM(null)} /></Card></View>
      </Modal>
    </Screen>
  );
}
