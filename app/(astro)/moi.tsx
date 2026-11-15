import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Card, T, H, Avatar, StatusBadge, Toggle, Btn } from '../../components/ui';
import { useStore } from '../../store';
export default function Moi() {
  const r = useRouter(); const { astronauts, userId, dark, setDark, toggles, toggle, logout } = useStore(); const a = astronauts.find((x: any) => x.id === userId) || astronauts[0];
  return (
    <Screen title="Mon profil">
      <Card style={{ alignItems: 'center', gap: 6 }}><Avatar name={a.name} color={a.color} size={80} /><T b s={20}>{a.name}</T><T mu s={12}>{a.id} · {a.age} ans · {a.country} · {a.role}</T><StatusBadge st={a.status} /></Card>
      <H>Mission</H><Card><T b>Expédition Mars 2026</T><T mu s={12}>Jour 187 sur 300 · équipage de 6 astronautes</T></Card>
      <H>Dossier médical</H><Card style={{ gap: 4 }}><T>{a.history}</T><T mu s={12}>{a.meds}</T></Card>
      <H>Préférences</H>
      <Card><Toggle label="Rappels quotidiens" value={toggles.rappels} onChange={() => toggle('rappels')} /><Toggle label="Mode sombre" value={dark} onChange={setDark} /></Card>
      <Btn variant="o" label="Se déconnecter" onPress={() => { logout(); r.replace('/'); }} />
    </Screen>
  );
}
